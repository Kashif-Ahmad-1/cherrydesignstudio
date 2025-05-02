import { motion } from "framer-motion";
import { contentData } from "@/data/content";
import { useEffect, useRef, useState } from "react";

// Import SVG components
import CircleTarget from "./ui/hero-svg/circle-target";
import Starburst from "./ui/hero-svg/starburst";
import ArrowRight from "./ui/hero-svg/arrow-right";
import YellowArrow from "./ui/hero-svg/yellow-arrow";
import Clover from "./ui/hero-svg/clover";
import Smiley from "./ui/hero-svg/smiley";

export default function Hero() {
  const { hero } = contentData;
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Trigger initial animations when component is mounted
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative h-full pb-[3vw] pt-[3vw] md:pt-0 w-full overflow-hidden bg-black"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.95)), url('/grid-bg.svg')",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="  max-w-[95vw] w-full mx-auto pt-[15vh] relative z-10">
        {/* Grid lines overlay - exact match to reference image */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 13 }).map((_, i) => (
              <div
                key={`v-${i}`}
                className="border-l border-white h-full"
              ></div>
            ))}
          </div>
          <div className="grid grid-rows-12 w-full absolute top-0 left-0">
            {Array.from({ length: 13 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="border-t border-white w-full"
              ></div>
            ))}
          </div>
        </div>

        {/* Main headline - EXACT PIXEL PERFECT match to the reference image */}
        <div className="relative">
          {/* First line: Empowering Brands + Arrow */}
          <h1 className="font-bebas text-[#FBD1B8] tracking-[-0.02em] text-left relative">
            <div className="flex items-center">
              <div className="flex items-center">
                <span className="text-[14vw] md:text-[12vw] lg:text-[12vw] inline-block">
                  Empowering
                </span>
                <span
                  className="relative"
                  style={{ width: "7vw", height: "7vw", margin: "0 1vw" }}
                >
                  <Smiley />
                </span>
                <span className="text-[10vw] md:text-[12vw] lg:text-[12vw] inline-block">
                  Brands
                </span>
                <span
                  className="relative"
                  style={{ width: "7vw", height: "7vw", marginLeft: "1vw" }}
                >
                  <ArrowRight />
                </span>
              </div>
            </div>

            {/* Second line: Through + Clover + Innovative */}
            <div className="flex items-center mt-[-1vw]">
              <span
                className="relative"
                style={{ width: "7vw", height: "7vw" }}
              >
                <CircleTarget />
              </span>
              <span className="text-[14vw] md:text-[12vw] lg:text-[12vw] ml-[1vw]">
                Through
              </span>
              <span
                className="relative mx-[1vw]"
                style={{ width: "5vw", height: "5vw" }}
              >
                <Clover />
              </span>
              <span className="text-[10vw] md:text-[12vw] lg:text-[12vw]">
                Innovative
              </span>
            </div>

            {/* Third line: Design + Starburst */}
            <div className="flex items-center mt-[-1vw]">
              <span
                className="relative ml-[10vw] md:ml-[1vw]"
                style={{ width: "5vw", height: "5vw" }}
              >
                <YellowArrow />
              </span>
              <span className="text-[14vw] md:text-[12vw] lg:text-[12vw] ml-[10vw] md:ml-[1vw]">
                Design
              </span>
              <span
                className="relative ml-[10vw] md:ml-[1vw]"
                style={{ width: "5vw", height: "5vw" }}
              >
                <Starburst />
              </span>
            </div>
          </h1>
        </div>

        {/* Horizontal line under the main heading - exactly as in reference */}
        <div className="w-full h-[1px] bg-white/30 my-[4vw]"></div>

        {/* Stats section in exact grid format as shown in reference image */}
        <div className="grid grid-cols-3 gap-[2vw] mt-[4vw]">
          <div className="text-center">
            <div className="text-[6vw] font-bebas text-[#FBD1B8] leading-none">
              20+
            </div>
            <div className="text-[2vw] text-white/70 uppercase tracking-wider mt-[0.5vw]">
              YEARS OF EXPERIENCE
            </div>
          </div>

          <div className="text-center">
            <div className="text-[6vw] font-bebas text-[#FBD1B8] leading-none">
              320+
            </div>
            <div className="text-[2vw] text-white/70 uppercase tracking-wider mt-[0.5vw]">
              COMPLETED PROJECTS
            </div>
          </div>

          <div className="text-center">
            <div className="text-[6vw] font-bebas text-[#FBD1B8] leading-none">
              10+
            </div>
            <div className="text-[2vw] text-white/70 uppercase tracking-wider mt-[0.5vw]">
              INDUSTRY AWARDS
            </div>
          </div>
        </div>

        {/* Rounded button row in exact format as shown in reference */}
        <div className="flex mt-[4vw] space-x-[1vw]">
          <div className="h-[3vw] w-[10vw] bg-[#4A7C39] rounded-full"></div>
          <div className="h-[3vw] w-[18vw] bg-[#2982C4] rounded-full"></div>
          <div className="h-[3vw] w-[3vw] bg-[#7CDBE6] rounded-full"></div>
          <div className="h-[3vw] w-[24vw] bg-[#F2A93C] rounded-full"></div>
          <div className="h-[3vw] w-[3vw] bg-[#7CDBE6] rounded-full"></div>
          <div className="h-[3vw] w-[12vw] bg-[#2982C4] rounded-full"></div>
          <div className="h-[3vw] w-[17vw] bg-[#4A7C39] rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
