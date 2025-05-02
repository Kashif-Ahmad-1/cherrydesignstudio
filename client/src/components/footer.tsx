import { motion } from "framer-motion";
import { contentData } from "@/data/content";

export default function Footer() {
  const { footer } = contentData;

  return (
    <footer className=" px-4 bg-gradient-to-b from-[#070218] to-black">
      <div className="max-w-[95vw] mx-auto">
        <motion.div
          className="py-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Cherry.Design. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
