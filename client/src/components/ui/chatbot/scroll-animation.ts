import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Creates a smooth scrolling animation to a target element
 * @param targetId The ID of the element to scroll to
 * @param duration Duration of the scroll animation in seconds
 * @param offset Optional offset from the top of the element (in pixels)
 */
export function smoothScrollTo(targetId: string, duration: number = 1, offset: number = 0) {
  const targetElement = document.getElementById(targetId);
  
  if (!targetElement) {
    console.warn(`Scroll target with ID "${targetId}" not found`);
    return;
  }
  
  // Calculate the target position
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  
  // Create the smooth scroll animation
  gsap.to(window, {
    duration: duration,
    scrollTo: {
      y: targetPosition,
      autoKill: true
    },
    ease: "power2.inOut",
    onComplete: () => {
      // Update the URL hash after scrolling (optional)
      // window.history.pushState(null, '', `#${targetId}`);
    }
  });
}

/**
 * Sets up scroll-triggered animations for elements
 * @param triggerSelector CSS selector for the trigger elements
 * @param animationConfig Animation configuration
 */
export function setupScrollAnimations(
  triggerSelector: string, 
  animationConfig: {
    y?: number | string,
    x?: number | string,
    opacity?: number,
    scale?: number,
    duration?: number,
    stagger?: number,
    ease?: string
  } = {}
) {
  // Set default animation values if not provided
  const config = {
    y: animationConfig.y ?? 50,
    opacity: animationConfig.opacity ?? 0,
    scale: animationConfig.scale ?? 1,
    duration: animationConfig.duration ?? 1,
    stagger: animationConfig.stagger ?? 0.2,
    ease: animationConfig.ease ?? "power2.out"
  };

  // Get all elements matching the selector
  const elements = document.querySelectorAll(triggerSelector);
  
  if (elements.length === 0) {
    console.warn(`No elements found matching selector: ${triggerSelector}`);
    return;
  }
  
  // Create animations for each element
  elements.forEach((element) => {
    // Set initial state
    gsap.set(element, { 
      y: config.y,
      opacity: config.opacity,
      scale: config.scale !== 1 ? config.scale : 1
    });
    
    // Create the scroll trigger animation
    gsap.to(element, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: config.duration,
      ease: config.ease,
      scrollTrigger: {
        trigger: element,
        start: "top 80%", // When the top of the element hits 80% from the top of the viewport
        toggleActions: "play none none none",
        // markers: true // For debugging
      }
    });
  });
}

/**
 * Sets up a parallax scrolling effect on elements
 * @param selector CSS selector for elements to apply parallax effect to
 * @param speedFactor How much faster/slower the element moves (1 = normal speed)
 */
export function setupParallaxEffect(selector: string, speedFactor: number = 0.5) {
  const elements = document.querySelectorAll(selector);
  
  if (elements.length === 0) {
    console.warn(`No elements found matching selector: ${selector}`);
    return;
  }
  
  elements.forEach((element) => {
    gsap.to(element, {
      y: () => `${window.innerHeight * speedFactor * -1}`,
      ease: "none",
      scrollTrigger: {
        trigger: element.parentElement || element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        // markers: true // For debugging
      }
    });
  });
}

/**
 * Creates a text reveal animation on scroll
 * @param selector CSS selector for text elements
 * @param splitType How to split the text ('chars', 'words', or 'lines')
 */
export function setupTextRevealAnimation(selector: string, splitType: 'chars' | 'words' | 'lines' = 'words') {
  const elements = document.querySelectorAll(selector);
  
  if (elements.length === 0) {
    console.warn(`No elements found matching selector: ${selector}`);
    return;
  }
  
  elements.forEach((element) => {
    // Split text based on the specified type
    let items: Element[] = [];
    
    if (splitType === 'chars') {
      // Split into characters
      const content = element.textContent || '';
      element.textContent = '';
      
      content.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        (span as HTMLElement).style.display = 'inline-block'; // Important for animation
        element.appendChild(span);
        items.push(span);
      });
    } 
    else if (splitType === 'words') {
      // Split into words
      const content = element.textContent || '';
      element.textContent = '';
      
      content.split(/\s+/).forEach((word, i, arr) => {
        const span = document.createElement('span');
        span.textContent = word + (i < arr.length - 1 ? ' ' : '');
        (span as HTMLElement).style.display = 'inline-block';
        element.appendChild(span);
        items.push(span);
      });
    }
    else if (splitType === 'lines') {
      // This is a simplified approach - for more accurate line splitting,
      // you might want to use a library like SplitText from GSAP
      const content = element.innerHTML;
      const words = content.split(' ');
      const lines: string[] = [];
      let currentLine = '';
      
      (element as HTMLElement).style.visibility = 'hidden';
      const tempElement = document.createElement('span');
      tempElement.style.visibility = 'hidden';
      tempElement.style.position = 'absolute';
      tempElement.style.whiteSpace = 'nowrap';
      tempElement.style.font = window.getComputedStyle(element).font;
      document.body.appendChild(tempElement);
      
      const maxWidth = (element as HTMLElement).offsetWidth;
      
      words.forEach(word => {
        tempElement.textContent = currentLine + ' ' + word;
        if (tempElement.offsetWidth <= maxWidth || currentLine === '') {
          currentLine += (currentLine ? ' ' : '') + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      });
      
      if (currentLine) {
        lines.push(currentLine);
      }
      
      document.body.removeChild(tempElement);
      element.innerHTML = '';
      
      lines.forEach(line => {
        const lineElement = document.createElement('div');
        lineElement.textContent = line;
        (lineElement as HTMLElement).style.display = 'block';
        element.appendChild(lineElement);
        items.push(lineElement);
      });
      
      (element as HTMLElement).style.visibility = 'visible';
    }
    
    // Animate the split text elements
    gsap.from(items, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.05,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  });
}

/**
 * Initialize scroll-based animations for the chat interface
 */
export function initChatAnimations() {
  // Animate chat messages on scroll
  setupScrollAnimations('.chat-message', {
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1
  });
  
  // Animate suggested questions with a different effect
  setupScrollAnimations('.chat-suggestion', {
    y: 10,
    x: -5,
    opacity: 0,
    duration: 0.3,
    stagger: 0.05
  });
  
  // Text reveal animation for important elements
  setupTextRevealAnimation('.chat-highlight', 'words');
  
  // Parallax effect on decorative elements
  setupParallaxEffect('.chat-decoration', 0.2);
}

export default {
  smoothScrollTo,
  setupScrollAnimations,
  setupParallaxEffect,
  setupTextRevealAnimation,
  initChatAnimations
};