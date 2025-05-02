import { useState, useEffect } from "react";

/**
 * Hook to change scrollbar color based on the current scroll position
 * and which section is in view
 */
export function useScrollColor() {
  const [scrollbarColor, setScrollbarColor] = useState("#0EFF85"); // Default: Cherry Primary

  useEffect(() => {
    const sections = [
      { id: "hero", color: "#0EFF85" }, // Primary
      { id: "services", color: "#2C6BFF" }, // Secondary
      { id: "about", color: "#FF41A6" }, // Pink
      { id: "projects", color: "#FFDE59" }, // Yellow
      { id: "contact", color: "#9D4EDD" } // Purple
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;
          
          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setScrollbarColor(section.color);
            
            // Update scrollbar color in CSS
            document.documentElement.style.setProperty(
              "--scrollbar-thumb-color", 
              section.color
            );
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollbarColor;
}
