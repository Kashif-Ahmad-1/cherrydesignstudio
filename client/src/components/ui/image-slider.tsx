import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageSliderProps {
  images: Array<{
    url: string;
    projectName: string;
  }>;
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [images.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div className="w-full max-w-[95vw] my-10 mx-auto rounded-3xl h-screen relative overflow-hidden bg-black">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[currentIndex].url})` }}
          />

          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

          {/* Project name with glowing effect */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.h2
              className="text-6xl md:text-8xl lg:text-9xl font-bebas text-white tracking-wider text-center px-6 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="inline-block relative">
                {images[currentIndex].projectName}
                <span className="absolute inset-0 blur-2xl opacity-60 bg-white mix-blend-overlay rounded-full"></span>
                <span className="absolute -inset-4 blur-3xl opacity-30 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 mix-blend-overlay rounded-full"></span>
              </span>
              <div className="text-xl md:text-2xl font-normal mt-4 text-white/70">
                Interactive Project
              </div>
            </motion.h2>
          </div>

          {/* See Live Preview button */}
          <div className="absolute left-2 bottom-[120vw]   md:bottom-6 md:left-10 md:bottom-10 z-20">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              }}
              whileTap={{ scale: 0.98 }}
              className="px-5 md:px-8 py-2 md:py-4 bg-white/10 backdrop-blur-md border border-white/30 transition-all rounded-lg text-white font-medium flex items-center space-x-3 relative group overflow-hidden"
            >
              <span className="font-bebas tracking-wider text-base md:text-xl">
                See Live Preview
              </span>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 1L15 8L8 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 8H1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>
              <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-yellow-500/20 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="absolute right-6 bottom-2 md:bottom-6 md:right-10 md:bottom-10 flex items-center space-x-4 z-20">
        <motion.button
          onClick={handlePrev}
          className=" h-8 w-8 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all flex items-center justify-center text-white border border-white/20 hover:scale-110 hover:border-white/40 group"
          aria-label="Previous"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            whileHover={{ x: -2 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
          <div className="absolute inset-0 rounded-full blur-md bg-white/5 group-hover:bg-white/10 -z-10"></div>
        </motion.button>

        <motion.button
          onClick={handleNext}
          className="h-8 w-8 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all flex items-center justify-center text-white border border-white/20 hover:scale-110 hover:border-white/40 group"
          aria-label="Next"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
          <div className="absolute inset-0 rounded-full blur-md bg-white/5 group-hover:bg-white/10 -z-10"></div>
        </motion.button>
      </div>

      {/* Slide indicators */}
      <div className="absolute left-1/2 bottom-6 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-white w-6"
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
