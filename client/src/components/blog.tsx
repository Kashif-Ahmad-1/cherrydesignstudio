import { useState } from "react";
import { motion } from "framer-motion";
import SectionTransition from "./ui/section-transition";
import { contentData } from "@/data/content";

export default function Blog() {
  const { blog } = contentData;
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter posts based on selected category
  const filteredPosts = activeCategory === "All" 
    ? blog.posts 
    : blog.posts.filter(post => post.category === activeCategory);

  return (
    <SectionTransition id="blog" className="bg-gradient-to-b from-[#080218] to-cherry-bg" delayOrder={6}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 relative">
          <h2 className="text-4xl md:text-6xl font-space font-bold">
            <span className="text-white">OUR</span>
            <span className="text-cherry-secondary"> BLOG</span>
          </h2>
          <p className="text-xl mt-4 max-w-2xl">{blog.description}</p>
          <div className="absolute -top-10 -right-10 text-9xl opacity-10 font-bebas">BLOG</div>
        </div>

        {/* Featured Post */}
        <motion.div 
          className="mb-16 relative overflow-hidden rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative h-[500px] w-full">
            <img 
              src={blog.featured.image} 
              alt={blog.featured.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
              <span className="inline-block px-3 py-1 bg-cherry-primary text-black rounded-full text-sm font-medium mb-4">
                {blog.featured.category}
              </span>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-4">{blog.featured.title}</h3>
              
              <p className="text-white/80 mb-6">{blog.featured.excerpt}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src={blog.featured.author.avatar} 
                    alt={blog.featured.author.name} 
                    className="w-10 h-10 rounded-full mr-3" 
                  />
                  <div>
                    <p className="font-medium">{blog.featured.author.name}</p>
                    <p className="text-white/60 text-sm">{blog.featured.date} · {blog.featured.readTime}</p>
                  </div>
                </div>
                
                <a 
                  href="#" 
                  className="btn-hover px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-cherry-primary/80 hover:text-cherry-bg transition-all"
                >
                  Read Article
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Filters */}
        <div className="mb-12 flex flex-wrap gap-3">
          {blog.categories.map((category, index) => (
            <button 
              key={index}
              className={`px-5 py-2 rounded-full transition-all ${
                activeCategory === category 
                  ? 'bg-cherry-secondary text-white' 
                  : 'bg-white/5 hover:bg-cherry-secondary/20'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div 
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden group hover:bg-white/10 transition-all duration-300 h-full flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm">
                    {post.category}
                  </span>
                  <span className="text-sm text-white/60">{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-cherry-primary transition-colors">{post.title}</h3>
                
                <p className="text-white/70 mb-4 flex-grow">{post.excerpt}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                  <div className="flex items-center">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name} 
                      className="w-8 h-8 rounded-full mr-2" 
                    />
                    <span className="text-sm">{post.author.name}</span>
                  </div>
                  
                  <span className="text-sm text-white/60">{post.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More Posts Button */}
        <div className="mt-12 text-center">
          <button className="btn-hover inline-block px-8 py-4 bg-white/10 hover:bg-cherry-secondary text-white hover:text-white rounded-full font-bold transition-all">
            View All Posts
          </button>
        </div>

        {/* Decorative Elements */}
        <motion.div 
          className="absolute top-1/4 right-0 w-64 h-64 bg-cherry-secondary/20 rounded-full blur-3xl -z-10"
          animate={{
            x: [0, 30, 0],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 left-0 w-64 h-64 bg-cherry-pink/20 rounded-full blur-3xl -z-10"
          animate={{
            x: [0, -30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </SectionTransition>
  );
}