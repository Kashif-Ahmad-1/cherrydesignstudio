import { motion } from "framer-motion";
import SectionTransition from "./ui/section-transition";
import { contentData } from "@/data/content";

export default function Testimonials() {
  const { testimonials } = contentData;

  return (
    <SectionTransition 
      className="bg-gradient-to-b from-cherry-bg to-[#080218]" 
      delayOrder={4}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 relative">
          <h2 className="text-4xl md:text-6xl font-space font-bold">
            <span className="text-white">CLIENT</span>
            <span className="text-cherry-pink"> LOVE</span>
          </h2>
          <p className="text-xl mt-4 max-w-2xl">{testimonials.description}</p>
          <div className="absolute -top-10 -right-10 text-9xl opacity-10 font-bebas">REVIEWS</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.items.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl relative group hover:bg-white/10 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`text-6xl ${testimonial.quoteColor} opacity-30 absolute top-4 left-4`}>"</div>
              <div className="relative z-10">
                <p className="mb-6 text-lg">{testimonial.content}</p>

                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-white/70">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap gap-6 justify-center items-center opacity-70">
          {testimonials.clients.map((client, index) => (
            <motion.img 
              key={index}
              src={client} 
              alt="Client logo" 
              className="h-12 grayscale hover:grayscale-0 transition-all" 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
            />
          ))}
        </div>
      </div>
    </SectionTransition>
  );
}
