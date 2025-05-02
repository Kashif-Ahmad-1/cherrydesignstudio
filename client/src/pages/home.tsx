import { useEffect } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Intro from "@/components/intro";
import WhatWeDo from "@/components/whatwedo";
import Clients from "@/components/clients";
import Portfolio from "@/components/portfolio";
import Awards from "@/components/awards";
import GetInTouch from "@/components/getintouch";
import Footer from "@/components/footer";
import ImageSlider from "@/components/ui/image-slider";
// import ServiceFunnel from "@/components/ui/service-funnel";
import { contentData } from "@/data/content";
import { useScrollColor } from "@/hooks/use-scroll-color";

export default function Home() {
  // Initialize scrollbar color hook
  useScrollColor();

  useEffect(() => {
    // Set up animations and scroll behavior for the page
    const observeElements = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
            }
          });
        },
        { threshold: 0.1 },
      );

      const sections = document.querySelectorAll(".section-transition");
      sections.forEach((section) => {
        observer.observe(section);
      });
    };

    observeElements();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <main className="overflow-x-hidden bg-cherry-bg">
      <Header />
      <Hero />

      <ImageSlider images={contentData.sliderImages} />
      {/* <ServiceFunnel /> */}
      <Intro />
      <WhatWeDo />
      <Clients />
      <Portfolio />
      <Awards />
      <GetInTouch />
      <Footer />
    </main>
  );
}
