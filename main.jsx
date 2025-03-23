import React from 'react';
import ReactDOM from 'react-dom/client';
import Game from 'Game';
import { GameProvider } from 'GameContext';

const App = () => {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
};

// Add global styles
const styleElement = document.createElement('style');
styleElement.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Russo+One&family=Orbitron:wght@400;700&display=swap');
  
  html, body, #renderDiv {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #2a1a12;
    color: #ffffff;
  }
  
  * {
    box-sizing: border-box;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #ff9d00;
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #ff7700;
  }
  
  /* Add text selection color */
  ::selection {
    background: #ff9d00;
    color: #000;
  }
`;
document.head.appendChild(styleElement);
const container = document.getElementById('renderDiv');
const root = ReactDOM.createRoot(container);
root.render(<App />);
