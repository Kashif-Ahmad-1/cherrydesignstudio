import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef } from "react";

// Service data matching the reference image exactly
const services = [
  {
    title: "Branding",
    description: "Brand Strategy / Brand Guidelines / Visual Identification",
  },
  {
    title: "Web Design",
    description: "Websites / E-commerce / Responsive Design / UI / UX",
  },
  {
    title: "Web Development",
    description: "WebFlow / HTML5 / CSS / Javascript / React",
  },
  {
    title: "Print Design",
    description: "Posters / Books / Catalogues / Editorial Design",
  },
  {
    title: "Digital Design",
    description: "Digital Media / Interactive Tech / Applications / DOOH",
  },
  {
    title: "Motion Design",
    description: "Animation / Video Editing / Post-Production",
  },
  {
    title: "Illustration",
    description: "Brand / Editorial / Book / Animation ready",
  },
];

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useIntersectionObserver(sectionRef, {
    threshold: 0.2,
    freezeOnceVisible: true,
  });

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.15 * custom,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const buttonRowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4,
      },
    },
  };

  const buttonVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div
      ref={sectionRef}
      className="relative bg-black text-white py-[5vw] px-[3vw] w-full border-b border-white/10"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.97), rgba(0, 0, 0, 0.97)), url('/grid-bg.svg')",
        backgroundSize: "100% 100%",
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

      {/* Top rounded buttons row */}
      <motion.div
        className="flex w-full space-x-[1vw] mb-[5vw]"
        variants={buttonRowVariants}
        initial="hidden"
        animate={isIntersecting ? "visible" : "hidden"}
      >
        <motion.div
          variants={buttonVariants}
          className="h-[3vw] w-[10vw] bg-[#7CDBE6] rounded-full origin-left"
        ></motion.div>
        <motion.div
          variants={buttonVariants}
          className="h-[3vw] w-[18vw] bg-[#F2A93C] rounded-full origin-left"
        ></motion.div>
        <motion.div
          variants={buttonVariants}
          className="h-[3vw] w-[3vw] bg-[#F96C53] rounded-full origin-left"
        ></motion.div>
        <motion.div
          variants={buttonVariants}
          className="h-[3vw] w-[24vw] bg-[#F96C53] rounded-full origin-left"
        ></motion.div>
        <motion.div
          variants={buttonVariants}
          className="h-[3vw] w-[10vw] bg-[#4A7C39] rounded-full origin-left"
        ></motion.div>
        <motion.div
          variants={buttonVariants}
          className="h-[3vw] w-[3vw] bg-[#F2A93C] rounded-full origin-left"
        ></motion.div>
        <motion.div
          variants={buttonVariants}
          className="h-[3vw] w-[14vw] bg-[#7CDBE6] rounded-full origin-left"
        ></motion.div>
        <motion.div
          variants={buttonVariants}
          className="h-[3vw] w-[10vw] bg-[#2982C4] rounded-full origin-left"
        ></motion.div>
      </motion.div>

      <div className="max-w-[90vw] mx-auto relative z-10">
        {/* Title */}
        <motion.h2
          className="text-[8vw] font-bebas text-[#FBD1B8] tracking-tighter mb-[2vw]"
          variants={titleVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
        >
          What We do
        </motion.h2>

        {/* Services list exactly matching reference */}
        <div className="w-full">
          {services.map((service, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              animate={isIntersecting ? "visible" : "hidden"}
              className="border-b border-white/20 py-[1.5vw] w-full"
            >
              <div className="flex justify-between items-center w-full">
                <motion.h3
                  className="text-[4vw] font-bebas text-[#FBD1B8] tracking-tighter"
                  whileHover={{ x: 20, color: "#FFF" }}
                  transition={{ duration: 0.3 }}
                >
                  {service.title}
                </motion.h3>
                <motion.p
                  className="text-[1.2vw] text-white/70"
                  whileHover={{ color: "#FFF" }}
                >
                  {service.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
