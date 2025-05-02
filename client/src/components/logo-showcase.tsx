import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import CherryInteractiveLogo from './ui/cherry-interactive-logo';
import SectionTransition from './ui/section-transition';

export default function LogoShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLElement | null)[]>([]);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Staggered animation for the text elements
    const textElements = textRefs.current.filter(Boolean);
    
    gsap.set(textElements, {
      y: 30,
      opacity: 0
    });
    
    gsap.to(textElements, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });
  }, []);
  
  return (
    <SectionTransition effect="fade" className="py-24 overflow-hidden">
      <div ref={sectionRef} className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            className="mb-12"
          >
            <CherryInteractiveLogo 
              size="xxl" 
              withText={true} 
              interactive={true} 
            />
          </motion.div>
          
          {/* Tagline */}
          <div 
            ref={el => textRefs.current[0] = el}
            className="max-w-4xl mx-auto mb-8 font-space-mono text-xl md:text-2xl text-white/80"
          >
            <span className="text-[#FF41A6]">Bold</span> • <span className="text-[#F33D3D]">Creative</span> • <span className="text-[#FFC700]">Distinctive</span>
          </div>
          
          {/* Description */}
          <div 
            ref={el => textRefs.current[1] = el}
            className="max-w-2xl mx-auto text-white/70 font-space-mono"
          >
            <p>Cherry Design creates immersive, innovative web experiences that push the boundaries of digital design. From interactive animations to maximalist layouts, we bring your wildest creative visions to life.</p>
          </div>
          
          {/* Call to action */}
          <div ref={el => textRefs.current[2] = el}>
            <motion.button
              className="mt-10 px-8 py-3 font-bebas text-2xl bg-gradient-to-r from-[#F33D3D] to-[#FF41A6] text-white rounded-full"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 65, 166, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              EXPLORE OUR WORK
            </motion.button>
          </div>
        </div>
      </div>
    </SectionTransition>
  );
}