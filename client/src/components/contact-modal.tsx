import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import gsap from 'gsap';
import { X, ChevronDown } from 'lucide-react';
import { getCountries, getCountryCallingCode } from 'libphonenumber-js';

// Import flag emoji utility
const countryCodeToFlag = (isoCode: string) => {
  // Convert ISO country code to regional indicator symbols
  // which will be displayed as a flag emoji
  return isoCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));
};

// Get all countries from libphonenumber-js
const countries = getCountries();

// Format country data for dropdown
const countryCodes = countries.map(country => ({
  id: country, // Unique ID for React keys
  code: `+${getCountryCallingCode(country)}`,
  country,
  flag: countryCodeToFlag(country)
})).sort((a, b) => {
  // Sort by country name alphabetically
  return a.country.localeCompare(b.country);
});

// Available services
const services = [
  { id: 'webDesign', label: 'Web Design' },
  { id: 'branding', label: 'Branding' },
  { id: 'appDevelopment', label: 'App Development' },
  { id: 'digitalMarketing', label: 'Digital Marketing' },
  { id: 'uiUxDesign', label: 'UI/UX Design' },
  { id: 'ecommerce', label: 'E-commerce' }
];

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  countryCode: z.string({ required_error: "Country code is required" }),
  phone: z.string().min(5, { message: "Valid phone number is required" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
  company: z.string().min(2, { message: "Company name is required" }),
  services: z.array(z.string()).min(1, { message: "Select at least one service" }),
  message: z.string().optional()
});

type FormData = z.infer<typeof formSchema>;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    clearErrors
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      countryCode: '+1',
      phone: '',
      company: '',
      services: [],
      message: ''
    }
  });

  // GSAP animations for modal open/close
  useEffect(() => {
    if (isOpen) {
      // Animate modal in
      gsap.fromTo(
        modalRef.current,
        { 
          y: '100%',
          opacity: 0 
        },
        { 
          y: '0%',
          opacity: 1,
          duration: 0.8,
          ease: "power3.out"
        }
      );
      
      // Animate form elements in sequence
      if (formRef.current) {
        const formElements = formRef.current.querySelectorAll('.form-element');
        gsap.fromTo(
          formElements,
          { 
            y: 30, 
            opacity: 0 
          },
          { 
            y: 0, 
            opacity: 1,
            stagger: 0.05,
            duration: 0.5,
            delay: 0.3,
            ease: "power2.out"
          }
        );
      }
      
      // Disable body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Animate modal out
      if (modalRef.current) {
        gsap.to(modalRef.current, { 
          y: '100%',
          opacity: 0,
          duration: 0.6,
          ease: "power3.in"
        });
      }
      
      // Re-enable body scroll
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Toggle service selection
  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => {
      const newSelection = prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId];
      
      // Update form value
      setValue('services', newSelection);
      
      // Clear error if at least one service is selected
      if (newSelection.length > 0) {
        clearErrors('services');
      }
      
      return newSelection;
    });
  };

  // Form submission handler
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', data);
      
      // Show success message
      setShowSuccessMessage(true);
      
      // Reset form after delay
      setTimeout(() => {
        reset();
        setSelectedServices([]);
        setShowSuccessMessage(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="w-full max-w-7xl bg-[#111] rounded-t-[2rem] p-8 md:p-12 max-h-[90vh] overflow-y-auto transform"
        style={{ boxShadow: '0 -10px 50px rgba(0, 0, 0, 0.3)' }}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[#FBD1B8] font-bebas text-5xl md:text-6xl tracking-tight">Get In Touch</h2>
          <motion.button
            onClick={onClose}
            className="p-2 rounded-full bg-[#222] text-white hover:bg-[#333] transition-colors"
            whileHover={{ rotate: 90, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={24} />
          </motion.button>
        </div>
        
        {showSuccessMessage ? (
          <div className="text-center py-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-block mb-4 bg-green-500/20 p-4 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h3 className="text-3xl font-bebas text-white mb-2">Message Sent!</h3>
            <p className="text-gray-400">We'll get back to you soon.</p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="form-element space-y-2">
              <label className="text-[#FBD1B8] font-medium block">Name</label>
              <input
                type="text"
                className={`w-full px-4 py-3 bg-[#222] border ${errors.name ? 'border-red-500' : 'border-[#333]'} rounded-lg text-white focus:outline-none focus:border-[#FBD1B8] transition-colors`}
                {...register('name')}
              />
              {errors.name && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.name.message}
                </motion.p>
              )}
            </div>
            
            <div className="form-element space-y-2">
              <label className="text-[#FBD1B8] font-medium block">Email</label>
              <input
                type="email"
                className={`w-full px-4 py-3 bg-[#222] border ${errors.email ? 'border-red-500' : 'border-[#333]'} rounded-lg text-white focus:outline-none focus:border-[#FBD1B8] transition-colors`}
                {...register('email')}
              />
              {errors.email && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>
            
            <div className="form-element space-y-2">
              <label className="text-[#FBD1B8] font-medium block">Phone</label>
              <div className="flex gap-2">
                <div className="w-1/3 relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                  <select
                    className={`w-full px-2 py-3 bg-[#222] border ${errors.countryCode ? 'border-red-500' : 'border-[#333]'} rounded-lg text-white focus:outline-none focus:border-[#FBD1B8] transition-colors appearance-none`}
                    {...register('countryCode')}
                  >
                    {countryCodes.map(country => (
                      <option key={country.id} value={country.code}>
                        {country.flag} {country.code} ({country.country})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-2/3">
                  <input
                    type="tel"
                    placeholder="Phone number without dashes"
                    className={`w-full px-4 py-3 bg-[#222] border ${errors.phone ? 'border-red-500' : 'border-[#333]'} rounded-lg text-white focus:outline-none focus:border-[#FBD1B8] transition-colors`}
                    {...register('phone')}
                  />
                </div>
              </div>
              {(errors.phone || errors.countryCode) && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.phone?.message || errors.countryCode?.message}
                </motion.p>
              )}
            </div>
            
            <div className="form-element space-y-2">
              <label className="text-[#FBD1B8] font-medium block">Company</label>
              <input
                type="text"
                className={`w-full px-4 py-3 bg-[#222] border ${errors.company ? 'border-red-500' : 'border-[#333]'} rounded-lg text-white focus:outline-none focus:border-[#FBD1B8] transition-colors`}
                {...register('company')}
              />
              {errors.company && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.company.message}
                </motion.p>
              )}
            </div>
            
            <div className="form-element md:col-span-2 space-y-4">
              <label className="text-[#FBD1B8] font-medium block">Select Services</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {services.map(service => (
                  <motion.button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className={`px-4 py-3 rounded-full text-white text-center transition-colors ${
                      selectedServices.includes(service.id)
                        ? 'bg-[#FBD1B8] text-black font-medium'
                        : 'bg-[#222] border border-[#333] hover:bg-[#333]'
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {service.label}
                  </motion.button>
                ))}
              </div>
              {errors.services && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.services.message}
                </motion.p>
              )}
            </div>
            
            <div className="form-element md:col-span-2 space-y-2">
              <label className="text-[#FBD1B8] font-medium block">Message (Optional)</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 bg-[#222] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#FBD1B8] transition-colors"
                {...register('message')}
              ></textarea>
            </div>
            
            <div className="form-element md:col-span-2">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-4 bg-[#FBD1B8] text-black font-bebas text-xl tracking-wide rounded-lg 
                  relative overflow-hidden transition-all ${isSubmitting ? 'cursor-not-allowed' : 'hover:bg-[#F2A93C]'}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    SENDING...
                  </div>
                ) : (
                  "SUBMIT"
                )}
              </motion.button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}