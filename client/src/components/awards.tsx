import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Awards data exactly matching the reference image
const awardsData = [
  {
    awardName: "Social Good Design Award",
    project: "tentree rebrand",
    organization: "RGD",
    year: "2021"
  },
  {
    awardName: "Behance Project of The Day",
    project: "Adobe Illustrator",
    organization: "Behance",
    year: "2020"
  },
  {
    awardName: "Under Consideration 2020",
    project: "tentree rebrand",
    organization: "Under Consideration LLC",
    year: "2020"
  },
  {
    awardName: "Applied Arts Award - Brand Identity",
    project: "tentree rebrand",
    organization: "Applied Arts Mag",
    year: "2020"
  },
  {
    awardName: "Marketing Bronze Award",
    project: "tentree rebrand",
    organization: "CMA",
    year: "2020"
  },
  {
    awardName: "Behance Project of The Day",
    project: "Graphic Design",
    organization: "Behance",
    year: "2019"
  },
  {
    awardName: "15 million likes Instagram Post",
    project: "tentree - Earth Day",
    organization: "Instagram",
    year: "2019"
  },
  {
    awardName: "Brave Brande of The Year",
    project: "The Guardian",
    organization: "The Marketing Society",
    year: "2019"
  }
];

export default function Awards() {
  // References for GSAP animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  
  // Set up GSAP animations with ScrollTrigger
  useEffect(() => {
    // Title animation
    gsap.fromTo(
      titleRef.current,
      { 
        opacity: 0, 
        y: 50 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Table rows animation
    const tableRows = tableRef.current?.querySelectorAll('.award-row') || [];
    gsap.fromTo(
      tableRows,
      { 
        opacity: 0,
        y: 20
      },
      { 
        opacity: 1, 
        y: 0,
        stagger: 0.08, 
        duration: 0.6, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: tableRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Clean up ScrollTrigger instances
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div 
      ref={sectionRef}
      className="relative bg-black text-white py-[8vw] px-[3vw] w-full border-b border-white/10"
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
      
      <div className="max-w-[96vw] mx-auto relative z-10">
        {/* Title */}
        <h2 
          ref={titleRef} 
          className="text-[10vw] font-bebas text-[#FBD1B8] tracking-tighter mb-[4vw]"
        >
          Awards
        </h2>
        
        {/* Awards table */}
        <div ref={tableRef} className="w-full">
          {/* Table headers */}
          <div className="grid grid-cols-12 gap-6 py-[1.5vw] text-[1.1vw] text-white/60 font-medium">
            <div className="col-span-3">Award</div>
            <div className="col-span-3">Project</div>
            <div className="col-span-3">Organization</div>
            <div className="col-span-3 text-right">Year</div>
          </div>
          
          {/* Table rows */}
          {awardsData.map((award, index) => (
            <motion.div 
              key={index}
              className="award-row grid grid-cols-12 gap-6 py-[1.5vw] border-t border-white/10 text-[1.3vw]"
              whileHover={{ 
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                transition: { duration: 0.2 }
              }}
            >
              <div className="col-span-3 text-white">{award.awardName}</div>
              <div className="col-span-3 text-white/70">{award.project}</div>
              <div className="col-span-3 text-white/70">{award.organization}</div>
              <div className="col-span-3 text-white/70 text-right">{award.year}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}