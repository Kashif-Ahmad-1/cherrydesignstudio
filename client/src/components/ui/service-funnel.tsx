import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contentData } from "@/data/content";

interface ServiceTag {
  name: string;
  icon: string;
}

interface ServiceLayer {
  id: string;
  name: string;
  color: string;
  tags: ServiceTag[];
}

export default function ServiceFunnel() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Calculate dynamic sizes based on viewport
  const getLayerStyle = (layer: ServiceLayer, index: number) => {
    const totalLayers = contentData.serviceFunnel.layers.length;
    const isActive = activeLayer === layer.id || hoveredLayer === layer.id;

    // Scale layers progressively smaller from top to bottom
    const baseWidth = isMobile ? 90 : 80; // Percentage of container width
    const widthReduction = isMobile ? 10 : 8; // Percentage reduction per layer
    const width = baseWidth - index * widthReduction;

    // Progressive transparency
    const opacity = isActive ? 0.9 : 0.6 - index * 0.1;

    return {
      width: `${width}%`,
      opacity: opacity,
      backgroundColor: isActive ? layer.color : `${layer.color}80`,
      zIndex: totalLayers - index,
    };
  };

  const handleLayerHover = (layerId: string) => {
    setHoveredLayer(layerId);
  };

  const handleLayerLeave = () => {
    setHoveredLayer(null);
  };

  const handleLayerClick = (layerId: string) => {
    setActiveLayer(activeLayer === layerId ? null : layerId);
  };

  // Animation variants for tags
  const tagContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className="relative py-24 px-4 overflow-hidden bg-black text-white min-h-[80vh] flex flex-col items-center justify-center">
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bebas tracking-tight mb-4">
          {contentData.serviceFunnel.title}
        </h2>
        <p className="text-xl text-gray-300">
          {contentData.serviceFunnel.description}
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full max-w-6xl mx-auto h-[60vh] flex flex-col items-center justify-center"
      >
        {contentData.serviceFunnel.layers.map((layer, index) => (
          <div
            key={layer.id}
            className="relative w-full flex flex-col items-center"
          >
            <motion.div
              className="absolute rounded-[100%] h-[18vh] transform -translate-y-1/2 cursor-pointer flex items-center justify-start pl-8 md:pl-16"
              style={getLayerStyle(layer, index)}
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => handleLayerHover(layer.id)}
              onHoverEnd={handleLayerLeave}
              onClick={() => handleLayerClick(layer.id)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <span className="text-3xl md:text-4xl font-bold z-10">
                {layer.id}
              </span>
              <span className="ml-4 text-xl md:text-2xl font-medium z-10">
                {layer.name}
              </span>
            </motion.div>

            {/* Floating tags */}
            <AnimatePresence>
              {(activeLayer === layer.id || hoveredLayer === layer.id) && (
                <motion.div
                  className="absolute right-4 md:right-16 top-1/2 transform -translate-y-1/2 flex flex-wrap justify-end max-w-[50%] z-20 gap-2"
                  variants={tagContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                >
                  {layer.tags.map((tag) => (
                    <motion.div
                      key={tag.name}
                      className="bg-black bg-opacity-60 backdrop-blur-sm px-3 py-2 rounded-full flex items-center"
                      variants={tagVariants}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(0,0,0,0.8)",
                      }}
                    >
                      <span className="mr-2">{tag.icon}</span>
                      <span className="text-sm md:text-base font-medium">
                        {tag.name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
