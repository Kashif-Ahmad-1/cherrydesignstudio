import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ContextualTooltip from "./ui/contextual-tooltip";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Social media links exactly as in the reference
const socialLinks = [
  { name: "LinkedIn", url: "https://linkedin.com" },
  { name: "Behance", url: "https://behance.net" },
  { name: "Instagram", url: "https://instagram.com" },
  { name: "Facebook", url: "https://facebook.com" },
];

export default function GetInTouch() {
  // References for GSAP animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);
  const buttonsTopRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);

  // Set up GSAP animations with ScrollTrigger
  useEffect(() => {
    // Create a timeline for sequenced animations
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom bottom",
        toggleActions: "play none none none",
      },
    });

    // Animate top buttons
    const buttonsTl = gsap.timeline();
    buttonsTl.fromTo(
      buttonsTopRef.current?.children || [],
      {
        scaleX: 0,
      },
      {
        scaleX: 1,
        duration: 0.6,
        stagger: 0.07,
        ease: "power2.out",
        transformOrigin: "left center",
      },
    );
    masterTl.add(buttonsTl, 0);

    // Split text animation for title - letter by letter super smooth
    const titleText = titleRef.current?.querySelectorAll(".title-letter") || [];
    const titleTl = gsap.timeline();
    titleTl.fromTo(
      titleText,
      {
        y: 150,
        opacity: 0,
        rotateX: -15,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.03,
        duration: 0.7,
        ease: "power3.out",
      },
    );
    masterTl.add(titleTl, 0.2);

    // Contact info animation - general and new business
    const contactItems =
      contactInfoRef.current?.querySelectorAll(".contact-item") || [];
    const contactTl = gsap.timeline();
    contactTl.fromTo(
      contactItems,
      {
        x: -40,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
      },
    );
    masterTl.add(contactTl, 0.1);

    // Address animation
    const addressTl = gsap.timeline();
    addressTl.fromTo(
      addressRef.current,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
      },
    );
    masterTl.add(addressTl, 0.6);

    // Social links animation - one by one reveal
    const socialTl = gsap.timeline();
    socialTl.fromTo(
      socialLinksRef.current?.querySelectorAll(".social-link") || [],
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
      },
    );
    masterTl.add(socialTl, 0.4);

    // Clean up ScrollTrigger instances
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Split title text for letter-by-letter animation
  const getTitleLetters = (text: string) => {
    return text.split("").map((letter, index) => (
      <span key={index} className="title-letter inline-block">
        {letter}
      </span>
    ));
  };

  return (
    <div
      ref={sectionRef}
      id="contact"
      className="relative bg-black text-white py-[4.5vw] px-[3vw] w-full border-b border-white/10"
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

      {/* Top rounded buttons row - Exactly as in the reference */}
      <div ref={buttonsTopRef} className="flex w-full space-x-[1vw] mb-[3vw]">
        <div className="h-[3vw] w-[18vw] bg-[#4A7C39] rounded-[1.5vw] origin-left"></div>
        <div className="h-[3vw] w-[8vw] bg-[#2982C4] rounded-[1.5vw] origin-left"></div>
        <div className="h-[3vw] w-[13vw] bg-[#7CDBE6] rounded-[1.5vw] origin-left"></div>
        <div className="h-[3vw] w-[18vw] bg-[#F2A93C] rounded-[1.5vw] origin-left"></div>
        <div className="h-[3vw] w-[13vw] bg-[#7CDBE6] rounded-[1.5vw] origin-left"></div>
        <div className="h-[3vw] w-[8vw] bg-[#2982C4] rounded-[1.5vw] origin-left"></div>
        <div className="h-[3vw] w-[18vw] bg-[#4A7C39] rounded-[1.5vw] origin-left"></div>
      </div>

      <div className="w-full mx-auto relative z-10">
        <div className="grid grid-cols-12 gap-x-[2vw]">
          {/* Left column - contact info - Exactly as in the reference */}
          <div className="col-span-4" ref={contactInfoRef}>
            <div className="flex flex-col space-y-[2vw]">
              <div className="contact-item">
                <h3 className="text-[1.2vw] font-medium mb-[0.5vw]">GENERAL</h3>
                <motion.a
                  href="mailto:info@dreamers-united.org"
                  className="text-[1.15vw] text-white/60 hover:text-[#FBD1B8] transition-colors"
                  whileHover={{ color: "#FBD1B8" }}
                >
                  info@dreamers-united.org
                </motion.a>
              </div>

              <div className="contact-item mb-[13vw]">
                <h3 className="text-[1.2vw] font-medium mb-[0.5vw]">
                  NEW BUSINESS
                </h3>
                <motion.a
                  href="mailto:studio@dreamers-united.org"
                  className="text-[1.15vw] text-white/60 hover:text-[#FBD1B8] transition-colors"
                  whileHover={{ color: "#FBD1B8" }}
                >
                  studio@dreamers-united.org
                </motion.a>
              </div>

              <div ref={addressRef} className="mt-[15vw]">
                <p className="text-[1.15vw] text-white/60">
                  Calea Moșilor 56,
                  <br />
                  030152, Bucharest,
                  <br />
                  Romania
                </p>
              </div>
            </div>
          </div>

          {/* GET IN TOUCH title positioned on left side as in reference */}
          <div className="col-span-8 col-start-7">
            <ContextualTooltip 
              type="contactUs" 
              position="left"
            >
              <div
                ref={titleRef}
                className="text-[#FBD1B8] font-bebas text-[23vw] leading-[0.82] tracking-tight text-left"
              >
                <div>{getTitleLetters("GET IN")}</div>
                <div>{getTitleLetters("TOUCH")}</div>
              </div>
            </ContextualTooltip>
          </div>

          {/* Right column - social links - Exactly as in the reference */}
          <div
            className="col-span-3 flex flex-col justify-end col-start-10 mt-[5vw]"
            ref={socialLinksRef}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                className="social-link block text-[1.25vw] border-t border-white/10 py-[1.35vw] text-white/80 hover:text-[#FBD1B8] transition-colors"
                whileHover={{
                  color: "#FBD1B8",
                  x: 10,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
              >
                {social.name}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
