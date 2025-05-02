import { useEffect } from 'react';
import { gsap } from 'gsap';

/**
 * A very lightweight smooth scroll implementation without the complexity of 
 * transforming the entire page content
 */
interface SmoothScrollOptions {
  damping?: number;
  wheelMultiplier?: number;
  enabled?: boolean;
}

export function useSimpleSmoothScroll(options: SmoothScrollOptions = {}) {
  // Default options
  const {
    damping = 0.1,
    wheelMultiplier = 1,
    enabled = true
  } = options;

  useEffect(() => {
    if (!enabled) return;

    // Store original style to restore later
    const originalStyleHtml = document.documentElement.style.cssText;
    const originalStyleBody = document.body.style.cssText;

    // Function for smooth scrolling
    let target = 0;
    let current = window.scrollY;
    let rafId: number | null = null;
    let isScrolling = false;

    const smoothScroll = () => {
      current += (target - current) * damping;
      window.scrollTo(0, current);

      if (Math.abs(target - current) > 0.5) {
        isScrolling = true;
        rafId = requestAnimationFrame(smoothScroll);
      } else {
        isScrolling = false;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    // Handle wheel events for smooth scrolling
    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY * wheelMultiplier;
      target = Math.max(0, Math.min(target + delta, document.body.scrollHeight - window.innerHeight));
      
      if (!isScrolling) {
        rafId = requestAnimationFrame(smoothScroll);
      }
    };

    // Set initial position
    target = window.scrollY;
    current = window.scrollY;

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: true });

    // Cleanup
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('wheel', handleWheel);
      
      // Restore original styles
      document.documentElement.style.cssText = originalStyleHtml;
      document.body.style.cssText = originalStyleBody;
    };
  }, [enabled, damping, wheelMultiplier]);

  // Helper function to scroll to specific elements
  const scrollToElement = (elementId: string, offset = 0) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;
    
    // Use GSAP for smooth scrolling to elements
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: elementPosition,
        autoKill: false
      },
      ease: "power3.out"
    });
  };

  return { scrollToElement };
}

export default useSimpleSmoothScroll;