import { useEffect, useRef, useState } from "react";
import { ArrowLeft, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Link } from "wouter";
import CherryMaximalLogo from "@/components/ui/cherry-maximal-logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Create an array of shapes for decorative elements
  const shapes = [
    { type: "circle", color: "#F33D3D", size: 80, position: { x: "15%", y: "20%" } },
    { type: "square", color: "#4BB1F1", size: 60, position: { x: "80%", y: "15%" } },
    { type: "triangle", color: "#FF41A6", size: 70, position: { x: "75%", y: "70%" } },
    { type: "cross", color: "#FFC700", size: 50, position: { x: "20%", y: "75%" } },
    { type: "star", color: "#8833FF", size: 40, position: { x: "50%", y: "85%" } },
  ];

  useEffect(() => {
    if (!titleRef.current) return;
    
    // Animate the 404 text
    const chars = titleRef.current.querySelectorAll(".char");
    gsap.set(chars, { opacity: 0, y: 30 });
    
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "back.out(1.7)",
      delay: 0.3
    });
    
    // Animate the background shapes
    const shapesElements = document.querySelectorAll(".decorative-shape");
    gsap.from(shapesElements, {
      scale: 0,
      opacity: 0,
      rotation: -180,
      duration: 1.2,
      stagger: 0.1,
      ease: "elastic.out(1, 0.5)",
      delay: 0.2
    });
    
    // Continuous floating animation
    gsap.to(shapesElements, {
      y: "random(-20, 20)",
      x: "random(-20, 20)",
      rotation: "random(-15, 15)",
      duration: "random(3, 5)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: 0.2,
        from: "random"
      }
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-white overflow-hidden relative"
      onMouseMove={(e) => {
        // Parallax effect for decorative elements
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
        const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
        
        gsap.to(".decorative-shape", {
          x: (i) => mouseX * (i + 1) * 25,
          y: (i) => mouseY * (i + 1) * 25,
          duration: 0.5,
          ease: "power1.out"
        });
      }}
    >
      {/* Decorative background shapes */}
      {shapes.map((shape, index) => {
        let ShapeElement;
        
        switch(shape.type) {
          case "circle":
            ShapeElement = <div className="rounded-full" style={{ width: shape.size, height: shape.size, background: shape.color }} />;
            break;
          case "square":
            ShapeElement = <div className="rounded-md" style={{ width: shape.size, height: shape.size, background: shape.color }} />;
            break;
          case "triangle":
            ShapeElement = (
              <div style={{ width: shape.size, height: shape.size }}>
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <polygon points="50,0 100,100 0,100" fill={shape.color} />
                </svg>
              </div>
            );
            break;
          case "cross":
            ShapeElement = (
              <div style={{ width: shape.size, height: shape.size }}>
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <rect x="30" y="0" width="40" height="100" fill={shape.color} />
                  <rect x="0" y="30" width="100" height="40" fill={shape.color} />
                </svg>
              </div>
            );
            break;
          case "star":
            ShapeElement = (
              <div style={{ width: shape.size, height: shape.size }}>
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill={shape.color} />
                </svg>
              </div>
            );
            break;
          default:
            ShapeElement = <div />;
        }
        
        return (
          <motion.div
            key={index}
            className="absolute decorative-shape z-0 opacity-70"
            style={{
              top: shape.position.y,
              left: shape.position.x,
              filter: "blur(1px)",
              transform: `rotate(${index * 30}deg)`
            }}
            whileHover={{ scale: 1.2, rotate: 180, opacity: 1, filter: "blur(0px)" }}
          >
            {ShapeElement}
          </motion.div>
        );
      })}

      {/* Grid background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="w-full h-full" style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="z-10 flex flex-col items-center justify-center p-8 max-w-4xl text-center">
        {/* Logo */}
        <div className="mb-6">
          <CherryMaximalLogo size="md" colorScheme="neon" />
        </div>
        
        {/* 404 Title with multicolor letters */}
        <h1 
          ref={titleRef} 
          className="font-bebas text-8xl md:text-9xl leading-none tracking-tighter mb-6"
        >
          <span className="char" style={{ color: "#F33D3D" }}>4</span>
          <span className="char" style={{ color: "#4BB1F1" }}>0</span>
          <span className="char" style={{ color: "#FF41A6" }}>4</span>
        </h1>
        
        {/* Error message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="relative mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bebas tracking-wide">
            <span className="inline-block" style={{ color: "#FFC700" }}>PAGE</span>
            <span className="inline-block mx-2" style={{ color: "#8833FF" }}>NOT</span>
            <span className="inline-block" style={{ color: "#F33D3D" }}>FOUND</span>
          </h2>
          <p className="mt-4 text-lg md:text-xl max-w-xl text-gray-300">
            Oops! Looks like you've ventured into uncharted digital territory. The page you're seeking has gone MIA.
          </p>
        </motion.div>
        
        {/* Error icon with glitch effect */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
          className="mb-8"
        >
          <div 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <XCircle 
              size={100} 
              className={`stroke-red-500 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-80'}`} 
              strokeWidth={1.5} 
            />
            {isHovered && (
              <>
                <XCircle 
                  size={100} 
                  className="stroke-cyan-500 absolute top-0 left-0 opacity-60 animate-pulse" 
                  strokeWidth={1.5} 
                  style={{ transform: 'translate(-5px, -5px)', filter: 'blur(2px)' }} 
                />
                <XCircle 
                  size={100} 
                  className="stroke-pink-500 absolute top-0 left-0 opacity-60 animate-pulse" 
                  strokeWidth={1.5} 
                  style={{ transform: 'translate(5px, 5px)', filter: 'blur(2px)' }} 
                />
              </>
            )}
          </div>
        </motion.div>
        
        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/">
            <Button 
              variant="outline" 
              size="lg"
              className="group relative overflow-hidden border-2 border-white/20 hover:border-white/50 bg-transparent hover:bg-transparent transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
              <span className="font-bebas tracking-wide text-lg">Back to Home</span>
            </Button>
          </Link>
          
          <Link href="/contact">
            <Button 
              size="lg"
              className="group relative overflow-hidden border-2 border-transparent bg-gradient-to-r from-[#F33D3D] to-[#FF41A6] hover:from-[#FF41A6] hover:to-[#F33D3D] transition-all duration-500"
            >
              <span className="font-bebas tracking-wide text-lg">Contact Us</span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
