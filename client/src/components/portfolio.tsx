import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Projects data exactly matching the reference image
const portfolioProjects = [
  {
    id: "01",
    title: "The New Review",
    client: "The Guardian",
    description:
      "Creating a digital magazine experience that brings The Guardian's in-depth journalism to life with interactive features and dynamic layouts.",
    image:
      "https://images.unsplash.com/photo-1527065740988-66de71cf9ce1?auto=format&fit=crop&w=800&q=80",
    bgColor: "bg-gray-100",
    textColor: "text-pink-600",
  },
  {
    id: "02",
    title: "#SheMatters",
    client: "#SheMatters",
    description:
      "Leading social campaign raising awareness about gender equality through powerful imagery and compelling storytelling across digital platforms.",
    image:
      "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=800&q=80",
    bgColor: "bg-red-600",
    textColor: "text-white",
  },
  {
    id: "03",
    title: "Trading App",
    client: "Delphia",
    description:
      "Building an intuitive mobile investing platform that makes personal finance accessible through thoughtful design and clear data visualization.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
    bgColor: "bg-purple-900",
    textColor: "text-white",
  },
  {
    id: "04",
    title: "Visual Identity",
    client: "Logotypes",
    description:
      "Crafting distinctive brand identities for forward-thinking businesses, with a focus on minimalist, geometric designs that stand the test of time.",
    image:
      "https://images.unsplash.com/photo-1594128705280-77195ba2adde?auto=format&fit=crop&w=800&q=80",
    bgColor: "bg-gray-100",
    textColor: "text-gray-800",
  },
  {
    id: "05",
    title: "Environmentalist",
    client: "tentree",
    description:
      "Developing a sustainable fashion identity that balances eco-conscious values with contemporary design to engage environmentally-aware consumers.",
    image:
      "https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=800&q=80",
    bgColor: "bg-green-800",
    textColor: "text-white",
  },
  {
    id: "06",
    title: "Editorial Design",
    client: "Peace & Justice",
    description:
      "Constructing a digital presence and editorial system that amplifies advocacy messaging with clarity and emotional impact across multiple platforms.",
    image:
      "https://images.unsplash.com/photo-1612387290123-34af734b5f7b?auto=format&fit=crop&w=800&q=80",
    bgColor: "bg-gray-100",
    textColor: "text-gray-800",
  },
  {
    id: "07",
    title: "Character Design",
    client: "Google",
    description:
      "Creating a playful set of character illustrations for Google's educational initiatives, designed to engage diverse audiences with inclusivity in mind.",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80",
    bgColor: "bg-white",
    textColor: "text-gray-800",
  },
];

export default function Portfolio() {
  // References for GSAP animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const buttonsTopRef = useRef<HTMLDivElement>(null);
  const buttonsBottomRef = useRef<HTMLDivElement>(null);

  // Set up GSAP animations with ScrollTrigger
  useEffect(() => {
    // Main title animation
    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );

    // Top buttons animation
    gsap.fromTo(
      buttonsTopRef.current?.children || [],
      {
        scaleX: 0,
      },
      {
        scaleX: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        transformOrigin: "left center",
        scrollTrigger: {
          trigger: buttonsTopRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );

    // Project cards animation
    const projectItems = projectsRef.current?.children || [];
    gsap.fromTo(
      projectItems,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      },
    );

    // Bottom buttons animation
    gsap.fromTo(
      buttonsBottomRef.current?.children || [],
      {
        scaleX: 0,
      },
      {
        scaleX: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        transformOrigin: "left center",
        scrollTrigger: {
          trigger: buttonsBottomRef.current,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      },
    );

    // Clean up ScrollTrigger instances
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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
      <div ref={buttonsTopRef} className="flex w-full space-x-[1vw] mb-[3vw]">
        <div className="h-[3vw] w-[18vw] bg-[#4A7C39] rounded-[1.5vw] origin-left"></div>
        <div className="h-[3vw] w-[8vw] bg-[#2982C4] rounded-[1.5vw] origin-left"></div>
        <div className="h-[3vw] w-[13vw] bg-[#7CDBE6] rounded-[1.5vw] origin-left"></div>
        <div className="h-[3vw] w-[18vw] bg-[#F2A93C] rounded-[1.5vw] origin-left"></div>
        <div className="h-[3vw] w-[13vw] bg-[#7CDBE6] rounded-[1.5vw] origin-left"></div>
        <div className="h-[3vw] w-[8vw] bg-[#2982C4] rounded-[1.5vw] origin-left"></div>
        <div className="h-[3vw] w-[18vw] bg-[#4A7C39] rounded-[1.5vw] origin-left"></div>
      </div>

      <div className="max-w-[96vw] mx-auto relative z-10">
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-[8vw] font-bebas text-[#FBD1B8] tracking-tighter mb-[3vw]"
        >
          Selected Projects
        </h2>

        {/* Projects grid */}
        <div
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-[2vw] mb-[3vw]"
        >
          {/* Project 01 - The Guardian */}
          <div className="col-span-6 bg-gray-100 rounded-[1vw] overflow-hidden relative aspect-[1.2/1]">
            <div className="absolute inset-0 p-[2vw] flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-[1.2vw] text-black/60 font-bold">
                  {portfolioProjects[0].id}
                </span>
                <img
                  src="https://images.unsplash.com/photo-1527065740988-66de71cf9ce1?auto=format&fit=crop&w=800&q=80"
                  alt="The New Review"
                  className="w-[80%] h-auto object-cover rounded-[1vw]"
                />
              </div>
              <div>
                <h3 className="text-[3vw] font-bebas tracking-tight text-pink-600">
                  The New Review
                </h3>
                <h4 className="text-[2vw] text-black font-bebas mb-[0.5vw]">
                  The Guardian
                </h4>
              </div>
            </div>
          </div>

          {/* Project 02 - #SheMatters */}
          <div className="col-span-6 bg-red-600 rounded-[1vw] overflow-hidden relative aspect-[1.2/1]">
            <div className="absolute inset-0 p-[2vw] flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-[1.2vw] text-white/60 font-bold">
                  {portfolioProjects[1].id}
                </span>
                <img
                  src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=800&q=80"
                  alt="#SheMatters"
                  className="w-[80%] h-auto object-cover rounded-[1vw]"
                />
              </div>
              <div>
                <h3 className="text-[3vw] font-bebas tracking-tight text-white">
                  KNOWING THE PAST, SHAPING THE FUTURE.
                </h3>
                <h4 className="text-[2vw] text-white font-bebas mb-[0.5vw]">
                  #SheMatters
                </h4>
              </div>
            </div>
          </div>

          {/* Project 03 - Delphia */}
          <div className="col-span-6 bg-purple-900 rounded-[1vw] overflow-hidden relative aspect-[1/1]">
            <div className="absolute inset-0 p-[2vw] flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-[1.2vw] text-white/60 font-bold">
                  {portfolioProjects[2].id}
                </span>
              </div>
              <div className="flex justify-center items-center gap-[1vw] mt-[2vw]">
                <div className="w-[25%] h-[30vw] bg-emerald-900 rounded-[1vw] flex items-center justify-center overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80"
                    alt="Trading App 1"
                    className="w-[90%] h-auto object-contain"
                  />
                </div>
                <div className="w-[25%] h-[30vw] bg-emerald-800 rounded-[1vw] flex items-center justify-center overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80"
                    alt="Trading App 2"
                    className="w-[90%] h-auto object-contain"
                  />
                </div>
                <div className="w-[25%] h-[30vw] bg-orange-500 rounded-[1vw] flex items-center justify-center overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80"
                    alt="Trading App 3"
                    className="w-[90%] h-auto object-contain"
                  />
                </div>
              </div>
              <div>
                <h4 className="text-[2vw] text-white font-bebas mb-[0.5vw]">
                  Delphia
                </h4>
              </div>
            </div>
          </div>

          {/* Project 04 - Logotypes */}
          <div className="col-span-6 bg-gray-100 rounded-[1vw] overflow-hidden relative aspect-[1/1]">
            <div className="absolute inset-0 p-[2vw] flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-[1.2vw] text-black/60 font-bold">
                  {portfolioProjects[3].id}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <img
                  src="https://images.unsplash.com/photo-1594128705280-77195ba2adde?auto=format&fit=crop&w=800&q=80"
                  alt="Logotypes"
                  className="w-[60%] h-auto object-contain"
                />
              </div>
              <div>
                <h4 className="text-[2vw] text-black font-bebas mb-[0.5vw]">
                  Logotypes
                </h4>
              </div>
            </div>
          </div>

          {/* Project 05 - tentree */}
          <div className="col-span-6 bg-green-800 rounded-[1vw] overflow-hidden relative aspect-[1/1]">
            <div className="absolute inset-0 p-[2vw] flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-[1.2vw] text-white/60 font-bold">
                  {portfolioProjects[4].id}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <img
                  src="https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=800&q=80"
                  alt="Environmentalist"
                  className="w-[70%] h-auto object-cover"
                />
              </div>
              <div>
                <h4 className="text-[2vw] text-white font-bebas mb-[0.5vw]">
                  tentree
                </h4>
              </div>
            </div>
          </div>

          {/* Project 06 - Peace & Justice */}
          <div className="col-span-6 bg-gray-100 rounded-[1vw] overflow-hidden relative aspect-[1/1]">
            <div className="absolute inset-0 p-[2vw] flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-[1.2vw] text-black/60 font-bold">
                  {portfolioProjects[5].id}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <img
                  src="https://images.unsplash.com/photo-1612387290123-34af734b5f7b?auto=format&fit=crop&w=800&q=80"
                  alt="Editorial Design"
                  className="w-[70%] h-auto object-cover"
                />
              </div>
              <div>
                <h4 className="text-[2vw] text-black font-bebas mb-[0.5vw]">
                  Peace & Justice
                </h4>
              </div>
            </div>
          </div>

          {/* Project 07 - Google */}
          <div className="col-span-12 bg-white rounded-[1vw] overflow-hidden relative aspect-[3/1]">
            <div className="absolute inset-0 p-[2vw] flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-[1.2vw] text-black/60 font-bold">
                  {portfolioProjects[6].id}
                </span>
              </div>
              <div className="flex justify-center items-center space-x-[3vw]">
                <img
                  src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=200&q=80"
                  alt="Character 1"
                  className="h-[10vw] w-auto object-contain"
                />
                <img
                  src="https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=200&q=80"
                  alt="Character 2"
                  className="h-[10vw] w-auto object-contain"
                />
                <img
                  src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=200&q=80"
                  alt="Character 3"
                  className="h-[10vw] w-auto object-contain"
                />
                <img
                  src="https://images.unsplash.com/photo-1579600161224-cac5a2971069?auto=format&fit=crop&w=200&q=80"
                  alt="Character 4"
                  className="h-[10vw] w-auto object-contain"
                />
                <img
                  src="https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?auto=format&fit=crop&w=200&q=80"
                  alt="Character 5"
                  className="h-[10vw] w-auto object-contain"
                />
              </div>
              <div>
                <h4 className="text-[2vw] text-black font-bebas mb-[0.5vw]">
                  Google
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom rounded buttons row */}
        <div
          ref={buttonsBottomRef}
          className="flex w-full space-x-[1vw] mt-[4vw]"
        >
          <div className="h-[3vw] w-[18vw] bg-[#4A7C39] rounded-[1.5vw] origin-left"></div>
          <div className="h-[3vw] w-[8vw] bg-[#2982C4] rounded-[1.5vw] origin-left"></div>
          <div className="h-[3vw] w-[13vw] bg-[#7CDBE6] rounded-[1.5vw] origin-left"></div>
          <div className="h-[3vw] w-[18vw] bg-[#F2A93C] rounded-[1.5vw] origin-left"></div>
          <div className="h-[3vw] w-[13vw] bg-[#7CDBE6] rounded-[1.5vw] origin-left"></div>
          <div className="h-[3vw] w-[8vw] bg-[#2982C4] rounded-[1.5vw] origin-left"></div>
          <div className="h-[3vw] w-[18vw] bg-[#4A7C39] rounded-[1.5vw] origin-left"></div>
        </div>
      </div>
    </div>
  );
}
