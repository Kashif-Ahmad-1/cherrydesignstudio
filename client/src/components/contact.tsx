import { useState } from "react";
import { motion } from "framer-motion";
import SectionTransition from "./ui/section-transition";
import { contentData } from "@/data/content";

export default function Contact() {
  const { contact } = contentData;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    consent: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      consent: false
    });
  };

  return (
    <SectionTransition id="contact" delayOrder={5}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 relative">
          <h2 className="text-4xl md:text-6xl font-space font-bold">
            <span className="text-white">LET'S</span>
            <span className="text-cherry-primary"> CREATE</span>
            <span className="text-cherry-secondary"> TOGETHER</span>
          </h2>
          <p className="text-xl mt-4 max-w-2xl">{contact.description}</p>
          <div className="absolute -top-10 -right-10 text-9xl opacity-10 font-bebas">CONTACT</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe" 
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry-primary focus:border-transparent transition-all" 
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Your Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com" 
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry-primary focus:border-transparent transition-all" 
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry" 
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry-primary focus:border-transparent transition-all" 
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium">Your Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6} 
                  placeholder="Tell us about your project..." 
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry-primary focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="flex items-center">
                <input 
                  id="consent" 
                  name="consent"
                  checked={formData.consent}
                  onChange={handleCheckboxChange}
                  type="checkbox" 
                  className="w-5 h-5 bg-white/5 border border-white/10 rounded focus:ring-cherry-primary"
                  required
                />
                <label htmlFor="consent" className="ml-2 text-sm">I agree to the privacy policy and terms of service</label>
              </div>

              <button 
                type="submit" 
                className="btn-hover w-full py-4 px-6 bg-gradient-to-r from-cherry-primary to-cherry-secondary text-cherry-bg font-bold rounded-lg transition-all transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div 
            className="flex flex-col justify-between"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <h3 className="text-3xl font-space font-bold mb-6">Contact <span className="text-cherry-pink">Information</span></h3>

              <div className="space-y-6">
                {contact.info.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`mr-4 mt-1 ${item.iconColor}`}>
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                      <p className="text-white/70">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-3xl font-space font-bold mb-6">Follow <span className="text-cherry-yellow">Us</span></h3>
              <div className="flex space-x-4">
                {contact.social.map((platform, index) => (
                  <a 
                    key={index} 
                    href={platform.url} 
                    className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-cherry-primary/20 transition-all"
                    aria-label={platform.name}
                  >
                    <span className="text-xl">{platform.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionTransition>
  );
}
