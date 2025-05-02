import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { smoothScrollTo } from "@/lib/utils";
import CherryMaximalLogo from "./ui/cherry-maximal-logo";
import ContactModal from "./contact-modal";
import gsap from "gsap";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ScrollTo function for nav links
  const handleNavLinkClick = (id: string) => {
    smoothScrollTo(id);
  };

  // Contact modal handlers
  const openContactModal = () => {
    setIsModalOpen(true);
    
    // Animate button with GSAP
    gsap.fromTo(
      ".contact-button",
      { scale: 1 },
      { 
        scale: 1.2, 
        duration: 0.3,
        ease: "back.out(1.7)",
        onComplete: () => {
          gsap.to(".contact-button", { 
            scale: 1,
            duration: 0.2
          });
        }
      }
    );
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 w-full z-40 px-6 py-2 transition-all duration-300 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-sm"
            : "bg-black/30 backdrop-blur-sm"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-[1728px] mx-auto flex items-center justify-between">
          {/* Logo on left */}
          <div className="flex items-center">
            <div
              onClick={() => (window.location.href = "/")}
              className="flex items-center cursor-pointer"
            >
              <CherryMaximalLogo 
                size="md"
                withText={false}
                colorScheme="default"
                style3d={false}
                interactive={true}
              />
            </div>
          </div>

          {/* Get in Touch on right */}
          <div className="flex items-center">
            <motion.button
              onClick={openContactModal}
              className="contact-button text-[#FBD1B8] text-2xl font-bebas tracking-tighter leading-none hover:text-[#F2A93C] transition-colors px-4 py-2 rounded-full border border-[#FBD1B8]/20 hover:border-[#F2A93C]/40"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(251, 209, 184, 0.05)" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Contact Form Modal */}
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
