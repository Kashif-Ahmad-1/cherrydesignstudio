import { motion } from "framer-motion";
import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

// Client logos exactly as in the reference image
const clientLogos = [
  {
    name: "The Guardian",
    logo: `<svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 7.5h23.03v40H0V7.5z" fill="#FBD1B8"/>
      <path d="M31.12 20.52c0-4.56 3.74-8.27 8.38-8.27 4.63 0 8.37 3.71 8.37 8.27 0 4.55-3.74 8.27-8.37 8.27-4.64 0-8.38-3.72-8.38-8.27z" fill="#FBD1B8"/>
      <path d="M91.9 7.5h23.03v40H91.9V7.5z" fill="#FBD1B8"/>
    </svg>`
  },
  {
    name: "Delphia",
    logo: `<svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M80 25c0 13.81-11.19 25-25 25S30 38.81 30 25 41.19 0 55 0s25 11.19 25 25zm-7.01 0c0-9.94-8.05-18-17.99-18S37.01 15.06 37.01 25s8.06 18 17.99 18 17.99-8.06 17.99-18z" fill="#FBD1B8"/>
      <path d="M87.5 15h52v5h-52v-5zM87.5 25h52v5h-52v-5zM87.5 35h52v5h-52v-5z" fill="#FBD1B8"/>
    </svg>`
  },
  {
    name: "Nike",
    logo: `<svg viewBox="0 0 100 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.42 0C8.75 0 0 8.76 0 19.42c0 10.68 8.76 19.43 19.42 19.43 10.68 0 19.43-8.75 19.43-19.43C38.85 8.76 30.1 0 19.42 0zm14.89 21.41c-6.18 3.05-19.42 9.45-28.12.77-.56-.58-1.05-1.15-1.46-1.7C1.76 16.18 2.31 8.71 5.31 3.93c2.03.16 6.25 1.88 8.56 6.18 0 0 1.5-1.66 3.63-2.74.98-.5 2.14-.9 3.48-1.12 3.18-.52 6.14.11 8.52 1.84 3.33 2.39 5.22 6.13 5.35 10.16.14 3.97-2.13 7.63-4.65 8.87-2.82 1.38-5.95.52-7.52-1.9-.96-1.5-1.18-3.31-.65-5.09.54-1.77 1.7-3.28 3.28-4.23 3.17-1.87 6.28-.04 6.86 1.8.82 2.82-2.24 5.53-5.01 3.5-.98-.72-.96-1.34-1.24-2-1.03 1.05-.88 2.8.01 3.7 1.5 1.41 4.41 1.11 6.08-.81 2.14-2.5 1.48-6.3-1.43-8.28-2.96-2.01-7.39-1.01-9.69 2.2-2.33 3.24-1.62 7.65 1.62 9.96 3.36 2.4 7.45 1.76 10.07-.07 3.32-2.33 5.3-6.53 5.32-10.38-.48 3.84-2.59 7.15-5.3 9.12 3.28-2.82 5.27-7.05 5.26-10.95 0-.14 0-.28-.01-.42-.12 2.63-1.1 5.17-2.77 7.12 1.99-2.73 2.95-6.22 2.67-9.56-3.67-2.46-9.03-2.36-12.24-.28-3.16 2.05-3.74 5.45-3.6 6.37.12.92 2.9 2.68 5.46.54 2.56-2.12.64-5.23.29-4.8-.33.44-2.23.58-2.46-1.2-.22-1.75 4.14-3.71 9.27.11 4.15 3.06 2.38 9.75-3.73 11.94-5.47 1.97-10.52-1.33-10.38-6.75.08-3.27 1.75-5.88 4.3-7.42-2.8 1.04-4.97 3.45-5.8 6.38-.15-3.68 1.76-7.19 4.95-9.09-1.26.16-2.51.51-3.65 1.07-1.75.83-3.13 2.13-4.1 3.66.28-3.83 2.97-7.04 6.68-8.26-3.91-.1-7.47 2.07-9.23 5.63.21-4.79 3.75-8.76 8.47-9.57-3.44-2.84-6.56-3.47-8.67-2.99 3.12-5.64 11.51-9.25 19.01-4.55 7.89 4.92 5.71 14.59.81 17.68 5.11-1.94 8.37-8.03 4.83-13.82-2.88-4.72-9.41-4.64-12.28-2.82 4.04-4.22 10.88-2.56 13.32 1.29.32.48.57 1 .76 1.54 1.5-4.7-.55-9.66-4.9-11.87-4.36-2.2-9.64-.63-12.6 3.76.21-.3.45-.59.7-.86C9.74 1.41 19.38-.67 26.26 4.7c7.66 6.13 4.7 17.41-8.06 16.84-5.22-.23-8.75-4.47-8.34-8.86-.14 4.7 3.8 8.82 9.24 9.2 11.5.8 14.03-9.21 7.29-14.73a15.35 15.35 0 00-.37-.32c2.34 2.19 3.82 5.29 3.82 8.58.03 4.45-2.52 8.68-6.53 10.53z" fill="#FBD1B8"/>
    </svg>`
  },
  {
    name: "Tentree",
    logo: `<svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M65 10c8.28 0 15 6.72 15 15 0 8.28-6.72 15-15 15s-15-6.72-15-15c0-8.28 6.72-15 15-15zm0 7c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8z" fill="#FBD1B8"/>
      <path d="M120 10h10v30h-10V10zM140 10h10v30h-10V10z" fill="#FBD1B8"/>
    </svg>`
  },
  {
    name: "Peace & Justice Project",
    logo: `<svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M45 0C20.15 0 0 20.15 0 45s20.15 45 45 45 45-20.15 45-45S69.85 0 45 0zm0 10c19.33 0 35 15.67 35 35S64.33 80 45 80 10 64.33 10 45 25.67 10 45 10z" fill="#FBD1B8"/>
    </svg>`
  },
  {
    name: "United Nations",
    logo: `<svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M80 20c-22.09 0-40 17.91-40 40s17.91 40 40 40 40-17.91 40-40-17.91-40-40-40zm0 10c16.57 0 30 13.43 30 30S96.57 90 80 90 50 76.57 50 60 63.43 30 80 30z" fill="#FBD1B8"/>
      <path d="M75 50h10v20h-10V50zM65 60h30v10H65V60z" fill="#FBD1B8"/>
    </svg>`
  },
  {
    name: "Google",
    logo: `<svg viewBox="0 0 272.2 92.5" fill="#FBD1B8">
      <path d="M115.75 46.25c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 33.2 81.24 24 93.5 24s22.25 9.2 22.25 22.25zM93.5 33.26c-6.78 0-12.62 5.43-12.62 12.99 0 7.27 5.84 13 12.62 13 6.73 0 12.57-5.72 12.57-13 0-7.57-5.84-12.99-12.57-12.99zM163.75 46.25c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-13.06 9.99-22.25 22.25-22.25s22.25 9.2 22.25 22.25zm-22.25-12.99c-6.78 0-12.62 5.43-12.62 12.99 0 7.27 5.84 13 12.62 13 6.73 0 12.57-5.72 12.57-13 0-7.57-5.84-12.99-12.57-12.99zM209.75 33.53v3.75h-7.98c-6.53 0-7.27 4.91-7.27 7.71v32.76h-9.42V43.03c0-6.54 3.51-11.98 15.68-11.98h8.99zM239.65 33.53c8.55 0 15.44 6.15 15.44 14.77v19.43h-8.71V48.36c0-5.59-4.07-6.54-6.53-6.54-4.22 0-6.54 3.33-6.54 6.64v20.28h-8.71V48.8c0-5.86-3.33-6.99-6.53-6.99-5.11 0-6.54 4.12-6.54 6.5v20.42h-8.71V44.07c0-3.07.44-4.07 1.49-5.91 2.07-3.37 7.07-6.32 13.32-6.32 4.87 0 10.4 2.07 12.27 6.12 1.91-2.1 6.54-6.12 13.75-6.43z"/>
    </svg>`
  },
  {
    name: "Superside",
    logo: `<svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 0C11.19 0 0 11.19 0 25s11.19 25 25 25 25-11.19 25-25S38.81 0 25 0zm0 10c8.28 0 15 6.72 15 15s-6.72 15-15 15S10 33.28 10 25s6.72-15 15-15z" fill="#FBD1B8"/>
      <path d="M125 0c-13.81 0-25 11.19-25 25s11.19 25 25 25 25-11.19 25-25S138.81 0 125 0zm0 10c8.28 0 15 6.72 15 15s-6.72 15-15 15-15-6.72-15-15 6.72-15 15-15z" fill="#FBD1B8"/>
      <path d="M75 10c-8.28 0-15 6.72-15 15 0 8.28 6.72 15 15 15h50v-30H75z" fill="#FBD1B8"/>
    </svg>`
  }
];

export default function Clients() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useIntersectionObserver(sectionRef, {
    threshold: 0.2,
    freezeOnceVisible: true
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: 0.06 * custom,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const buttonVariants = {
    hidden: { scaleX: 0 },
    visible: (custom: number) => ({ 
      scaleX: 1,
      transition: { 
        duration: 0.5, 
        delay: 0.1 * custom,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <div 
      ref={sectionRef}
      className="relative bg-black text-white py-[5vw] px-[3vw] w-full border-b border-white/10"
      style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.97), rgba(0, 0, 0, 0.97)), url('/grid-bg.svg')",
        backgroundSize: "100% 100%"
      }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 13 }).map((_, i) => (
            <div key={`v-${i}`} className="border-l border-white h-full"></div>
          ))}
        </div>
        <div className="grid grid-rows-12 w-full absolute top-0 left-0">
          {Array.from({ length: 13 }).map((_, i) => (
            <div key={`h-${i}`} className="border-t border-white w-full"></div>
          ))}
        </div>
      </div>

      <div className="max-w-[90vw] mx-auto relative z-10">
        {/* Title with "Our team have worked with:" subtitle */}
        <div className="mb-[3vw] flex flex-col">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isIntersecting ? "visible" : "hidden"}
            className="relative flex justify-between items-end"
          >
            <motion.div variants={titleVariants}>
              <h2 className="text-[8vw] font-bebas text-[#FBD1B8] tracking-tighter leading-none mb-[0.5vw]">
                Selected Clients
              </h2>
              <p className="text-[1.2vw] text-white/50 font-normal mb-[0.5vw]">
                Our team have worked with:
              </p>
            </motion.div>
            
            {/* Rounded buttons right side */}
            <div className="flex gap-[1vw] items-center">
              <motion.div 
                custom={0}
                variants={buttonVariants}
                className="h-[3vw] w-[3vw] bg-[#F2A93C] rounded-full origin-left"
              ></motion.div>
              <motion.div 
                custom={1}
                variants={buttonVariants}
                className="h-[3vw] w-[14vw] bg-[#F96C53] rounded-full origin-left"
              ></motion.div>
              <motion.div 
                custom={2}
                variants={buttonVariants}
                className="h-[3vw] w-[10vw] bg-[#4A7C39] rounded-full origin-left"
              ></motion.div>
              <motion.div 
                custom={3}
                variants={buttonVariants}
                className="h-[3vw] w-[3vw] bg-[#2982C4] rounded-full origin-left"
              ></motion.div>
            </div>
          </motion.div>
          
          <div className="h-[1px] w-full bg-white/20 mt-[1vw]"></div>
        </div>
        
        {/* Client logos grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-x-[4vw] gap-y-[6vw] w-full pt-[3vw] pb-[6vw]"
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
        >
          {clientLogos.map((client, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={logoVariants}
              className="flex items-center justify-center"
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <div 
                className="w-[17vw] h-[5vw] relative" 
                dangerouslySetInnerHTML={{ __html: client.logo }}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Bottom line */}
        <div className="h-[1px] w-full bg-white/20"></div>
      </div>
    </div>
  );
}