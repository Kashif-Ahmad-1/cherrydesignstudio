import { useEffect, useRef } from "react";

/**
 * A lightweight custom hook for smooth scrolling without external libraries like Lenis
 * @param targetRef - The ref object for the scrollable container
 * @param options - Configuration options for the smooth scrolling
 */
export function useSmoothScroll(
  options: {
    damping?: number;
    wheelMultiplier?: number;
    touchMultiplier?: number;
    autoScroll?: boolean;
    scrollDirection?: "vertical" | "horizontal";
    enabled?: boolean;
  } = {},
) {
  const {
    damping = 0.1,
    wheelMultiplier = 1,
    touchMultiplier = 1.5,
    autoScroll = false,
    scrollDirection = "vertical",
    enabled = true,
  } = options;

  // Refs for tracking scroll position
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);
  const currentScrollRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isScrollingRef = useRef(false);
  const touchStartRef = useRef(0);

  // Initialize scrolling
  useEffect(() => {
    if (!enabled) return;

    const target = targetRef.current;
    if (!target) return;

    // Function to start smooth scrolling animation
    const startSmoothScroll = () => {
      if (rafRef.current) return;

      const animateScroll = () => {
        if (!target) return;

        // Calculate the scrolling position with easing
        currentScrollRef.current +=
          (scrollPositionRef.current - currentScrollRef.current) * damping;

        // Apply the scroll position
        if (scrollDirection === "vertical") {
          target.scrollTop = currentScrollRef.current;
        } else {
          target.scrollLeft = currentScrollRef.current;
        }

        // Continue the animation if still scrolling
        if (
          Math.abs(scrollPositionRef.current - currentScrollRef.current) > 0.1
        ) {
          isScrollingRef.current = true;
          rafRef.current = requestAnimationFrame(animateScroll);
        } else {
          isScrollingRef.current = false;
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
          }
        }
      };

      rafRef.current = requestAnimationFrame(animateScroll);
    };

    // Handle wheel events for smooth scrolling
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const maxScroll =
        scrollDirection === "vertical"
          ? target.scrollHeight - target.clientHeight
          : target.scrollWidth - target.clientWidth;

      // Update target scroll position
      scrollPositionRef.current += e.deltaY * wheelMultiplier;

      // Clamp the scroll position
      scrollPositionRef.current = Math.max(
        0,
        Math.min(scrollPositionRef.current, maxScroll),
      );

      if (!isScrollingRef.current) {
        startSmoothScroll();
      }
    };

    // Handle touch events for mobile devices
    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current =
        scrollDirection === "vertical"
          ? e.touches[0].clientY
          : e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();

      const touchPosition =
        scrollDirection === "vertical"
          ? e.touches[0].clientY
          : e.touches[0].clientX;

      const touchDelta = touchStartRef.current - touchPosition;
      touchStartRef.current = touchPosition;

      const maxScroll =
        scrollDirection === "vertical"
          ? target.scrollHeight - target.clientHeight
          : target.scrollWidth - target.clientWidth;

      // Update target scroll position
      scrollPositionRef.current += touchDelta * touchMultiplier;

      // Clamp the scroll position
      scrollPositionRef.current = Math.max(
        0,
        Math.min(scrollPositionRef.current, maxScroll),
      );

      if (!isScrollingRef.current) {
        startSmoothScroll();
      }
    };

    // Initialize current scroll position
    if (scrollDirection === "vertical") {
      currentScrollRef.current = target.scrollTop;
      scrollPositionRef.current = target.scrollTop;
    } else {
      currentScrollRef.current = target.scrollLeft;
      scrollPositionRef.current = target.scrollLeft;
    }

    // Add event listeners
    target.addEventListener("wheel", handleWheel, { passive: false });
    target.addEventListener("touchstart", handleTouchStart, { passive: true });
    target.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      target.removeEventListener("wheel", handleWheel);
      target.removeEventListener("touchstart", handleTouchStart);
      target.removeEventListener("touchmove", handleTouchMove);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [damping, wheelMultiplier, touchMultiplier, scrollDirection, enabled]);

  // Function to scroll to a specific position
  const scrollTo = (position: number, duration: number = 1) => {
    const target = targetRef.current;
    if (!target) return;

    const startPosition =
      scrollDirection === "vertical" ? target.scrollTop : target.scrollLeft;
    const startTime = performance.now();

    const animateScrollTo = (time: number) => {
      const elapsedTime = time - startTime;
      const progress = Math.min(elapsedTime / (duration * 1000), 1);
      const easedProgress = ease(progress);

      const currentPosition =
        startPosition + (position - startPosition) * easedProgress;

      if (scrollDirection === "vertical") {
        target.scrollTop = currentPosition;
      } else {
        target.scrollLeft = currentPosition;
      }

      if (progress < 1) {
        requestAnimationFrame(animateScrollTo);
      }
    };

    requestAnimationFrame(animateScrollTo);
  };

  // Easing function for smooth animations
  const ease = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  // Function to scroll to an element
  const scrollToElement = (
    elementId: string,
    offset: number = 0,
    duration: number = 1,
  ) => {
    const target = targetRef.current;
    if (!target) return;

    const element = document.getElementById(elementId);
    if (!element) return;

    const elementPosition =
      scrollDirection === "vertical"
        ? element.offsetTop - offset
        : element.offsetLeft - offset;

    scrollTo(elementPosition, duration);
  };

  return { targetRef, scrollTo, scrollToElement };
}

export default useSmoothScroll;
