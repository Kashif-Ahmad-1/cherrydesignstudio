import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const logoRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    // Animate the logo elements
    if (logoRef.current) {
      // Get SVG elements
      const letterC = logoRef.current.querySelectorAll('.letter-c');
      const letterD = logoRef.current.querySelectorAll('.letter-d');
      const cherries = logoRef.current.querySelectorAll('.cherry');
      const stems = logoRef.current.querySelectorAll('.stem');
      const decorations = logoRef.current.querySelectorAll('.decoration');
      const highlights = logoRef.current.querySelectorAll('.highlight');
      
      // Set initial states
      gsap.set([letterC, letterD, cherries, stems, decorations, highlights], { 
        opacity: 0, 
        scale: 0.8,
        y: 10
      });
      
      // Create staggered timeline
      const tl = gsap.timeline();
      
      // Animate elements in sequence
      tl.to(decorations, {
        opacity: 0.7,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.03,
        ease: "power2.out"
      })
      .to(letterC, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6, 
        ease: "back.out(1.7)"
      }, "-=0.2")
      .to(letterD, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.4")
      .to(stems, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.3")
      .to(cherries, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.2")
      .to(highlights, {
        opacity: 0.8,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out"
      }, "-=0.4");
      
      // Add some gentle motion to cherries
      gsap.to(cherries, {
        y: "-=3",
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2
      });
    }
    
    // Hide preloader after animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isLoading) return null;
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2.2 }}
      onAnimationComplete={() => {
        document.body.style.overflow = "auto";
      }}
    >
      <div className="relative flex flex-col items-center">
        {/* Logo animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <svg
            ref={logoRef}
            width="180" 
            height="180" 
            viewBox="0 0 300 300" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background */}
            <circle cx="150" cy="150" r="140" fill="#0A0A0A" className="decoration" />
            
            {/* Decorative elements */}
            <circle cx="70" cy="220" r="18" fill="#FF41A6" opacity="0.6" className="decoration" />
            <circle cx="230" cy="70" r="15" fill="#F33D3D" opacity="0.7" className="decoration" />
            <circle cx="210" cy="210" r="12" fill="#FFC700" opacity="0.7" className="decoration" />
            <polygon points="50,110 65,95 80,110 65,125" fill="#4BB1F1" opacity="0.6" className="decoration" />
            <polygon points="220,40 235,25 250,40 235,55" fill="#FF41A6" opacity="0.7" className="decoration" />
            
            {/* Decorative circles */}
            <circle cx="150" cy="50" r="8" fill="#FFC700" opacity="0.7" className="decoration" />
            <circle cx="150" cy="250" r="8" fill="#8833FF" opacity="0.7" className="decoration" />
            <circle cx="50" cy="150" r="8" fill="#FF41A6" opacity="0.7" className="decoration" />
            <circle cx="250" cy="150" r="8" fill="#F33D3D" opacity="0.7" className="decoration" />
            
            {/* Letter C - Main Outline */}
            <path
              d="M125 70C85 70 55 100 55 140C55 180 85 210 125 210C145 210 162 201 174 188"
              stroke="#F33D3D"
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
              className="letter-c"
            />
            
            {/* Letter C - Inner Detail */}
            <path
              d="M125 90C95 90 75 112 75 140C75 168 95 190 125 190C138 190 150 184 158 176"
              stroke="#F33D3D"
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
              stroke="#4BB1F1"
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
              className="letter-d"
            />
            
            {/* Letter D - Inner Detail */}
            <path
              d="M110 120H130C145 120 155 129 155 140C155 151 145 160 130 160H110"
              stroke="#4BB1F1"
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
              stroke="#8833FF"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              className="stem"
            />
            
            {/* Cherry circles */}
            <circle cx="174" cy="188" r="15" fill="#FF41A6" className="cherry" />
            <circle cx="245" cy="155" r="18" fill="#FFC700" className="cherry" />
            
            {/* Cherry highlights */}
            <circle cx="168" cy="182" r="4" fill="#FFFFFF" opacity="0.7" className="highlight" />
            <circle cx="239" cy="149" r="5" fill="#FFFFFF" opacity="0.7" className="highlight" />
            
            {/* Accent dots */}
            <circle cx="100" cy="100" r="8" fill="#FFC700" className="decoration" />
            <circle cx="100" cy="180" r="8" fill="#FF41A6" className="decoration" />
            
            {/* Decorative lines */}
            <rect x="195" y="110" width="20" height="7" rx="3" transform="rotate(30 195 110)" 
                fill="#FFC700" className="decoration" />
            <rect x="200" y="123" width="20" height="7" rx="3" transform="rotate(30 200 123)" 
                fill="#F33D3D" className="decoration" />
            <rect x="205" y="136" width="20" height="7" rx="3" transform="rotate(30 205 136)" 
                fill="#FFC700" className="decoration" />
                
            {/* Additional decorations */}
            <circle cx="125" cy="140" r="5" fill="#4BB1F1" className="decoration" />
            <circle cx="175" cy="110" r="4" fill="#FFC700" className="decoration" />
            <circle cx="175" cy="170" r="4" fill="#FF41A6" className="decoration" />
            
            {/* Outer ring with dashed effect */}
            <circle 
              cx="150" 
              cy="150" 
              r="145" 
              fill="none" 
              stroke="#8833FF" 
              strokeWidth="2"
              strokeDasharray="10,10"
              className="decoration"
            />
          </svg>
        </motion.div>
        
        {/* Cherry.design text */}
        <motion.div
          className="font-bebas tracking-wider text-5xl mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <span className="text-[#F33D3D]">C</span>
          <span className="text-[#FF41A6]">H</span>
          <span className="text-[#FFC700]">E</span>
          <span className="text-[#4BB1F1]">R</span>
          <span className="text-[#8833FF]">R</span>
          <span className="text-[#F33D3D]">Y</span>
          <span className="text-white opacity-70">.</span>
          <span className="text-[#4BB1F1]">D</span>
          <span className="text-[#FF41A6]">E</span>
          <span className="text-[#FFC700]">S</span>
          <span className="text-[#8833FF]">I</span>
          <span className="text-[#F33D3D]">G</span>
          <span className="text-[#4BB1F1]">N</span>
        </motion.div>
        
        {/* Tagline */}
        <motion.div
          className="text-white/70 font-space-mono text-sm mt-2 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          Maximalist Web Design Agency
        </motion.div>
        
        {/* Loading bar */}
        <div className="w-64 h-2 bg-black/50 mt-8 rounded-full overflow-hidden border border-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-[#F33D3D] via-[#FF41A6] to-[#4BB1F1]"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  );
}