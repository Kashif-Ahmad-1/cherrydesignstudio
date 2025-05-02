// This utility generates and exports procedural audio for our audio experience
// These would normally be proper audio files, but for demonstration we're generating them

// Add more detailed error handling and logging
const safeBrowser = typeof window !== 'undefined' && window.AudioContext !== undefined;

/**
 * Generate a blob URL for a tone at a specific frequency
 * @param frequency Frequency in Hz
 * @param duration Duration in seconds
 * @param type Oscillator type
 * @param volume Volume from 0 to 1
 * @returns Promise resolving to a blob URL
 */
export function generateTone(
  frequency: number, 
  duration: number = 1, 
  type: OscillatorType = 'sine',
  volume: number = 0.5
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      // Check if Web Audio API is supported
      if (!safeBrowser) {
        console.log("Web Audio API not supported in this browser, using silent audio");
        resolve('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA='); // Silent audio
        return;
      }
      
      // Create audio context with error handling
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        console.log("AudioContext not supported, using silent audio");
        resolve('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA='); // Silent audio
        return;
      }
      
      const audioContext = new AudioContextClass();
      
      // Create oscillator and gain nodes
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      // Set oscillator properties
      oscillator.type = type;
      oscillator.frequency.value = frequency;
      
      // Set volume
      gainNode.gain.value = volume;
      
      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      try {
        // Create a MediaStreamDestination to capture the audio
        const dest = audioContext.createMediaStreamDestination();
        gainNode.connect(dest);
        
        // Create a MediaRecorder to record the audio
        const mediaRecorder = new MediaRecorder(dest.stream);
        const chunks: BlobPart[] = [];
        
        // Event handlers for the MediaRecorder
        mediaRecorder.ondataavailable = (evt: BlobEvent) => {
          chunks.push(evt.data);
        };
        
        mediaRecorder.onerror = (event) => {
          console.error("MediaRecorder error:", event);
          audioContext.close();
          resolve('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA='); // Silent audio as fallback
        };
        
        mediaRecorder.onstop = () => {
          try {
            const blob = new Blob(chunks, { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            resolve(url);
          } catch (e) {
            console.error("Error creating audio blob:", e);
            resolve('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA='); // Silent audio
          } finally {
            // Cleanup
            audioContext.close();
          }
        };
        
        // Start recording
        mediaRecorder.start();
        
        // Start oscillator and set up envelope
        oscillator.start();
        
        // Ramp down gain at the end for a nicer sound
        gainNode.gain.exponentialRampToValueAtTime(
          0.001, audioContext.currentTime + duration
        );
        
        // Stop recording and oscillator after duration
        setTimeout(() => {
          try {
            oscillator.stop();
            mediaRecorder.stop();
          } catch (e) {
            console.error("Error stopping audio generation:", e);
            resolve('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA='); // Silent audio
            audioContext.close();
          }
        }, duration * 1000);
      } catch (mediaError) {
        console.error("Media recording error:", mediaError);
        // If MediaRecorder fails, we still produce a tone directly through the AudioContext
        oscillator.start();
        setTimeout(() => {
          oscillator.stop();
          audioContext.close();
          resolve('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA='); // Silent audio as fallback
        }, duration * 1000);
      }
    } catch (error) {
      console.error("Audio generation error:", error);
      reject(error);
    }
  });
}

/**
 * Generate an ambient sound texture
 * @param baseFrequency Base frequency for the ambient sound
 * @param duration Duration in seconds
 * @param complexity Number of overtones to generate
 * @returns Promise resolving to a blob URL
 */
export function generateAmbient(
  baseFrequency: number = 220,
  duration: number = 10,
  complexity: number = 4
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      // Check if Web Audio API is supported
      if (!safeBrowser) {
        console.log("Web Audio API not supported in this browser, using silent audio");
        resolve('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA='); // Silent audio
        return;
      }
      
      // Create audio context with error handling
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        console.log("AudioContext not supported, using silent audio");
        resolve('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA='); // Silent audio
        return;
      }
      
      const audioContext = new AudioContextClass();
      
      // Create a gain node for the final output
      const masterGain = audioContext.createGain();
      masterGain.gain.value = 0.5;
      masterGain.connect(audioContext.destination);
      
      try {
        // Create a MediaStreamDestination to capture the audio
        const dest = audioContext.createMediaStreamDestination();
        masterGain.connect(dest);
        
        // Create a MediaRecorder to record the audio
        const mediaRecorder = new MediaRecorder(dest.stream);
        const chunks: BlobPart[] = [];
        
        // Create oscillators with different frequencies and types
        const oscillators: OscillatorNode[] = [];
        const gains: GainNode[] = [];
        
        for (let i = 0; i < complexity; i++) {
          const osc = audioContext.createOscillator();
          const gain = audioContext.createGain();
          
          // Use different oscillator types
          const types: OscillatorType[] = ['sine', 'triangle', 'sawtooth', 'square'];
          osc.type = types[i % types.length];
          
          // Set frequency with some harmonic relationship
          const freqMultiplier = i === 0 ? 1 : (i * 1.5) + (Math.random() * 0.1);
          osc.frequency.value = baseFrequency * freqMultiplier;
          
          // Set volume and connect
          gain.gain.value = 0.15 / (i + 1);
          osc.connect(gain);
          gain.connect(masterGain);
          
          // Add LFO for some movement in the sound
          if (i > 0) {
            const lfo = audioContext.createOscillator();
            const lfoGain = audioContext.createGain();
            
            lfo.frequency.value = 0.1 + (Math.random() * 0.3); // Slow modulation
            lfoGain.gain.value = 5 + (Math.random() * 10);
            
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);
            lfo.start();
          }
          
          oscillators.push(osc);
          gains.push(gain);
          osc.start();
        }
        
        // Event handlers for the MediaRecorder
        mediaRecorder.ondataavailable = (evt: BlobEvent) => {
          chunks.push(evt.data);
        };
        
        mediaRecorder.onerror = (event) => {
          console.error("MediaRecorder error:", event);
          // Cleanup
          oscillators.forEach(osc => {
            try { osc.stop(); } catch (e) { console.error("Error stopping oscillator:", e); }
          });
          audioContext.close();
          resolve('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA='); // Silent audio as fallback
        };
        
        mediaRecorder.onstop = () => {
          try {
            const blob = new Blob(chunks, { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            resolve(url);
          } catch (e) {
            console.error("Error creating audio blob:", e);
            resolve('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA='); // Silent audio
          } finally {
            // Cleanup
            oscillators.forEach(osc => {
              try { osc.stop(); } catch (e) { console.error("Error stopping oscillator:", e); }
            });
            audioContext.close();
          }
        };
        
        // Start recording
        mediaRecorder.start();
        
        // Add fade in
        masterGain.gain.setValueAtTime(0, audioContext.currentTime);
        masterGain.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 1);
        
        // Add fade out
        setTimeout(() => {
          try {
            masterGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1);
          } catch (e) {
            console.error("Error fading out audio:", e);
          }
        }, (duration - 1) * 1000);
        
        // Stop recording after duration
        setTimeout(() => {
          try {
            mediaRecorder.stop();
          } catch (e) {
            console.error("Error stopping audio generation:", e);
            // Cleanup
            oscillators.forEach(osc => {
              try { osc.stop(); } catch (e) { console.error("Error stopping oscillator:", e); }
            });
            audioContext.close();
            resolve('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA='); // Silent audio
          }
        }, duration * 1000);
      } catch (mediaError) {
        console.error("Media recording error:", mediaError);
        // If MediaRecorder fails, we'll use a silent audio fallback
        resolve('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA='); // Silent audio as fallback
      }
    } catch (error) {
      console.error("Audio generation error:", error);
      resolve('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA='); // Silent audio
    }
  });
}

/**
 * Generate a short effect sound
 * @param type Type of effect (enter, hover, click)
 * @returns Promise resolving to a blob URL
 */
export function generateEffect(type: 'enter' | 'hover' | 'click'): Promise<string> {
  return new Promise((resolve) => {
    try {
      // Check if Web Audio API is supported
      if (!safeBrowser) {
        console.log("Web Audio API not supported in this browser, using silent audio");
        resolve('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA='); // Silent audio
        return;
      }
      
      // Create audio context with error handling
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        console.log("AudioContext not supported, using silent audio");
        resolve('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA='); // Silent audio
        return;
      }
      
      const audioContext = new AudioContextClass();
      
      // Create a gain node for the final output
      const masterGain = audioContext.createGain();
      masterGain.gain.value = 0.3;
      masterGain.connect(audioContext.destination);
      
      try {
        // Create a MediaStreamDestination to capture the audio
        const dest = audioContext.createMediaStreamDestination();
        masterGain.connect(dest);
        
        // Create a MediaRecorder to record the audio
        const mediaRecorder = new MediaRecorder(dest.stream);
        const chunks: BlobPart[] = [];
        
        // Different effect types
        let duration = 0.5;
        let osc1Freq = 440;
        let osc2Freq = 880;
        let osc1Type: OscillatorType = 'sine';
        let osc2Type: OscillatorType = 'triangle';
        
        switch (type) {
          case 'enter':
            duration = 1.2;
            osc1Freq = 440;
            osc2Freq = 660;
            osc1Type = 'sine';
            osc2Type = 'triangle';
            break;
          case 'hover':
            duration = 0.3;
            osc1Freq = 880;
            osc2Freq = 1320;
            osc1Type = 'sine';
            osc2Type = 'sine';
            break;
          case 'click':
            duration = 0.2;
            osc1Freq = 220;
            osc2Freq = 440;
            osc1Type = 'square';
            osc2Type = 'triangle';
            break;
        }
        
        // Create oscillators
        const osc1 = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const gain1 = audioContext.createGain();
        const gain2 = audioContext.createGain();
        
        // Set properties
        osc1.type = osc1Type;
        osc2.type = osc2Type;
        osc1.frequency.value = osc1Freq;
        osc2.frequency.value = osc2Freq;
        
        // Connect oscillators to gains
        osc1.connect(gain1);
        osc2.connect(gain2);
        gain1.connect(masterGain);
        gain2.connect(masterGain);
        
        // Set initial gain values
        gain1.gain.value = 0.5;
        gain2.gain.value = 0.3;
        
        // Event handlers for the MediaRecorder
        mediaRecorder.ondataavailable = (evt: BlobEvent) => {
          chunks.push(evt.data);
        };
        
        mediaRecorder.onerror = (event) => {
          console.error("MediaRecorder error:", event);
          try { osc1.stop(); } catch(e) {}
          try { osc2.stop(); } catch(e) {}
          audioContext.close();
          resolve('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA='); // Silent audio as fallback
        };
        
        mediaRecorder.onstop = () => {
          try {
            const blob = new Blob(chunks, { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            resolve(url);
          } catch (e) {
            console.error("Error creating audio blob:", e);
            resolve('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA='); // Silent audio
          } finally {
            // Cleanup
            audioContext.close();
          }
        };
        
        // Start recording
        mediaRecorder.start();
        
        // Start oscillators
        osc1.start();
        osc2.start();
        
        try {
          // Create envelope
          switch (type) {
            case 'enter':
              // Sweep down for enter
              osc1.frequency.exponentialRampToValueAtTime(osc1Freq * 0.5, audioContext.currentTime + duration * 0.8);
              osc2.frequency.exponentialRampToValueAtTime(osc2Freq * 0.5, audioContext.currentTime + duration * 0.8);
              
              // Fade out
              gain1.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
              gain2.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
              break;
              
            case 'hover':
              // Quick sweep up for hover
              osc1.frequency.exponentialRampToValueAtTime(osc1Freq * 1.2, audioContext.currentTime + duration * 0.5);
              osc2.frequency.exponentialRampToValueAtTime(osc2Freq * 1.2, audioContext.currentTime + duration * 0.5);
              
              // Fast fade out
              gain1.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
              gain2.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
              break;
              
            case 'click':
              // Sharp attack for click
              gain1.gain.linearRampToValueAtTime(0.8, audioContext.currentTime + 0.01);
              gain2.gain.linearRampToValueAtTime(0.6, audioContext.currentTime + 0.01);
              
              // Quick decay
              gain1.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
              gain2.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
              break;
          }
        } catch (envelopeError) {
          console.error("Error setting audio envelope:", envelopeError);
        }
        
        // Stop recording and oscillators after duration
        setTimeout(() => {
          try {
            osc1.stop();
            osc2.stop();
            mediaRecorder.stop();
          } catch (e) {
            console.error("Error stopping audio:", e);
            audioContext.close();
            resolve('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA='); // Silent audio
          }
        }, duration * 1000);
      } catch (mediaError) {
        console.error("Media recording error:", mediaError);
        audioContext.close();
        resolve('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA='); // Silent audio as fallback
      }
    } catch (error) {
      console.error("Audio effect generation error:", error);
      resolve('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA='); // Silent audio
    }
  });
}