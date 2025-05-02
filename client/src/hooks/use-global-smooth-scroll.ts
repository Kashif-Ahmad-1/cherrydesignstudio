import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * A lightweight global smooth scroll implementation without external libraries
 * This provides a Lenis-like smooth scrolling experience for the entire page
 */
export function useGlobalSmoothScroll(
  options: {
    damping?: number;
    enabled?: boolean;
    touchMultiplier?: number;
    wheelMultiplier?: number;
  } = {}
) {
  const {
    damping = 0.1,
    enabled = true,
    touchMultiplier = 1,
    wheelMultiplier = 1
  } = options;

  // Track scroll position
  const targetY = useRef(0);
  const currentY = useRef(0);
  const scrolling = useRef(false);
  const rafId = useRef<number | null>(null);
  const touchStart = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    // Check for transform support
    const isTransformSupported = 'transform' in document.documentElement.style;
    if (!isTransformSupported) return;

    // Get scrollable elements - we'll adjust the main content for smooth scrolling
    const bodyElement = document.body;
    const htmlElement = document.documentElement;
    
    // Store original styles before we modify them
    const originalBodyStyles = {
      overflow: bodyElement.style.overflow,
      height: bodyElement.style.height,
    };
    const originalHtmlStyles = {
      overflow: htmlElement.style.overflow,
      height: htmlElement.style.height,
    };

    // Lock the scroll on the body and html
    bodyElement.style.overflow = 'hidden';
    bodyElement.style.height = '100%';
    htmlElement.style.overflow = 'hidden';
    htmlElement.style.height = '100%';

    // Get the element we'll transform for smooth scrolling
    const contentElement = document.getElementById('smooth-content') || document.querySelector('main');
    if (!contentElement) {
      console.warn('No suitable element found for smooth scroll transformation');
      return;
    }

    // Create a wrapper div for smooth scrolling if needed
    let wrapperDiv: HTMLElement | null = null;
    if (!document.getElementById('smooth-wrapper')) {
      wrapperDiv = document.createElement('div');
      wrapperDiv.id = 'smooth-wrapper';
      wrapperDiv.style.position = 'fixed';
      wrapperDiv.style.width = '100%';
      wrapperDiv.style.height = '100%';
      wrapperDiv.style.overflow = 'hidden';
      wrapperDiv.style.top = '0';
      wrapperDiv.style.left = '0';
      
      // Move the content element into the wrapper
      contentElement.parentNode?.insertBefore(wrapperDiv, contentElement);
      wrapperDiv.appendChild(contentElement);
    } else {
      wrapperDiv = document.getElementById('smooth-wrapper');
    }

    // Set content element styles for transforming
    // We need to set its display and transform origin for proper animation
    contentElement.style.willChange = 'transform';
    contentElement.style.transformOrigin = 'top left';
    
    // Calculate the content height and update document height
    const updateDocumentHeight = () => {
      const contentHeight = contentElement.scrollHeight;
      document.body.style.height = `${contentHeight}px`;
    };

    // Run once at the start
    updateDocumentHeight();
    
    // Also set up a resize observer to update height when content changes
    const resizeObserver = new ResizeObserver(() => {
      updateDocumentHeight();
    });
    resizeObserver.observe(contentElement);

    // Animation function for smooth scrolling
    const smoothScroll = () => {
      // Calculate movement with easing
      currentY.current += (targetY.current - currentY.current) * damping;
      
      // Apply transform to content
      if (contentElement) {
        gsap.set(contentElement, { 
          y: -currentY.current 
        });
      }
      
      // Continue animation if still scrolling
      if (Math.abs(targetY.current - currentY.current) > 0.1) {
        scrolling.current = true;
        rafId.current = requestAnimationFrame(smoothScroll);
      } else {
        scrolling.current = false;
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
          rafId.current = null;
        }
      }
    };

    // Handle scroll events
    const handleScroll = () => {
      // Update target position
      targetY.current = window.scrollY;
      
      // Start animation if not already running
      if (!scrolling.current) {
        rafId.current = requestAnimationFrame(smoothScroll);
      }
    };

    // Handle wheel events for custom scrolling
    const handleWheel = (e: WheelEvent) => {
      // Adjust scroll based on wheel delta
      const delta = e.deltaY * wheelMultiplier;
      
      // Update window scroll position which triggers the handleScroll function
      window.scrollBy(0, delta);
    };

    // Handle touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = (touchStart.current - touchY) * touchMultiplier;
      touchStart.current = touchY;
      
      // Update window scroll position
      window.scrollBy(0, deltaY);
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', updateDocumentHeight);

    // Initialize scroll position
    targetY.current = window.scrollY;
    currentY.current = window.scrollY;
    
    // Start smooth scrolling
    rafId.current = requestAnimationFrame(smoothScroll);

    // Clean up
    return () => {
      // Remove event listeners
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', updateDocumentHeight);
      
      // Stop animation
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      
      // Stop observing resize
      resizeObserver.disconnect();
      
      // Restore original styles
      bodyElement.style.overflow = originalBodyStyles.overflow;
      bodyElement.style.height = originalBodyStyles.height;
      htmlElement.style.overflow = originalHtmlStyles.overflow;
      htmlElement.style.height = originalHtmlStyles.height;
      
      // If we created a wrapper, remove it properly
      if (wrapperDiv && wrapperDiv.parentNode) {
        // Move the content element back to its original location
        if (contentElement && wrapperDiv.contains(contentElement)) {
          wrapperDiv.parentNode.insertBefore(contentElement, wrapperDiv);
        }
        // Remove the wrapper
        wrapperDiv.parentNode.removeChild(wrapperDiv);
      }
      
      // Reset content element style
      if (contentElement) {
        contentElement.style.transform = '';
        contentElement.style.willChange = '';
      }
    };
  }, [damping, enabled, wheelMultiplier, touchMultiplier]);

  // Function to scroll to a specific position
  const scrollTo = (position: number, duration: number = 1) => {
    // Use GSAP for smooth animation
    gsap.to(window, {
      scrollTo: { y: position, autoKill: false },
      duration: duration,
      ease: "power2.out",
      onUpdate: () => {
        // Update the target position during animation
        targetY.current = window.scrollY;
      }
    });
  };

  // Function to scroll to an element by ID
  const scrollToElement = (elementId: string, offset: number = 0, duration: number = 1) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;
    scrollTo(elementPosition, duration);
  };

  return { scrollTo, scrollToElement };
}

export default useGlobalSmoothScroll;