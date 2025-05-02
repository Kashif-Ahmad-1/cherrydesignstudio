import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface CherryLogoProps {
  className?: string;
  animate?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  colorful?: boolean;
}

export default function CherryLogo({ 
  className, 
  animate = true, 
  size = 'md',
  colorful = true 
}: CherryLogoProps) {
  const logoRef = useRef<SVGSVGElement>(null);
  
  // Set size based on prop
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };
  
  // Animation effect
  useEffect(() => {
    if (!animate || !logoRef.current) return;
    
    // Get SVG elements
    const logoElements = logoRef.current.querySelectorAll('path, circle, rect');
    
    // Initial setup
    gsap.set(logoElements, { 
      opacity: 0, 
      scale: 0.8,
      transformOrigin: 'center center' 
    });
    
    // Animate in
    const tl = gsap.timeline();
    
    // Animate main elements
    tl.to(logoElements, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.05,
      ease: "elastic.out(1, 0.6)"
    });
    
    // Add hover animation
    if (logoRef.current) {
      logoRef.current.addEventListener('mouseenter', () => {
        gsap.to(logoElements, {
          scale: 1.05,
          stagger: 0.02,
          duration: 0.4,
          ease: "power1.out"
        });
      });
      
      logoRef.current.addEventListener('mouseleave', () => {
        gsap.to(logoElements, {
          scale: 1,
          stagger: 0.01,
          duration: 0.3,
          ease: "power1.inOut"
        });
      });
    }
    
    // Cleanup
    return () => {
      if (logoRef.current) {
        logoRef.current.removeEventListener('mouseenter', () => {});
        logoRef.current.removeEventListener('mouseleave', () => {});
      }
    };
  }, [animate]);
  
  return (
    <svg 
      ref={logoRef}
      viewBox="0 0 200 200" 
      className={cn(sizeMap[size], 'fill-current', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Decorative Background Elements */}
      <circle cx="100" cy="100" r="90" fill={colorful ? "#0A0A0A" : "currentColor"} />
      
      {/* Decorative patterns */}
      <circle cx="40" cy="160" r="15" fill={colorful ? "#FF41A6" : "currentColor"} opacity="0.6" />
      <circle cx="170" cy="50" r="12" fill={colorful ? "#F33D3D" : "currentColor"} opacity="0.7" />
      <circle cx="150" cy="150" r="10" fill={colorful ? "#FFC700" : "currentColor"} opacity="0.7" />
      
      {/* Main 'C' shape */}
      <path
        d="M86 53C62 53 42 73 42 98C42 123 62 143 86 143C97 143 107 139 115 132"
        stroke={colorful ? "#F33D3D" : "white"}
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Cherry stem */}
      <path
        d="M115 132C115 132 118 110 130 100C142 90 158 95 158 110"
        stroke={colorful ? "#8833FF" : "white"}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Cherry circles */}
      <circle cx="115" cy="132" r="10" fill={colorful ? "#FF41A6" : "white"} />
      <circle cx="158" cy="110" r="12" fill={colorful ? "#FFC700" : "white"} />
      
      {/* The 'D' shape */}
      <path
        d="M70 70H90C105 70 118 83 118 98C118 113 105 126 90 126H70"
        stroke={colorful ? "#4BB1F1" : "white"}
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Playful accent dots */}
      <circle cx="70" cy="70" r="5" fill={colorful ? "#FFC700" : "white"} />
      <circle cx="70" cy="126" r="5" fill={colorful ? "#FF41A6" : "white"} />
      
      {/* Decorative notches */}
      <rect x="130" y="75" width="15" height="5" rx="2" transform="rotate(30 130 75)" fill={colorful ? "#FFC700" : "white"} />
      <rect x="135" y="85" width="15" height="5" rx="2" transform="rotate(30 135 85)" fill={colorful ? "#F33D3D" : "white"} />
      <rect x="140" y="95" width="15" height="5" rx="2" transform="rotate(30 140 95)" fill={colorful ? "#FFC700" : "white"} />
    </svg>
  );
}