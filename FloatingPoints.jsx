import React, { useState, useEffect } from 'react';

const FloatingPoints = ({ amount, position }) => {
  const [animation, setAnimation] = useState({
    opacity: 1,
    y: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimation({
        opacity: 0,
        y: -50,
      });
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        color: '#ff8f00',
        fontWeight: 'bold',
        fontSize: '18px',
        textShadow: '0 0 3px #fff, 0 0 5px #fff',
        transform: `translateY(${animation.y}px)`,
        opacity: animation.opacity,
        transition: 'transform 1s ease-out, opacity 1s ease-out',
        pointerEvents: 'none',
        zIndex: 100,
      }}
    >
      +{amount}
    </div>
  );
};

export default FloatingPoints;
