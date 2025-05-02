import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface CherryMaximalLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
  withText?: boolean;
  colorScheme?: "default" | "neon" | "pastel" | "monochrome";
  style3d?: boolean;
  interactive?: boolean;
}

export default function CherryMaximalLogo({
  className,
  size = "lg",
  withText = true,
  colorScheme = "default",
  style3d = true,
  interactive = true,
}: CherryMaximalLogoProps) {
  const logoRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D tilt transform values
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  // Color schemes
  const colorSchemes = {
    default: {
      c: "#F33D3D",
      d: "#4BB1F1",
      accent1: "#FF41A6",
      accent2: "#FFC700",
      accent3: "#8833FF",
      background: "#0A0A0A",
    },
    neon: {
      c: "#00FFFF",
      d: "#FF00FF",
      accent1: "#00FF00",
      accent2: "#FFFF00",
      accent3: "#FF3300",
      background: "#111111",
    },
    pastel: {
      c: "#FFB6C1",
      d: "#ADD8E6",
      accent1: "#FFDAB9",
      accent2: "#E6E6FA",
      accent3: "#98FB98",
      background: "#FAF8F1",
    },
    monochrome: {
      c: "#FFFFFF",
      d: "#DDDDDD",
      accent1: "#AAAAAA",
      accent2: "#888888",
      accent3: "#666666",
      background: "#222222",
    },
  };

  const colors = colorSchemes[colorScheme];

  // Size mapping - reduced sizes for all breakpoints
  const sizeMap = {
    sm: "w-10 h-10 md:w-12 md:h-12",
    md: "w-16 h-16 md:w-20 md:h-20",
    lg: "w-24 h-24 md:w-32 md:h-32",
    xl: "w-36 h-36 md:w-48 md:h-48",
    xxl: "w-48 h-48 md:w-64 md:h-64",
  };

  // Text size mapping
  const textSizeMap = {
    sm: "text-sm tracking-widest",
    md: "text-xl tracking-widest",
    lg: "text-3xl tracking-widest",
    xl: "text-5xl tracking-[0.2em]",
    xxl: "text-6xl tracking-[0.25em]",
  };

  // Animation setup
  useEffect(() => {
    if (!logoRef.current || !interactive) return;

    // Get all the elements
    const letterC = logoRef.current.querySelectorAll(".letter-c");
    const letterD = logoRef.current.querySelectorAll(".letter-d");
    const cherries = logoRef.current.querySelectorAll(".cherry");
    const stems = logoRef.current.querySelectorAll(".stem");
    const decorations = logoRef.current.querySelectorAll(".decoration");
    const patterns = logoRef.current.querySelectorAll(".pattern");
    const highlights = logoRef.current.querySelectorAll(".highlight");

    // Set initial states
    gsap.set(
      [letterC, letterD, cherries, stems, decorations, patterns, highlights],
      {
        opacity: 0,
        scale: 0.9,
        y: 10,
        transformOrigin: "center center",
      },
    );

    // Create staggered timeline
    const tl = gsap.timeline();

    // Main animation sequence
    tl.to(decorations, {
      opacity: 0.7,
      scale: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.02,
      ease: "power1.out",
    })
      .to(
        patterns,
        {
          opacity: 0.8,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.03,
          ease: "power1.out",
        },
        "-=0.2",
      )
      .to(
        letterC,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.3",
      )
      .to(
        letterD,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.5",
      )
      .to(
        stems,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.4",
      )
      .to(
        cherries,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.3",
      )
      .to(
        highlights,
        {
          opacity: 0.8,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.6",
      );

    // Continuous animations
    // Floating effect on cherries
    gsap.to(cherries, {
      y: -4,
      duration: 1.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.2,
    });

    // Subtle pulsing on the C&D letters
    gsap.to([letterC, letterD], {
      scale: 1.02,
      duration: 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.5,
    });

    // No rotating animation for decorations

    // Text animation if present
    if (textRef.current && withText) {
      const letters = textRef.current.querySelectorAll("span");
      gsap.set(letters, {
        opacity: 0,
        y: 20,
        scale: 0.8,
      });

      gsap.to(letters, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.07,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: 1,
      });

      // Subtle letter animations
      gsap.to(letters, {
        y: -3,
        stagger: {
          each: 0.1,
          repeat: -1,
          yoyo: true,
        },
        duration: 0.8,
        ease: "sine.inOut",
      });
    }
  }, [interactive, withText, colorScheme]);

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!style3d || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  // Reset mouse position on mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false);

    // Reset 3D effect
    mouseX.set(0);
    mouseY.set(0);

    if (!interactive || !logoRef.current) return;

    // Reset animations
    gsap.to(logoRef.current.querySelectorAll(".cherry"), {
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(logoRef.current.querySelectorAll(".letter-c, .letter-d"), {
      strokeWidth: "+=0",
      scale: 1,
      duration: 0.4,
      ease: "power1.out",
    });
  };

  // Handle hover effect
  const handleMouseEnter = () => {
    setIsHovered(true);

    if (!interactive || !logoRef.current) return;

    // Cherry effect
    gsap.to(logoRef.current.querySelectorAll(".cherry"), {
      scale: 1.2,
      duration: 0.4,
      ease: "elastic.out(1, 0.5)",
      stagger: 0.1,
    });

    // Letter effect
    gsap.to(logoRef.current.querySelectorAll(".letter-c, .letter-d"), {
      strokeWidth: "+=3",
      scale: 1.05,
      duration: 0.3,
      ease: "power1.out",
    });
  };

  // Handle click animation
  const handleClick = () => {
    if (!interactive || !logoRef.current) return;
    setIsClicked(true);

    // Explosion effect
    const decorations = logoRef.current.querySelectorAll(".decoration");
    const highlights = logoRef.current.querySelectorAll(".highlight");

    // Animate decorations outward
    gsap.to(decorations, {
      scale: 1.5,
      opacity: 0.9,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.out",
    });

    // Flash highlights
    gsap.to(highlights, {
      opacity: 1,
      scale: 1.2,
      duration: 0.2,
      ease: "power1.out",
      onComplete: () => {
        gsap.to(highlights, {
          opacity: 0.6,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      },
    });

    // Return decorations
    gsap.to(decorations, {
      scale: 1,
      opacity: 0.7,
      duration: 0.6,
      delay: 0.3,
      stagger: 0.03,
      ease: "elastic.out(1, 0.5)",
      onComplete: () => setIsClicked(false),
    });

    // Wiggle logo
    gsap.to(logoRef.current, {
      rotation: -5,
      duration: 0.1,
      ease: "power1.out",
      onComplete: () => {
        gsap.to(logoRef.current, {
          rotation: 5,
          duration: 0.1,
          ease: "power1.out",
          onComplete: () => {
            gsap.to(logoRef.current, {
              rotation: 0,
              duration: 0.4,
              ease: "elastic.out(1, 0.5)",
            });
          },
        });
      },
    });
  };

  // Logo styling based on colorScheme
  const logoStyle = {
    filter: style3d ? "drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))" : undefined,
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div
        ref={containerRef}
        className={cn(sizeMap[size], "relative cursor-pointer")}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {/* 3D effect wrapper */}
        <motion.div
          style={
            style3d
              ? {
                  rotateX,
                  rotateY,
                  perspective: 500,
                  transformStyle: "preserve-3d",
                }
              : undefined
          }
          className="w-full h-full"
          whileTap={{ scale: 0.95 }}
        >
          <svg
            ref={logoRef}
            viewBox="0 0 300 300"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            style={logoStyle}
          >
            {/* Background */}
            <circle
              cx="150"
              cy="150"
              r="140"
              fill={colors.background}
              className="decoration"
            />

            {/* Background pattern grid */}
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke={colors.accent1}
                strokeWidth="0.5"
                opacity="0.2"
              />
            </pattern>
            <circle
              cx="150"
              cy="150"
              r="135"
              fill="url(#grid)"
              className="pattern"
            />

            {/* Decorative elements */}
            <circle
              cx="70"
              cy="220"
              r="18"
              fill={colors.accent1}
              opacity="0.6"
              className="decoration"
            />
            <circle
              cx="230"
              cy="70"
              r="15"
              fill={colors.c}
              opacity="0.7"
              className="decoration"
            />
            <circle
              cx="210"
              cy="210"
              r="12"
              fill={colors.accent2}
              opacity="0.7"
              className="decoration"
            />
            <polygon
              points="50,110 65,95 80,110 65,125"
              fill={colors.d}
              opacity="0.6"
              className="decoration"
            />
            <polygon
              points="220,40 235,25 250,40 235,55"
              fill={colors.accent1}
              opacity="0.7"
              className="decoration"
            />

            {/* Decorative circles */}
            <circle
              cx="150"
              cy="50"
              r="8"
              fill={colors.accent2}
              opacity="0.7"
              className="decoration"
            />
            <circle
              cx="150"
              cy="250"
              r="8"
              fill={colors.accent3}
              opacity="0.7"
              className="decoration"
            />
            <circle
              cx="50"
              cy="150"
              r="8"
              fill={colors.accent1}
              opacity="0.7"
              className="decoration"
            />
            <circle
              cx="250"
              cy="150"
              r="8"
              fill={colors.c}
              opacity="0.7"
              className="decoration"
            />

            {/* Letter C - Main Outline */}
            <path
              d="M125 70C85 70 55 100 55 140C55 180 85 210 125 210C145 210 162 201 174 188"
              stroke={colors.c}
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
              className="letter-c"
            />

            {/* Letter C - Inner Detail */}
            <path
              d="M125 90C95 90 75 112 75 140C75 168 95 190 125 190C138 190 150 184 158 176"
              stroke={colors.c}
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              className="letter-c"
              strokeDasharray="1,8"
              strokeDashoffset="2"
              opacity="0.8"
            />

            {/* Letter D - Main Outline */}
            <path
              d="M100 100H130C155 100 175 118 175 140C175 162 155 180 130 180H100"
              stroke={colors.d}
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
              className="letter-d"
            />

            {/* Letter D - Inner Detail */}
            <path
              d="M110 120H130C145 120 155 129 155 140C155 151 145 160 130 160H110"
              stroke={colors.d}
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              className="letter-d"
              strokeDasharray="1,8"
              strokeDashoffset="4"
              opacity="0.8"
            />

            {/* Cherry stems */}
            <path
              d="M174 188C174 188 180 155 200 140C220 125 245 130 245 155"
              stroke={colors.accent3}
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              className="stem"
            />

            {/* Cherry circles */}
            <circle
              cx="174"
              cy="188"
              r="15"
              fill={colors.accent1}
              className="cherry"
            />
            <circle
              cx="245"
              cy="155"
              r="18"
              fill={colors.accent2}
              className="cherry"
            />

            {/* Cherry highlights */}
            <circle
              cx="168"
              cy="182"
              r="4"
              fill="#FFFFFF"
              opacity="0.7"
              className="highlight"
            />
            <circle
              cx="239"
              cy="149"
              r="5"
              fill="#FFFFFF"
              opacity="0.7"
              className="highlight"
            />

            {/* Accent dots */}
            <circle
              cx="100"
              cy="100"
              r="8"
              fill={colors.accent2}
              className="decoration"
            />
            <circle
              cx="100"
              cy="180"
              r="8"
              fill={colors.accent1}
              className="decoration"
            />

            {/* Decorative lines */}
            <rect
              x="195"
              y="110"
              width="20"
              height="7"
              rx="3"
              transform="rotate(30 195 110)"
              fill={colors.accent2}
              className="decoration"
            />
            <rect
              x="200"
              y="123"
              width="20"
              height="7"
              rx="3"
              transform="rotate(30 200 123)"
              fill={colors.c}
              className="decoration"
            />
            <rect
              x="205"
              y="136"
              width="20"
              height="7"
              rx="3"
              transform="rotate(30 205 136)"
              fill={colors.accent2}
              className="decoration"
            />

            {/* Additional decorations */}
            <circle
              cx="125"
              cy="140"
              r="5"
              fill={colors.d}
              className="decoration"
            />
            <circle
              cx="175"
              cy="110"
              r="4"
              fill={colors.accent2}
              className="decoration"
            />
            <circle
              cx="175"
              cy="170"
              r="4"
              fill={colors.accent1}
              className="decoration"
            />

            {/* Removed outer ring with dashed effect */}
          </svg>
        </motion.div>
      </div>

      {withText && (
        <div ref={textRef} className={cn("mt-6 font-bebas", textSizeMap[size])}>
          <span style={{ color: colors.c }}>C</span>
          <span style={{ color: colors.accent1 }}>H</span>
          <span style={{ color: colors.accent2 }}>E</span>
          <span style={{ color: colors.d }}>R</span>
          <span style={{ color: colors.accent3 }}>R</span>
          <span style={{ color: colors.c }}>Y</span>
          <span style={{ color: "#ffffff" }}> </span>
          <span style={{ color: colors.d }}>D</span>
          <span style={{ color: colors.accent1 }}>E</span>
          <span style={{ color: colors.accent2 }}>S</span>
          <span style={{ color: colors.accent3 }}>I</span>
          <span style={{ color: colors.c }}>G</span>
          <span style={{ color: colors.d }}>N</span>
        </div>
      )}
    </div>
  );
}
