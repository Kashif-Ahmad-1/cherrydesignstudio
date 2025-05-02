import { useState } from "react";
import { motion } from "framer-motion";
import SectionTransition from "./ui/section-transition";
import { contentData } from "@/data/content";

export default function Projects() {
  const { projects } = contentData;
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All" 
    ? projects.items 
    : projects.items.filter(project => project.categories.includes(filter));

  return (
    <SectionTransition id="projects" delayOrder={3}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 relative">
          <h2 className="text-4xl md:text-6xl font-space font-bold">
            <span className="text-white">OUR</span>
            <span className="text-cherry-yellow"> WORK</span>
          </h2>
          <p className="text-xl mt-4 max-w-2xl">{projects.description}</p>
          <div className="absolute -top-10 -right-10 text-9xl opacity-10 font-bebas">PROJECTS</div>
        </div>

        {/* Project Filters */}
        <div className="mb-10 flex flex-wrap gap-3">
          {projects.filters.map((filterItem, index) => (
            <button 
              key={index}
              className={`px-5 py-2 rounded-full transition-all ${
                filter === filterItem 
                  ? 'bg-cherry-primary/80 text-cherry-bg' 
                  : 'bg-white/10 hover:bg-cherry-primary/80 hover:text-cherry-bg'
              }`}
              onClick={() => setFilter(filterItem)}
            >
              {filterItem}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={index} 
              className="group relative overflow-hidden rounded-2xl h-80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />

              <div className="absolute inset-0 bg-gradient-to-t from-cherry-bg/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-space font-bold">{project.title}</h3>
                <p className="text-white/80 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className={`text-xs px-3 py-1 ${tag.bgColor} rounded-full ${tag.textColor}`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                <a href="#" className="mt-4 inline-flex items-center text-cherry-primary">
                  View Case Study
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="btn-hover inline-block px-8 py-4 bg-white/10 hover:bg-cherry-primary text-white hover:text-cherry-bg rounded-full font-bold transition-all">
            View All Projects
          </button>
        </div>
      </div>
    </SectionTransition>
  );
}
