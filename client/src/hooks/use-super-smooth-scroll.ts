import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Options for the super smooth scroll hook
 */
interface SuperSmoothScrollOptions {
  /** Damping factor (lower = smoother but slower) - Default: 0.07 */
  damping?: number;
  /** Multiplier for mouse wheel delta - Default: 1.0 */
  wheelMultiplier?: number;
  /** Multiplier for touch movement - Default: 1.5 */
  touchMultiplier?: number;
  /** Strength of the lerp easing - Default: 0.075 */
  lerpFactor?: number;
  /** Whether scroll smoothing is enabled - Default: true */
  enabled?: boolean;
  /** Direction of scrolling - Default: 'vertical' */
  direction?: 'vertical' | 'horizontal';
  /** Whether to use transform-based scrolling instead of native - Default: true */
  useTransform?: boolean;
}

/**
 * A super-smooth scrolling hook that mimics Lenis smoothness without using Lenis
 * This uses a combination of RAF, GSAP, and transform techniques for buttery smooth scrolling
 */
export function useSuperSmoothScroll(options: SuperSmoothScrollOptions = {}) {
  // Set defaults for options
  const {
    damping = 0.07,
    wheelMultiplier = 1.0,
    touchMultiplier = 1.5,
    lerpFactor = 0.075,
    enabled = true,
    direction = 'vertical',
    useTransform = true
  } = options;

  // Refs to track scroll state
  const contentRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const lastScrollTop = useRef(0);
  const scrollAnimationId = useRef<number | null>(null);
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const velocityRef = useRef(0);
  const lastMouseTime = useRef(0);
  const lastMousePosition = useRef(0);
  
  // Setup smooth scrolling
  useEffect(() => {
    if (!enabled) return;
    
    // Early return if transform-based scrolling is disabled
    if (!useTransform) {
      // Basic inertia scrolling with requestAnimationFrame
      const scrollWithInertia = () => {
        // Apply smooth damping
        currentScroll.current += (targetScroll.current - currentScroll.current) * damping;
        
        // Apply the scroll position
        window.scrollTo(0, currentScroll.current);
        
        // Continue animation if needed
        if (Math.abs(targetScroll.current - currentScroll.current) > 0.1) {
          scrollAnimationId.current = requestAnimationFrame(scrollWithInertia);
        } else {
          scrollAnimationId.current = null;
        }
      };
      
      // Handle wheel events
      const handleWheel = (e: WheelEvent) => {
        // Prevent default only if needed
        if (e.ctrlKey) return; // Don't interfere with pinch zoom
        
        // Calculate velocity
        const now = performance.now();
        const dt = Math.min(1000, now - lastMouseTime.current);
        
        if (dt > 0) {
          const position = direction === 'vertical' ? e.deltaY : e.deltaX;
          velocityRef.current = 0.8 * (1000 * (position - lastMousePosition.current) / dt) + 0.2 * velocityRef.current;
          lastMousePosition.current = position;
          lastMouseTime.current = now;
        }
        
        // Update target scroll position with multiplier and velocity influence
        const delta = direction === 'vertical' ? e.deltaY : e.deltaX;
        targetScroll.current += delta * wheelMultiplier * (1 + Math.abs(velocityRef.current) * 0.002);
        
        // Clamp scroll target to document boundaries
        targetScroll.current = Math.max(0, Math.min(targetScroll.current, 
          direction === 'vertical' 
            ? document.body.scrollHeight - window.innerHeight
            : document.body.scrollWidth - window.innerWidth
        ));
        
        // Start animation if not already running
        if (!scrollAnimationId.current) {
          scrollAnimationId.current = requestAnimationFrame(scrollWithInertia);
        }
      };
      
      // Initialize scroll position
      targetScroll.current = window.scrollY;
      currentScroll.current = window.scrollY;
      
      // Set up event listeners
      window.addEventListener('wheel', handleWheel, { passive: true });
      
      // Clean up
      return () => {
        window.removeEventListener('wheel', handleWheel);
        if (scrollAnimationId.current) {
          cancelAnimationFrame(scrollAnimationId.current);
        }
      };
    }
    
    // Use transform-based scrolling for maximum smoothness
    let content = document.querySelector('main') as HTMLElement;
    let wrapper = document.getElementById('smooth-wrapper') as HTMLElement;
    
    // Create wrapper if it doesn't exist
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.id = 'smooth-wrapper';
      wrapper.style.position = 'fixed';
      wrapper.style.width = '100%';
      wrapper.style.height = '100%';
      wrapper.style.top = '0';
      wrapper.style.left = '0';
      wrapper.style.overflow = 'hidden';
      wrapper.style.pointerEvents = 'none'; // Allow clicking through to content
      document.body.appendChild(wrapper);
    }
    
    // Create content container if it doesn't exist
    if (!content) {
      content = document.querySelector('body > div') as HTMLElement;
    }
    
    // Save references to DOM elements
    contentRef.current = content as HTMLDivElement;
    wrapperRef.current = wrapper as HTMLDivElement;
    
    // Prepare the content for transform
    if (content && content.parentNode !== wrapper) {
      const contentParent = content.parentNode;
      
      // Clone the content to keep the original in place (for SEO and normal page behavior)
      const clone = content.cloneNode(true) as HTMLElement;
      
      // Style the clone for transform scrolling
      clone.style.willChange = 'transform';
      clone.style.transformOrigin = 'top left';
      clone.style.position = 'absolute';
      clone.style.width = '100%';
      clone.style.top = '0';
      clone.style.left = '0';
      clone.style.pointerEvents = 'auto'; // Re-enable pointer events
      
      // Add to wrapper
      wrapper.appendChild(clone);
      
      // Make the original invisible but keep it in the flow for scrollbar
      content.style.opacity = '0';
      content.style.pointerEvents = 'none';
      
      // Update reference to the clone
      contentRef.current = clone as HTMLDivElement;
      
      // Set body height for scrollbar
      const setBodyHeight = () => {
        document.body.style.height = `${clone.offsetHeight}px`;
      };
      
      // Set initial height
      setBodyHeight();
      
      // Update height on resize
      window.addEventListener('resize', setBodyHeight);
    }
    
    // Animation function
    const animate = () => {
      const content = contentRef.current;
      if (!content) return;
      
      // Apply smooth lerp (linear interpolation) easing
      currentScroll.current += (targetScroll.current - currentScroll.current) * lerpFactor;
      
      // Apply transform for smoother scroll
      if (direction === 'vertical') {
        content.style.transform = `translate3d(0, ${-currentScroll.current}px, 0)`;
      } else {
        content.style.transform = `translate3d(${-currentScroll.current}px, 0, 0)`;
      }
      
      // Calculate velocity
      const scrollDelta = lastScrollTop.current - targetScroll.current;
      lastScrollTop.current = targetScroll.current;
      
      // Use small delta and velocity for physics-based easing
      velocityRef.current = 0.8 * velocityRef.current + 0.2 * scrollDelta;
      
      // Continue animation or end it
      if (Math.abs(targetScroll.current - currentScroll.current) > 0.1 || Math.abs(velocityRef.current) > 0.1) {
        isScrolling.current = true;
        scrollAnimationId.current = requestAnimationFrame(animate);
      } else {
        isScrolling.current = false;
      }
    };
    
    // Handle scroll events to update target position
    const handleScroll = () => {
      targetScroll.current = window.scrollY;
      
      if (!isScrolling.current) {
        scrollAnimationId.current = requestAnimationFrame(animate);
      }
    };
    
    // Handle wheel events for extra smoothness
    const handleWheel = (e: WheelEvent) => {
      // Don't intercept pinch zoom
      if (e.ctrlKey) return;
      
      // Calculate more accurate delta with multiplier
      const delta = direction === 'vertical' ? e.deltaY : e.deltaX;
      targetScroll.current += delta * wheelMultiplier;
      
      // Update window scroll to trigger handleScroll
      window.scrollTo(0, targetScroll.current);
    };
    
    // Handle touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
      
      // Stop animation during touch
      if (scrollAnimationId.current) {
        cancelAnimationFrame(scrollAnimationId.current);
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const touchX = e.touches[0].clientX;
      
      let delta = 0;
      if (direction === 'vertical') {
        delta = (touchStartY.current - touchY) * touchMultiplier;
        touchStartY.current = touchY;
      } else {
        delta = (touchStartX.current - touchX) * touchMultiplier;
        touchStartX.current = touchX;
      }
      
      // Update target position
      targetScroll.current += delta;
      
      // Ensure within bounds
      targetScroll.current = Math.max(0, Math.min(targetScroll.current, 
        direction === 'vertical' 
          ? document.body.scrollHeight - window.innerHeight
          : document.body.scrollWidth - window.innerWidth
      ));
      
      // Update window scroll
      window.scrollTo(0, targetScroll.current);
    };
    
    const handleTouchEnd = () => {
      // Add a little momentum at the end of touch
      if (Math.abs(velocityRef.current) > 1) {
        targetScroll.current += velocityRef.current * 10;
        
        // Ensure within bounds
        targetScroll.current = Math.max(0, Math.min(targetScroll.current, 
          direction === 'vertical' 
            ? document.body.scrollHeight - window.innerHeight
            : document.body.scrollWidth - window.innerWidth
        ));
        
        // Update scroll and start animation
        window.scrollTo(0, targetScroll.current);
        scrollAnimationId.current = requestAnimationFrame(animate);
      }
    };
    
    // Initialize scroll values
    targetScroll.current = window.scrollY;
    currentScroll.current = window.scrollY;
    
    // Start animation
    scrollAnimationId.current = requestAnimationFrame(animate);
    
    // Set up event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Cleanup function
    return () => {
      // Remove event listeners
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      
      // Cancel any ongoing animation
      if (scrollAnimationId.current) {
        cancelAnimationFrame(scrollAnimationId.current);
      }
      
      // Cleanup DOM if we created elements
      if (useTransform && wrapperRef.current && wrapperRef.current.parentNode) {
        // Restore original content
        if (contentRef.current && contentRef.current.parentNode === wrapperRef.current) {
          contentRef.current.style.transform = '';
          contentRef.current.style.willChange = '';
          
          // Remove the wrapper
          if (wrapperRef.current.parentNode) {
            wrapperRef.current.parentNode.removeChild(wrapperRef.current);
          }
          
          // Reset original content
          const originalContent = document.querySelector('main') as HTMLElement;
          if (originalContent) {
            originalContent.style.opacity = '';
            originalContent.style.pointerEvents = '';
          }
          
          // Reset body height
          document.body.style.height = '';
        }
      }
    };
  }, [enabled, damping, wheelMultiplier, touchMultiplier, lerpFactor, direction, useTransform]);
  
  // Function to smoothly scroll to a specific position
  const scrollTo = (position: number, duration = 1) => {
    // Use GSAP for the smoothest scrolling to a position
    gsap.to(window, {
      duration,
      scrollTo: {
        y: position,
        autoKill: false
      },
      ease: "power3.out",
      onUpdate: () => {
        // Update our internal target during GSAP animation
        targetScroll.current = window.scrollY;
      }
    });
  };
  
  // Function to scroll to a specific element
  const scrollToElement = (elementId: string, offset = 0, duration = 1) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;
    scrollTo(elementPosition, duration);
  };
  
  return {
    scrollTo,
    scrollToElement
  };
}

export default useSuperSmoothScroll;