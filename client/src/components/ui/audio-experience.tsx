import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Volume1 } from "lucide-react";
import { generateAmbient, generateEffect } from "@/lib/audioGenerator";

// Define the audio section IDs
const audioSections = [
  {
    id: "hero",
    baseFrequency: 220, // A3 - warm and welcoming
  },
  {
    id: "intro",
    baseFrequency: 261.63, // C4 - neutral and clean
  },
  {
    id: "whatwedo",
    baseFrequency: 329.63, // E4 - brighter and energetic
  },
  {
    id: "portfolio",
    baseFrequency: 349.23, // F4 - creative and flowing
  },
  {
    id: "contact",
    baseFrequency: 392.00, // G4 - action-oriented
  }
];

// Audio cache to prevent regenerating sounds
const audioCache: Record<string, string> = {};

export default function AudioExperience() {
  const [isMuted, setIsMuted] = useState(true); // Start muted by default
  const [volume, setVolume] = useState(0.5);
  const [currentSection, setCurrentSection] = useState("");
  const [isControlVisible, setIsControlVisible] = useState(false);
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);
  const effectAudioRef = useRef<HTMLAudioElement | null>(null);
  
  // Timeout for hiding controls
  const controlTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load or generate audio based on section
  const getAudioUrl = async (section: string, type: 'ambient' | 'enter' | 'hover') => {
    try {
      const cacheKey = `${section}-${type}`;
      
      // Check if already in cache
      if (audioCache[cacheKey]) {
        return audioCache[cacheKey];
      }
      
      // Early return with empty URL if audio context isn't available
      if (typeof window === 'undefined' || 
          !window.AudioContext && !(window as any).webkitAudioContext) {
        console.log("AudioContext not available in this environment");
        return '';
      }
      
      // Get section info
      const sectionInfo = audioSections.find(s => s.id === section);
      if (!sectionInfo) return '';
      
      try {
        let url = '';
        if (type === 'ambient') {
          // Generate a unique ambient for this section
          url = await generateAmbient(
            sectionInfo.baseFrequency,  // Base frequency from section config
            10,  // 10 second loop
            4    // Complexity/number of layers in the sound
          );
        } else if (type === 'enter') {
          url = await generateEffect('enter');
        } else {
          url = await generateEffect('hover');
        }
        
        // Save in cache
        audioCache[cacheKey] = url;
        return url;
      } catch (error) {
        console.error(`Error generating ${type} audio for ${section}:`, error);
        return '';
      }
    } catch (error) {
      console.error("Unexpected error in getAudioUrl:", error);
      return '';
    }
  };

  // Use IntersectionObserver to detect which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 } // Trigger when 60% of section is visible
    );

    // Get all main sections to observe
    const sections = document.querySelectorAll('main > div[id], main > section[id]');
    
    // If no sections found, use audioSections IDs to find them
    if (sections.length === 0) {
      audioSections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.observe(element);
        }
      });
    } else {
      sections.forEach((section) => {
        observer.observe(section);
      });
    }

    return () => {
      // Clean up observer
      document.querySelectorAll('main > div[id], main > section[id]').forEach((section) => {
        observer.unobserve(section);
      });
      
      // Also unobserve any directly accessed elements
      audioSections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  // Handle ambient audio changes when section changes
  useEffect(() => {
    if (!currentSection || isMuted) return;
    
    const sectionInfo = audioSections.find(s => s.id === currentSection);
    if (!sectionInfo) return;
    
    // Helper for creating and playing audio
    const playAudio = async () => {
      try {
        // Generate ambient audio for current section
        const ambientUrl = await getAudioUrl(currentSection, 'ambient');
        
        // Stop previous ambient if playing
        if (ambientAudioRef.current) {
          ambientAudioRef.current.pause();
        }
        
        // Play enter effect
        const enterUrl = await getAudioUrl(currentSection, 'enter');
        if (enterUrl) {
          const effectAudio = new Audio(enterUrl);
          effectAudio.volume = volume;
          effectAudio.play().catch(e => console.log("Effect audio failed to play: ", e));
          effectAudioRef.current = effectAudio;
        }
        
        // Start ambient audio with fade in
        if (ambientUrl) {
          const ambientAudio = new Audio(ambientUrl);
          ambientAudio.loop = true;
          
          // Start with volume 0 and fade in
          ambientAudio.volume = 0;
          ambientAudio.play().catch(e => console.log("Ambient audio failed to play: ", e));
          
          // Fade in the ambient audio
          let fadeVolume = 0;
          const fadeInterval = setInterval(() => {
            fadeVolume += 0.05;
            if (fadeVolume >= volume) {
              fadeVolume = volume;
              clearInterval(fadeInterval);
            }
            ambientAudio.volume = fadeVolume;
          }, 100);
          
          ambientAudioRef.current = ambientAudio;
        }
      } catch (error) {
        console.error("Error playing section audio:", error);
      }
    };
    
    playAudio();
  }, [currentSection, isMuted]);

  // Update volume when it changes
  useEffect(() => {
    if (ambientAudioRef.current && !isMuted) {
      ambientAudioRef.current.volume = volume;
    }
  }, [volume, isMuted]);

  // Toggle mute function
  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    
    if (newMuted) {
      // Turning sound off - stop all audio
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause();
        ambientAudioRef.current = null;
      }
      if (effectAudioRef.current) {
        effectAudioRef.current.pause();
        effectAudioRef.current = null;
      }
    } else if (currentSection) {
      // Turning sound on - trigger current section's audio
      // The effect hook will handle playing the ambient sound
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  // Show controls temporarily when user interacts with them
  const showControls = () => {
    setIsControlVisible(true);
    
    if (controlTimeoutRef.current) {
      clearTimeout(controlTimeoutRef.current);
    }
    
    controlTimeoutRef.current = setTimeout(() => {
      setIsControlVisible(false);
      controlTimeoutRef.current = null;
    }, 3000);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause();
      }
      if (effectAudioRef.current) {
        effectAudioRef.current.pause();
      }
      if (controlTimeoutRef.current) {
        clearTimeout(controlTimeoutRef.current);
      }
    };
  }, []);

  // Effect to play hover sounds when hovering interactive elements
  useEffect(() => {
    // Create a memoized version of the function that doesn't change on each render
    const handleMouseEnter = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if target or its parent has interactive classes
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        (typeof target.closest === 'function' && (target.closest('button') || target.closest('a'))) ||
        (target.classList && target.classList.contains && target.classList.contains('interactive')) ||
        (target.parentElement && target.parentElement.classList && 
         target.parentElement.classList.contains && target.parentElement.classList.contains('interactive'));
      
      if (isInteractive && !isMuted && currentSection) {
        try {
          // Generate and play hover sound
          const hoverUrl = await getAudioUrl(currentSection, 'hover');
          if (hoverUrl) {
            const hoverAudio = new Audio(hoverUrl);
            hoverAudio.volume = volume * 0.7; // Slightly quieter than ambient
            hoverAudio.play().catch(e => console.log("Hover audio failed to play: ", e));
          }
        } catch (error) {
          console.error("Error playing hover sound:", error);
        }
      }
    };

    document.addEventListener('mouseenter', handleMouseEnter, true);
    
    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
    };
  }, [isMuted, currentSection, volume]); // Removed getAudioUrl from dependencies as it causes issues

  return (
    <motion.div 
      className="fixed bottom-8 right-8 z-50 flex items-center"
      onMouseEnter={showControls}
      onClick={showControls}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <AnimatePresence>
        {isControlVisible && (
          <motion.div 
            className="flex items-center gap-2 bg-black/50 backdrop-blur-md p-2 rounded-full mr-2"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              disabled={isMuted}
              className="w-24 h-2 bg-white/20 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
            <motion.div 
              className="text-xs text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {volume < 0.3 ? "Low" : volume < 0.6 ? "Medium" : "High"}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={toggleMute}
        className="h-10 w-10 rounded-full bg-black/60 backdrop-blur-lg flex items-center justify-center text-white hover:bg-black/80 transition-colors border border-white/10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isMuted ? 
          <VolumeX className="h-5 w-5" /> : 
          volume < 0.3 ? 
            <Volume1 className="h-5 w-5" /> : 
            <Volume2 className="h-5 w-5" />
        }
      </motion.button>
    </motion.div>
  );
}