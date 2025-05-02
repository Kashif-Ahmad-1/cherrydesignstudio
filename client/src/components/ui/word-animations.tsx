import { ReactNode } from "react";
import { motion } from "framer-motion";

interface WordAnimationsProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function WordAnimations({ 
  children, 
  className = "",
  delay = 0 
}: WordAnimationsProps) {
  // Convert children to string and split into words
  const text = children?.toString() || "";
  const words = text.split(" ");
  
  return (
    <h1 className={`word-animations text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-space font-bold leading-none ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mx-1 hover:text-cherry-primary transition-transform duration-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: delay + (i * 0.1)
          }}
          whileHover={{
            y: -5,
            rotate: i % 2 === 0 ? -3 : 3,
            transition: { duration: 0.3 }
          }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}
