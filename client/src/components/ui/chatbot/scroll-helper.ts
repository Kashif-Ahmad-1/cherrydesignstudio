import { useRef } from "react";
import { gsap } from "gsap";

/**
 * A lightweight hook for smooth scrolling in specific containers
 * This is simpler than the global implementation and works for individual elements
 */
export function useContainerSmoothScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of container smoothly
  const scrollToBottom = () => {
    const container = containerRef.current;
    if (!container) return;

    gsap.to(container, {
      scrollTop: container.scrollHeight,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  // Scroll to specific element in container
  const scrollToElement = (elementId: string) => {
    const container = containerRef.current;
    if (!container) return;

    const element = document.getElementById(elementId);
    if (!element) return;

    gsap.to(container, {
      scrollTop: element.offsetTop,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return { containerRef, scrollToBottom, scrollToElement };
}

/**
 * Enable smooth scrolling for any scrollable container
 */
export function smoothScrollForContainer(container: HTMLElement) {
  let lastScrollTop = container.scrollTop;

  const handleScroll = () => {
    const scrollTop = container.scrollTop;
    const direction = scrollTop > lastScrollTop ? "down" : "up";
    const distance = Math.abs(scrollTop - lastScrollTop);

    if (distance > 20) {
      // Apply smooth scrolling with GSAP
      gsap.to(container, {
        scrollTop: scrollTop,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    lastScrollTop = scrollTop;
  };

  container.addEventListener("scroll", handleScroll, { passive: true });

  // Return cleanup function
  return () => {
    container.removeEventListener("scroll", handleScroll);
  };
}
