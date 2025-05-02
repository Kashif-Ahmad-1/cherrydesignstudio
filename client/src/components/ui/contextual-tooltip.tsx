import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Fun character descriptions for different tooltips
export const characterDescriptions = {
  webDesign: {
    name: "Pixel Percy",
    description: "I turn pixels into magic! I love creating beautiful websites that make people go 'wow!'",
    emoji: "✨"
  },
  branding: {
    name: "Brand Beatrice",
    description: "I help businesses find their voice! My superpower is creating memorable brand identities.",
    emoji: "🎨"
  },
  uiUxDesign: {
    name: "Usability Ursula",
    description: "I make things easy to use! I believe good design should feel like a friendly conversation.",
    emoji: "🧠"
  },
  digitalMarketing: {
    name: "Marketing Max",
    description: "I help brands get noticed! I'm all about reaching the right people at the right time.",
    emoji: "📱"
  },
  contactUs: {
    name: "Chatty Charlie",
    description: "I love hearing from you! Drop me a message and let's create something awesome together.",
    emoji: "💌"
  },
  ecommerce: {
    name: "Shop Sally",
    description: "I build online stores that sell! My passion is creating shopping experiences that convert.",
    emoji: "🛒"
  },
  appDevelopment: {
    name: "App Andy",
    description: "I build apps that people love! From idea to launch, I make digital products come alive.",
    emoji: "📱"
  },
  portfolio: {
    name: "Portfolio Polly",
    description: "Check out our amazing work! I'm proud to showcase the projects we've crafted with love.",
    emoji: "🏆"
  },
  about: {
    name: "Storyteller Sam",
    description: "Let me tell you our story! We're a team of passionate creators making digital dreams come true.",
    emoji: "📚"
  }
};

type CharacterKey = keyof typeof characterDescriptions;

interface ContextualTooltipProps {
  children: React.ReactNode;
  type: CharacterKey;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export default function ContextualTooltip({ 
  children, 
  type, 
  position = 'top',
  className = '' 
}: ContextualTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const character = characterDescriptions[type];

  // Position styling based on tooltip position
  const positionClasses = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  };

  // Arrow styling based on tooltip position
  const arrowClasses = {
    top: 'bottom-[-6px] left-1/2 transform -translate-x-1/2 rotate-45',
    bottom: 'top-[-6px] left-1/2 transform -translate-x-1/2 rotate-45',
    left: 'right-[-6px] top-1/2 transform -translate-y-1/2 rotate-45',
    right: 'left-[-6px] top-1/2 transform -translate-y-1/2 rotate-45',
  };

  return (
    <div className={`relative inline-block ${className}`} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      {children}
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={`absolute z-50 ${positionClasses[position]}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="relative bg-[#111] text-white rounded-xl p-4 shadow-xl border border-[#333] min-w-[220px] max-w-[280px]">
              {/* Character Arrow */}
              <div 
                className={`absolute w-3 h-3 bg-[#111] border-[#333] border-b border-r ${arrowClasses[position]}`}
              ></div>
              
              {/* Character Content */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FBD1B8] text-black flex items-center justify-center text-xl">
                  {character.emoji}
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-[#FBD1B8]">{character.name}</h4>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="text-gray-400 hover:text-white p-1 rounded-full"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">{character.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}