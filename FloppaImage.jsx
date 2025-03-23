import React, { useState, useRef, useEffect } from 'react';
import FloatingPoints from 'FloatingPoints';
import ParticleEffect from 'ParticleEffect';

const FloppaImage = ({ onClick, clickPower }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [floatingPoints, setFloatingPoints] = useState([]);
  const containerRef = useRef(null);
  
  const handleClick = (e) => {
    setIsClicked(true);
    onClick();
    
    // Add vibration effect for mobile devices
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
    
    // Create floating point at click position
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newPoint = {
      id: Date.now(),
      amount: clickPower,
      position: { x, y }
    };
    
    setFloatingPoints(prev => [...prev, newPoint]);
    
    // Remove point after animation completes
    setTimeout(() => {
      setFloatingPoints(prev => prev.filter(point => point.id !== newPoint.id));
    }, 1000);
    
    setTimeout(() => setIsClicked(false), 150);
  };
  // Add pulsing effect
  const [pulseEffect, setPulseEffect] = useState(1);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseEffect(prev => 0.97 + Math.sin(Date.now() / 500) * 0.03);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        transition: 'transform 0.15s, box-shadow 0.15s',
        transform: isClicked ? 'scale(0.95)' : `scale(${pulseEffect})`,
        position: 'relative',
        width: '220px',
        height: '220px',
        background: 'linear-gradient(135deg, #ffd699, #e8d6c9)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: isClicked 
          ? '0 2px 5px rgba(0,0,0,0.2), inset 0 0 10px rgba(255,255,255,0.5)' 
          : '0 4px 15px rgba(0,0,0,0.3), inset 0 0 20px rgba(255,255,255,0.8), 0 0 30px rgba(255, 200, 100, 0.5)',
        overflow: 'hidden',
      }}
    >
      <img 
        src="https://play.rosebud.ai/assets/floppa.jpg?w4mT"
        alt="Floppa"
        style={{
          width: '200px',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '50%',
          transform: isClicked ? 'scale(0.95)' : 'scale(1)',
          transition: 'transform 0.15s',
          filter: 'drop-shadow(0 0 5px rgba(255, 217, 102, 0.7))',
          border: '3px solid rgba(255, 255, 255, 0.7)',
        }}
      />
      {floatingPoints.map(point => (
        <FloatingPoints 
          key={point.id} 
          amount={point.amount} 
          position={point.position} 
        />
      ))}
      <ParticleEffect />
    </div>
  );
};

export default FloppaImage;
