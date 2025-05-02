import { ReactNode, useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface SectionTransitionProps {
  children: ReactNode;
  delayOrder?: number;
  className?: string;
  id?: string;
  effect?: "fade" | "slide" | "scale" | "mask";
  direction?: "up" | "down" | "left" | "right";
}

export default function SectionTransition({ 
  children, 
  delayOrder = 0, 
  className = "",
  id,
  effect = "fade",
  direction = "up"
}: SectionTransitionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const isVisible = !!entry?.isIntersecting;
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated]);
  
  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const springScrollY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const translateY = useTransform(
    springScrollY,
    [0, 0.5, 1],
    [100, 0, 0]
  );
  
  const opacity = useTransform(
    springScrollY,
    [0, 0.2, 1],
    [0, 1, 1]
  );
  
  // Direction-based initial and animate values
  const getMotionProps = () => {
    switch (effect) {
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        };
      case "slide":
        const slideValues = {
          up: { y: 100 },
          down: { y: -100 },
          left: { x: 100 },
          right: { x: -100 }
        };
        const directionKey = direction as keyof typeof slideValues;
        return {
          initial: { opacity: 0, ...slideValues[directionKey] },
          animate: { opacity: 1, ...(directionKey.includes('y') ? { y: 0 } : { x: 0 }) },
        };
      case "scale":
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
        };
      case "mask":
        return {
          initial: { clipPath: "inset(0 100% 0 0)" },
          animate: { clipPath: "inset(0 0% 0 0)" },
        };
      default:
        return {
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
        };
    }
  };
  
  const motionProps = getMotionProps();

  return (
    <motion.section
      id={id}
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
      initial={motionProps.initial}
      animate={hasAnimated ? motionProps.animate : motionProps.initial}
      transition={{
        duration: 0.7,
        ease: [0.165, 0.84, 0.44, 1],
        delay: delayOrder * 0.1
      }}
      style={{ 
        opacity: hasAnimated ? 1 : opacity,
        y: hasAnimated && direction === "up" ? 0 : (direction === "up" ? translateY : undefined)
      }}
    >
      {children}
    </motion.section>
  );
}
