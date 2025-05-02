import { motion } from "framer-motion";
import SectionTransition from "./ui/section-transition";
import { contentData } from "@/data/content";
import ContextualTooltip from "./ui/contextual-tooltip";

export default function Services() {
  const { services } = contentData;

  // Map service title to tooltip type
  const getTooltipType = (title: string): any => {
    const titleMap: Record<string, any> = {
      "Web Design": "webDesign",
      "Branding": "branding",
      "App Development": "appDevelopment",
      "Digital Marketing": "digitalMarketing",
      "UI/UX Design": "uiUxDesign",
      "E-commerce": "ecommerce"
    };
    
    // Return the matching type or default to webDesign
    return titleMap[title] || "webDesign";
  };

  return (
    <SectionTransition id="services" delayOrder={1}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 relative">
          <h2 className="text-4xl md:text-6xl font-space font-bold">
            <span className="text-white">OUR</span>
            <span className="text-cherry-primary"> SERVICES</span>
          </h2>
          <p className="text-xl mt-4 max-w-2xl">
            {services.description}
          </p>
          <div className="absolute -top-10 -right-10 text-9xl opacity-10 font-bebas">SERVICES</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.items.map((service, index) => (
            <ContextualTooltip 
              key={index}
              type={getTooltipType(service.title)}
              className="block"
            >
              <motion.div
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg group"
                style={{ 
                  boxShadow: `0 10px 15px -3px rgba(${service.shadowColor}, 0.1)` 
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div 
                  className={`w-16 h-16 rounded-full ${service.iconBg} flex items-center justify-center mb-4 group-hover:${service.iconHoverBg} transition-all`}
                >
                  <span className={`${service.iconColor} text-3xl`}>{service.icon}</span>
                </div>
                <h3 className="text-2xl font-space font-bold mb-2">{service.title}</h3>
                <p className="text-white/80">{service.description}</p>
                <a 
                  href="#" 
                  className={`mt-4 inline-flex items-center ${service.linkColor} group-hover:${service.linkHoverColor} transition-colors`}
                >
                  Learn more 
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </motion.div>
            </ContextualTooltip>
          ))}
        </div>
      </div>
    </SectionTransition>
  );
}
