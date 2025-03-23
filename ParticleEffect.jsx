import React, { useState, useEffect, useRef } from 'react';

const ParticleEffect = ({ position, onClick }) => {
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);
  
  const createParticles = (x, y) => {
    const newParticles = [];
    const particleTypes = ['✨', '💖', '⭐', '✌️', '🎮', '🔥'];
    
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3;
      const size = 10 + Math.random() * 15;
      const lifetime = 500 + Math.random() * 1000;
      const particleType = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size,
        lifetime,
        type: particleType,
        opacity: 1
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
    
    // Remove particles after their lifetime
    newParticles.forEach(particle => {
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== particle.id));
      }, particle.lifetime);
    });
  };
  
  // Update particle positions
  useEffect(() => {
    if (particles.length === 0) return;
    
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.05, // Add gravity
          opacity: particle.opacity - 0.02 // Fade out
        }))
      );
    }, 16);
    
    return () => clearInterval(interval);
  }, [particles]);
  
  return (
    <div 
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10
      }}
      onClick={(e) => {
        const rect = containerRef.current.getBoundingClientRect();
        createParticles(e.clientX - rect.left, e.clientY - rect.top);
        if (onClick) onClick(e);
      }}
    >
      {particles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: particle.x,
            top: particle.y,
            fontSize: `${particle.size}px`,
            opacity: particle.opacity,
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {particle.type}
        </div>
      ))}
    </div>
  );
};

export default ParticleEffect;
