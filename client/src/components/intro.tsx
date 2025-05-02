import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !textContentRef.current)
      return;

    const updateAnimation = () => {
      const textWidth = textContentRef.current!.scrollWidth;
      const windowWidth = window.innerWidth;
      const moveX = textWidth - windowWidth + 100;
      const scrollDistance = textWidth * 1.1;

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      gsap.fromTo(
        textContentRef.current,
        { x: 0 },
        {
          x: -moveX,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${scrollDistance}px`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            pinSpacing: true,
            markers: false,
          },
        },
      );
    };

    updateAnimation();
    window.addEventListener("resize", updateAnimation);

    return () => {
      window.removeEventListener("resize", updateAnimation);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="intro"
      className="bg-black py-20 relative border-b border-white/10 min-h-[50vh]"
    >
      <div className="max-w-[95vw] mx-auto px-4">
        <div ref={textRef} className="overflow-hidden py-10">
          <div className="relative">
            <h2
              ref={textContentRef}
              className="text-[12vw] font-bebas tracking-tighter whitespace-nowrap"
              style={{ willChange: "transform" }}
            >
              <span className="text-[#F96C53]">FEARLESS</span>
              <span className="text-white mx-[2vw]">→</span>
              <span className="text-[#2982C4]">BRAND</span>
              <span className="text-white mx-[2vw]">→</span>
              <span className="text-[#F96C53]">EVOLUTION</span>
              <span className="text-white mx-[4vw]">•</span>
              <span className="text-[#F96C53]">FEARLESS</span>
              <span className="text-white mx-[2vw]">→</span>
              <span className="text-[#2982C4]">BRAND</span>
              <span className="text-white mx-[2vw]">→</span>
              <span className="text-[#F96C53]">EVOLUTION</span>
              <span className="text-white mx-[4vw]">•</span>
              <span className="text-[#F96C53]">FEARLESS</span>
              <span className="text-white mx-[2vw]">→</span>
              <span className="text-[#2982C4]">BRAND</span>
              <span className="text-white mx-[2vw]">→</span>
              <span className="text-[#F96C53]">EVOLUTION</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Decorative Dots */}
      <div className="flex justify-center gap-3 mt-16">
        {[0, 1, 2, 3, 4].map((_, index) => (
          <motion.div
            key={index}
            className={`w-56 h-6 rounded-full ${
              index === 0 || index === 4
                ? "bg-[#F96C53]"
                : index === 1 || index === 3
                  ? "bg-[#2982C4]"
                  : "bg-[#F2A93C]"
            }`}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
          />
        ))}
      </div>
    </section>
  );
}
