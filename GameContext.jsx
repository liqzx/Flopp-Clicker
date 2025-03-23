import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import SoundEffects from 'SoundEffects';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  // Load saved data from localStorage or use defaults
  const loadGameData = () => {
    const savedData = localStorage.getItem('floppaClickerData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return {
      clicks: 0,
      autoClickRate: 0,
      clickPower: 1,
      upgrades: [
        { id: 1, name: "Floppa Treats", cost: 10, multiplier: 1, owned: 0, description: "Each treat gives +1 click power" },
        { id: 2, name: "Floppa Friend", cost: 50, multiplier: 1, owned: 0, description: "Each friend clicks once per second" },
        { id: 3, name: "Floppa Nap", cost: 200, multiplier: 5, owned: 0, description: "Each nap increases click power by 5" },
        { id: 4, name: "Floppa Toy", cost: 100, multiplier: 2, owned: 0, description: "Each toy gives +2 click power" },
        { id: 5, name: "Floppa Party", cost: 500, multiplier: 5, owned: 0, description: "Each party adds 5 clicks per second" },
        { id: 6, name: "Floppa Mansion", cost: 1000, multiplier: 10, owned: 0, description: "Each mansion gives +10 click power" },
        { id: 7, name: "Floppa College", cost: 2000, multiplier: 15, owned: 0, description: "Each college adds 15 clicks per second" },
        { id: 8, name: "Floppa Magic", cost: 5000, multiplier: 50, owned: 0, description: "Each magic spell gives +50 click power" },
        { id: 9, name: "Floppa Factory", cost: 10000, multiplier: 100, owned: 0, description: "Each factory adds 100 clicks per second" },
        { id: 10, name: "Floppa Universe", cost: 50000, multiplier: 500, owned: 0, description: "Each universe gives +500 click power" }
      ]
    };
  };
  const gameData = loadGameData();
  const [clicks, setClicks] = useState(gameData.clicks);
  const [autoClickRate, setAutoClickRate] = useState(gameData.autoClickRate);
  const [clickPower, setClickPower] = useState(gameData.clickPower);
  const [upgrades, setUpgrades] = useState(gameData.upgrades);
  const sound = SoundEffects();

  const handleClick = () => {
    if (!sound.audioInitialized) {
      sound.initializeAudio();
    }
    sound.playMeow();
    
    setClicks(prev => prev + clickPower);
  };

  const buyUpgrade = (id) => {
    const upgrade = upgrades.find(u => u.id === id);
    
    if (clicks >= upgrade.cost) {
      setClicks(prev => prev - upgrade.cost);
      
      setUpgrades(prev => prev.map(u => {
        if (u.id === id) {
          const newOwned = u.owned + 1;
          return {
            ...u, 
            owned: newOwned, 
            cost: Math.floor(u.cost * 1.5)
          };
        }
        return u;
      }));

      if (id === 1 || id === 3 || id === 4 || id === 6 || id === 8 || id === 10) {
        setClickPower(prev => prev + upgrade.multiplier);
      } else if (id === 2 || id === 5 || id === 7 || id === 9) {
        setAutoClickRate(prev => prev + upgrade.multiplier);
      }
    }
  };

  // Auto-clicker effect
  useEffect(() => {
    if (autoClickRate > 0) {
      const interval = setInterval(() => {
        setClicks(prev => prev + autoClickRate);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoClickRate]);
  // Save game data whenever state changes
  useEffect(() => {
    const gameData = {
      clicks,
      autoClickRate,
      clickPower,
      upgrades
    };
    localStorage.setItem('floppaClickerData', JSON.stringify(gameData));
  }, [clicks, autoClickRate, clickPower, upgrades]);
  // Reset game function
  const resetGame = () => {
    setClicks(0);
    setAutoClickRate(0);
    setClickPower(1);
    setUpgrades([
      { id: 1, name: "Floppa Treats", cost: 10, multiplier: 1, owned: 0, description: "Each treat gives +1 click power" },
      { id: 2, name: "Floppa Friend", cost: 50, multiplier: 1, owned: 0, description: "Each friend clicks once per second" },
      { id: 3, name: "Floppa Nap", cost: 200, multiplier: 5, owned: 0, description: "Each nap increases click power by 5" },
      { id: 4, name: "Floppa Toy", cost: 100, multiplier: 2, owned: 0, description: "Each toy gives +2 click power" },
      { id: 5, name: "Floppa Party", cost: 500, multiplier: 5, owned: 0, description: "Each party adds 5 clicks per second" },
      { id: 6, name: "Floppa Mansion", cost: 1000, multiplier: 10, owned: 0, description: "Each mansion gives +10 click power" },
      { id: 7, name: "Floppa College", cost: 2000, multiplier: 15, owned: 0, description: "Each college adds 15 clicks per second" },
      { id: 8, name: "Floppa Magic", cost: 5000, multiplier: 50, owned: 0, description: "Each magic spell gives +50 click power" },
      { id: 9, name: "Floppa Factory", cost: 10000, multiplier: 100, owned: 0, description: "Each factory adds 100 clicks per second" },
      { id: 10, name: "Floppa Universe", cost: 50000, multiplier: 500, owned: 0, description: "Each universe gives +500 click power" }
    ]);
    localStorage.removeItem('floppaClickerData');
  };
  return (
    <GameContext.Provider value={{ 
      clicks, 
      handleClick, 
      buyUpgrade, 
      upgrades, 
      clickPower, 
      autoClickRate,
      resetGame,
      sound
    }}>
      {children}
    </GameContext.Provider>
  );
};
