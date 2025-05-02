import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CherryInteractiveLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  withText?: boolean;
  interactive?: boolean;
}

export default function CherryInteractiveLogo({
  className,
  size = 'lg',
  withText = true,
  interactive = true
}: CherryInteractiveLogoProps) {
  const logoRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  // Size mapping
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
    xxl: 'w-64 h-64'
  };
  
  // Text size mapping
  const textSizeMap = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl',
    xxl: 'text-4xl'
  };
  
  // Animation setup
  useEffect(() => {
    if (!logoRef.current || !interactive) return;
    
    // Initial animation
    const elements = logoRef.current.querySelectorAll('path, circle, polygon, rect');
    const cherries = logoRef.current.querySelectorAll('.cherry');
    const stems = logoRef.current.querySelectorAll('.stem');
    const letterC = logoRef.current.querySelectorAll('.letter-c');
    const letterD = logoRef.current.querySelectorAll('.letter-d');
    const decorations = logoRef.current.querySelectorAll('.decoration');
    
    // Set initial states
    gsap.set([elements], {
      opacity: 0,
      y: 20,
      scale: 0.9,
      transformOrigin: 'center center'
    });
    
    // Animate in with staggered timeline
    const tl = gsap.timeline();
    
    tl.to(letterC, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.4)",
      stagger: 0.1
    })
    .to(letterD, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.4)",
      stagger: 0.1
    }, "-=0.3")
    .to(stems, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.2")
    .to(cherries, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
      stagger: 0.1
    }, "-=0.3")
    .to(decorations, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: "power1.out",
      stagger: 0.05
    }, "-=0.5");
    
    // Add wiggle animation to cherries
    gsap.to(cherries, {
      y: "-=3",
      duration: 1.2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.2
    });
    
    // Text animation if present
    if (textRef.current && withText) {
      const letters = textRef.current.querySelectorAll('span');
      gsap.set(letters, {
        opacity: 0,
        y: 10,
        scale: 0.9
      });
      
      gsap.to(letters, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.05,
        duration: 0.4,
        ease: "back.out(1.7)",
        delay: 0.8
      });
    }
  }, [interactive, withText]);
  
  // Handle interactive states
  const handleMouseEnter = () => {
    if (!interactive || !logoRef.current) return;
    setIsHovered(true);
    
    // Cherry bounce animation
    const cherries = logoRef.current.querySelectorAll('.cherry');
    gsap.to(cherries, {
      scale: 1.2,
      duration: 0.4,
      ease: "elastic.out(1, 0.5)",
      stagger: 0.1
    });
    
    // Letters pulse
    const letters = logoRef.current.querySelectorAll('.letter-c, .letter-d');
    gsap.to(letters, {
      strokeWidth: "+=2",
      scale: 1.05,
      duration: 0.3,
      ease: "power1.out"
    });
  };
  
  const handleMouseLeave = () => {
    if (!interactive || !logoRef.current) return;
    setIsHovered(false);
    
    // Reset cherry animation
    const cherries = logoRef.current.querySelectorAll('.cherry');
    gsap.to(cherries, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
      stagger: 0.05
    });
    
    // Reset letters
    const letters = logoRef.current.querySelectorAll('.letter-c, .letter-d');
    gsap.to(letters, {
      strokeWidth: "-=2",
      scale: 1,
      duration: 0.3,
      ease: "power1.inOut"
    });
  };
  
  const handleClick = () => {
    if (!interactive || !logoRef.current) return;
    setIsClicked(true);
    
    // Burst animation
    const decorations = logoRef.current.querySelectorAll('.decoration');
    gsap.to(decorations, {
      scale: 1.5,
      opacity: 0.8,
      rotation: "+=45",
      duration: 0.4,
      ease: "power1.out",
      stagger: 0.05,
      onComplete: () => {
        gsap.to(decorations, {
          scale: 1,
          opacity: 0.6,
          rotation: "-=45",
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
          stagger: 0.03,
          onComplete: () => setIsClicked(false)
        });
      }
    });
    
    // Wobble the whole logo
    gsap.to(logoRef.current, {
      rotation: -5,
      duration: 0.1,
      ease: "power1.inOut",
      onComplete: () => {
        gsap.to(logoRef.current, {
          rotation: 5,
          duration: 0.1,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.to(logoRef.current, {
              rotation: 0,
              duration: 0.3,
              ease: "elastic.out(1, 0.5)"
            });
          }
        });
      }
    });
  };
  
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <motion.div 
        className={cn(sizeMap[size], "cursor-pointer")}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          ref={logoRef} 
          viewBox="0 0 240 240"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Background & Decorations */}
          <circle cx="120" cy="120" r="110" fill="#0A0A0A" className="decoration" />
          
          {/* Decorative elements */}
          <circle cx="50" cy="180" r="15" fill="#FF41A6" opacity="0.6" className="decoration" />
          <circle cx="190" cy="60" r="12" fill="#F33D3D" opacity="0.7" className="decoration" />
          <circle cx="170" cy="170" r="10" fill="#FFC700" opacity="0.7" className="decoration" />
          <polygon points="30,90 40,80 50,90 40,100" fill="#4BB1F1" opacity="0.6" className="decoration" />
          <polygon points="180,30 190,20 200,30 190,40" fill="#FF41A6" opacity="0.7" className="decoration" />
          
          {/* Letter C */}
          <path
            d="M100 60C70 60 46 84 46 115C46 146 70 170 100 170C115 170 128 164 138 154"
            stroke="#F33D3D"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
            className="letter-c"
          />
          
          {/* Letter D */}
          <path
            d="M80 80H105C125 80 142 97 142 115C142 133 125 150 105 150H80"
            stroke="#4BB1F1"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
            className="letter-d"
          />
          
          {/* Cherry stems */}
          <path
            d="M138 154C138 154 140 125 155 112C170 100 190 105 190 125"
            stroke="#8833FF"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            className="stem"
          />
          
          {/* Cherry */}
          <circle cx="138" cy="154" r="12" fill="#FF41A6" className="cherry" />
          <circle cx="190" cy="125" r="15" fill="#FFC700" className="cherry" />
          
          {/* Accent dots */}
          <circle cx="80" cy="80" r="6" fill="#FFC700" className="decoration" />
          <circle cx="80" cy="150" r="6" fill="#FF41A6" className="decoration" />
          
          {/* Decorative lines */}
          <rect x="155" y="90" width="18" height="6" rx="3" transform="rotate(30 155 90)" fill="#FFC700" className="decoration" />
          <rect x="160" y="100" width="18" height="6" rx="3" transform="rotate(30 160 100)" fill="#F33D3D" className="decoration" />
          <rect x="165" y="110" width="18" height="6" rx="3" transform="rotate(30 165 110)" fill="#FFC700" className="decoration" />
          
          {/* Additional decorative elements */}
          <circle cx="70" cy="115" r="4" fill="#4BB1F1" className="decoration" />
          <circle cx="120" cy="75" r="4" fill="#FFC700" className="decoration" />
          <circle cx="120" cy="155" r="4" fill="#FF41A6" className="decoration" />
        </svg>
      </motion.div>
      
      {withText && (
        <div 
          ref={textRef} 
          className={cn("mt-4 font-bebas tracking-widest", textSizeMap[size])}
        >
          <span style={{ color: "#F33D3D" }}>C</span>
          <span style={{ color: "#FF41A6" }}>H</span>
          <span style={{ color: "#FFC700" }}>E</span>
          <span style={{ color: "#4BB1F1" }}>R</span>
          <span style={{ color: "#8833FF" }}>R</span>
          <span style={{ color: "#F33D3D" }}>Y</span>
          <span style={{ color: "#000000" }}> </span>
          <span style={{ color: "#4BB1F1" }}>D</span>
          <span style={{ color: "#FF41A6" }}>E</span>
          <span style={{ color: "#FFC700" }}>S</span>
          <span style={{ color: "#8833FF" }}>I</span>
          <span style={{ color: "#F33D3D" }}>G</span>
          <span style={{ color: "#4BB1F1" }}>N</span>
        </div>
      )}
    </div>
  );
}