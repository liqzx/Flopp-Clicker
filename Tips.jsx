import React, { useState, useEffect } from 'react';

const tips = [
  "Click on Floppa to earn points!",
  "Upgrades help you earn more points faster",
  "Floppa Treats increase your click power",
  "Floppa Friends automatically click for you",
  "The more upgrades you buy, the more expensive they get",
  "Floppa loves when you click on him!"
];

const Tips = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [fadeState, setFadeState] = useState('in');
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade out
      setFadeState('out');
      
      // After fade out completes, change tip and fade in
      setTimeout(() => {
        setCurrentTip((prev) => (prev + 1) % tips.length);
        setFadeState('in');
      }, 1000);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div style={{
      position: 'relative',
      margin: '10px auto',
      background: 'rgba(50, 30, 20, 0.85)',
      padding: '10px 20px',
      borderRadius: '20px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
      opacity: fadeState === 'in' ? 1 : 0,
      transition: 'opacity 1s ease',
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#ff9d00',
      maxWidth: '800px',
      width: '95%',
      border: '1px solid #ff9d00'
    }}>
      <span>💡</span> {tips[currentTip]}
    </div>
  );
};

export default Tips;
