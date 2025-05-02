import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

// Types of particles to show in the cursor trail
const particleTypes = [
  { shape: 'circle', size: 6, color: '#F96C53' },
  { shape: 'circle', size: 8, color: '#2982C4' },
  { shape: 'circle', size: 5, color: '#F2A93C' },
  { shape: 'square', size: 7, color: '#FBD1B8' },
  { shape: 'circle', size: 4, color: '#F96C53' },
  { shape: 'triangle', size: 6, color: '#2982C4' },
  { shape: 'plus', size: 8, color: '#F2A93C' },
  { shape: 'circle', size: 5, color: '#FBD1B8' },
];

// Interface for a trail particle
interface TrailParticle {
  id: number;
  x: number;
  y: number;
  type: typeof particleTypes[number];
}

export default function CursorTrail() {
  const [particles, setParticles] = useState<TrailParticle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const countRef = useRef(0);
  const isEnabledRef = useRef(true);
  const throttlingRef = useRef(false);

  // Generate a particle at the current mouse position
  const addParticle = () => {
    if (!isEnabledRef.current || throttlingRef.current) return;
    
    // Add throttling to limit particle generation rate
    throttlingRef.current = true;
    setTimeout(() => {
      throttlingRef.current = false;
    }, 50); // Throttle to limit particle creation to every 50ms
    
    const particle: TrailParticle = {
      id: countRef.current++,
      x: mousePosition.x,
      y: mousePosition.y,
      type: particleTypes[Math.floor(Math.random() * particleTypes.length)]
    };
    
    setParticles(prev => [...prev, particle]);
    
    // Remove particle after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== particle.id));
    }, 1000);
  };
  
  // Handle mouse move events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      addParticle();
    };
    
    // Handle visibility changes to pause effects when tab is inactive
    const handleVisibilityChange = () => {
      isEnabledRef.current = document.visibilityState === 'visible';
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.addEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [mousePosition]);
  
  // Render particle based on shape
  const renderParticle = (particle: TrailParticle) => {
    switch (particle.type.shape) {
      case 'circle':
        return (
          <motion.div
            key={particle.id}
            className="absolute pointer-events-none"
            style={{
              width: particle.type.size,
              height: particle.type.size,
              borderRadius: '50%',
              backgroundColor: particle.type.color,
              left: particle.x - particle.type.size / 2,
              top: particle.y - particle.type.size / 2,
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ 
              scale: [0, 1.5, 0], 
              opacity: [0.8, 0.5, 0],
              x: [0, (Math.random() - 0.5) * 50],
              y: [0, (Math.random() - 0.5) * 50],
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        );
      case 'square':
        return (
          <motion.div
            key={particle.id}
            className="absolute pointer-events-none"
            style={{
              width: particle.type.size,
              height: particle.type.size,
              backgroundColor: particle.type.color,
              left: particle.x - particle.type.size / 2,
              top: particle.y - particle.type.size / 2,
            }}
            initial={{ scale: 0, opacity: 0.8, rotate: 0 }}
            animate={{ 
              scale: [0, 1.5, 0], 
              opacity: [0.8, 0.5, 0],
              rotate: [0, 180],
              x: [0, (Math.random() - 0.5) * 60],
              y: [0, (Math.random() - 0.5) * 60],
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        );
      case 'triangle':
        return (
          <motion.div
            key={particle.id}
            className="absolute pointer-events-none"
            style={{
              width: 0,
              height: 0,
              borderLeft: `${particle.type.size / 2}px solid transparent`,
              borderRight: `${particle.type.size / 2}px solid transparent`,
              borderBottom: `${particle.type.size}px solid ${particle.type.color}`,
              left: particle.x - particle.type.size / 2,
              top: particle.y - particle.type.size / 2,
            }}
            initial={{ scale: 0, opacity: 0.8, rotate: 0 }}
            animate={{ 
              scale: [0, 1.5, 0], 
              opacity: [0.8, 0.5, 0],
              rotate: [0, 120],
              x: [0, (Math.random() - 0.5) * 70],
              y: [0, (Math.random() - 0.5) * 70],
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        );
      case 'plus':
        return (
          <motion.div
            key={particle.id}
            className="absolute pointer-events-none"
            style={{
              left: particle.x - particle.type.size / 2,
              top: particle.y - particle.type.size / 2,
            }}
            initial={{ scale: 0, opacity: 0.8, rotate: 0 }}
            animate={{ 
              scale: [0, 1.5, 0], 
              opacity: [0.8, 0.5, 0],
              rotate: [0, 90],
              x: [0, (Math.random() - 0.5) * 80],
              y: [0, (Math.random() - 0.5) * 80],
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div style={{
              position: 'relative',
              width: particle.type.size,
              height: particle.type.size / 3,
              backgroundColor: particle.type.color,
              top: particle.type.size / 3,
            }} />
            <div style={{
              position: 'relative',
              width: particle.type.size / 3,
              height: particle.type.size,
              backgroundColor: particle.type.color,
              top: -particle.type.size / 3,
              left: particle.type.size / 3,
            }} />
          </motion.div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {particles.map(renderParticle)}
      </AnimatePresence>
    </div>
  );
}