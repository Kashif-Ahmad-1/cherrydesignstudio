import { useEffect } from "react";

// Simplified smooth scroll hook without GSAP
export function useSmoothScroll() {
  useEffect(() => {
    // Simple smooth scroll function for anchors
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Only handle clicks on anchor links
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        const id = target.getAttribute('href')?.substring(1);
        
        if (id) {
          const element = document.getElementById(id);
          
          if (element) {
            e.preventDefault();
            
            // Smooth scroll to the element
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      }
    };

    // Add event listener to the document
    document.addEventListener('click', handleSmoothScroll);
    
    return () => {
      // Clean up
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);

  return { scrollElement: document.body };
}
