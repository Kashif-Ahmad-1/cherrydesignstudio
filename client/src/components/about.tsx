import { motion } from "framer-motion";
import SectionTransition from "./ui/section-transition";
import { contentData } from "@/data/content";

export default function About() {
  const { about } = contentData;

  return (
    <SectionTransition 
      id="about" 
      className="bg-gradient-to-b from-cherry-bg to-cherry-bg/80" 
      delayOrder={2}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 relative">
          <h2 className="text-4xl md:text-6xl font-space font-bold">
            <span className="text-white">WHO</span>
            <span className="text-cherry-secondary"> WE</span>
            <span className="text-cherry-pink"> ARE</span>
          </h2>
          <p className="text-xl mt-4 max-w-2xl">{about.description}</p>
          <div className="absolute -top-10 -right-10 text-9xl opacity-10 font-bebas">ABOUT</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <motion.h3 
              className="text-3xl font-space font-bold mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our <span className="text-cherry-primary">Story</span>
            </motion.h3>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {about.story.map((paragraph, idx) => (
                <p key={idx} className="mb-4">{paragraph}</p>
              ))}
            </motion.div>

            <motion.h3 
              className="text-3xl font-space font-bold mt-10 mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Our <span className="text-cherry-pink">Values</span>
            </motion.h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {about.values.map((value, index) => (
                <motion.div 
                  key={index} 
                  className="p-4 rounded-lg bg-white/5 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                >
                  <h4 className={`text-xl font-bold mb-2 ${value.color}`}>{value.title}</h4>
                  <p>{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <motion.div 
              className="relative z-10 overflow-hidden rounded-3xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Creative team working together" 
                className="w-full object-cover h-[500px]"
              />
            </motion.div>

            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-cherry-primary/20 rounded-full blur-xl"></div>
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-cherry-pink/20 rounded-full blur-xl"></div>

            <motion.div 
              className="absolute -top-5 -left-5 w-20 h-20 bg-cherry-secondary rounded-lg rotate-12"
              initial={{ opacity: 0, rotate: 0 }}
              whileInView={{ opacity: 1, rotate: 12 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <motion.div 
              className="absolute -bottom-5 -right-5 w-20 h-20 bg-cherry-pink rounded-lg -rotate-12"
              initial={{ opacity: 0, rotate: 0 }}
              whileInView={{ opacity: 1, rotate: -12 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          </div>
        </div>

        {/* Team Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {about.stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
            >
              <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionTransition>
  );
}
