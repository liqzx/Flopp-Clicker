import React, { useEffect, useRef, useState } from 'react';

const SoundEffects = () => {
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [muted, setMuted] = useState(false);
  const meowSoundRef = useRef(null);
  const bgMusicRef = useRef(null);
  
  // Initialize audio on first user interaction
  const initializeAudio = () => {
    if (!audioInitialized) {
      // Create meow sound using Web Audio API
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Simple synthesized meow sound
      const createMeow = () => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
      };
      
      meowSoundRef.current = createMeow;
      
      // Create background lofi music
      const bgMusic = new Audio();
      bgMusic.src = 'https://cdn.pixabay.com/download/audio/2022/10/11/audio_94128b587d.mp3'; // Lo-fi beats royalty-free
      bgMusic.loop = true;
      bgMusic.volume = 0.3;
      bgMusicRef.current = bgMusic;
      
      setAudioInitialized(true);
    }
  };
  
  // Play meow sound
  const playMeow = () => {
    if (audioInitialized && !muted && meowSoundRef.current) {
      meowSoundRef.current();
    }
  };
  
  // Toggle mute all sounds
  const toggleMute = () => {
    if (bgMusicRef.current) {
      if (muted) {
        bgMusicRef.current.volume = 0.3;
      } else {
        bgMusicRef.current.volume = 0;
      }
    }
    setMuted(!muted);
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
    };
  }, []);
  
  return {
    initializeAudio,
    playMeow,
    toggleMute,
    muted
  };
};

export default SoundEffects;
