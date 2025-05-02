import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import CherryMaximalLogo from './ui/cherry-maximal-logo';
import SectionTransition from './ui/section-transition';

export default function MaximalLogoShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeColorScheme, setActiveColorScheme] = useState<'default' | 'neon' | 'pastel' | 'monochrome'>('default');
  const [style3d, setStyle3d] = useState(true);
  const controlsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !controlsRef.current) return;
    
    // Animate in the controls
    gsap.from(controlsRef.current.children, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      }
    });
  }, []);
  
  // Color scheme options
  const colorSchemes = [
    { id: 'default', name: 'Default', color: '#F33D3D' },
    { id: 'neon', name: 'Neon', color: '#00FFFF' },
    { id: 'pastel', name: 'Pastel', color: '#FFB6C1' },
    { id: 'monochrome', name: 'Monochrome', color: '#FFFFFF' }
  ];
  
  return (
    <SectionTransition effect="fade" className="py-24 bg-black/20 backdrop-blur-sm">
      <div ref={sectionRef} className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bebas text-center mb-8">
          <span className="text-[#F33D3D]">M</span>
          <span className="text-[#FF41A6]">A</span>
          <span className="text-[#FFC700]">X</span>
          <span className="text-[#4BB1F1]">I</span>
          <span className="text-[#8833FF]">M</span>
          <span className="text-[#F33D3D]">A</span>
          <span className="text-white">L</span>
          <span className="text-[#FFC700]">I</span>
          <span className="text-[#FF41A6]">S</span>
          <span className="text-[#8833FF]">T</span>
          <span className="text-white"> </span>
          <span className="text-[#F33D3D]">L</span>
          <span className="text-[#4BB1F1]">O</span>
          <span className="text-[#FFC700]">G</span>
          <span className="text-[#FF41A6]">O</span>
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-10">
          {/* Logo Display */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <CherryMaximalLogo 
              size="xl" 
              colorScheme={activeColorScheme} 
              style3d={style3d} 
              interactive={true} 
              withText={true}
            />
          </motion.div>
          
          {/* Controls */}
          <div 
            ref={controlsRef}
            className="flex-1 bg-black/30 backdrop-blur-sm p-8 rounded-xl border border-white/10"
          >
            <h3 className="text-2xl font-bebas text-[#FFC700] mb-6">Customize Your Logo</h3>
            
            {/* Color Scheme Controls */}
            <div className="mb-8">
              <p className="font-space-mono text-white mb-3">Color Scheme</p>
              <div className="flex flex-wrap gap-3">
                {colorSchemes.map((scheme) => (
                  <button
                    key={scheme.id}
                    className={`px-4 py-2 rounded-full font-bebas text-lg transition-all duration-300 ${
                      activeColorScheme === scheme.id
                        ? 'bg-white text-black scale-110'
                        : 'bg-black/50 text-white/70 hover:bg-black/70'
                    }`}
                    style={{
                      boxShadow: activeColorScheme === scheme.id ? `0 0 15px ${scheme.color}` : 'none'
                    }}
                    onClick={() => setActiveColorScheme(scheme.id as any)}
                  >
                    {scheme.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 3D Effect Toggle */}
            <div className="mb-8">
              <p className="font-space-mono text-white mb-3">3D Effect</p>
              <div className="flex gap-3">
                <button
                  className={`px-6 py-2 rounded-full font-bebas text-lg transition-all duration-300 ${
                    style3d
                      ? 'bg-white text-black scale-110'
                      : 'bg-black/50 text-white/70 hover:bg-black/70'
                  }`}
                  onClick={() => setStyle3d(true)}
                >
                  ON
                </button>
                <button
                  className={`px-6 py-2 rounded-full font-bebas text-lg transition-all duration-300 ${
                    !style3d
                      ? 'bg-white text-black scale-110'
                      : 'bg-black/50 text-white/70 hover:bg-black/70'
                  }`}
                  onClick={() => setStyle3d(false)}
                >
                  OFF
                </button>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="font-space-mono text-white/70 text-sm">
                Hover and click on the logo to see the interactive effects.
                Move your mouse over the logo to see the 3D tilt effect.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionTransition>
  );
}