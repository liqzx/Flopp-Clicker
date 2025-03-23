import React from 'react';
import { useGame } from 'GameContext';
import FloppaImage from 'FloppaImage';
import UpgradeShop from 'UpgradeShop';
import Tips from 'Tips';
import Leaderboard from 'Leaderboard';

const Game = () => {
  const { clicks, handleClick, clickPower, autoClickRate, resetGame, sound } = useGame();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0',
      margin: '0',
      fontFamily: '"Russo One", "Orbitron", sans-serif',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      position: 'relative',
      boxSizing: 'border-box'
    }}>
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(https://play.rosebud.ai/assets/animated%20cartoon%20background%20with%20floppa%20falling.png?PMZv)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.8,
          zIndex: -1,
          filter: 'blur(3px) brightness(0.8)'
        }}
      />
      <Tips /> 
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        width: '100%', 
        maxWidth: '800px',
        padding: '10px 20px',
        boxSizing: 'border-box'
      }}>
        <h1 style={{ color: '#5d4037', textShadow: '2px 2px 0px #e6ccb2' }}>Floppa Clicker</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => {
              if (!sound.audioInitialized) {
                sound.initializeAudio();
              }
              sound.toggleMute();
            }}
            style={{
              background: '#8d6e63',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {sound.muted ? '🔇' : '🔊'}
          </button>
          <button 
            onClick={resetGame} 
            style={{
              background: '#a1887f',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            Reset Game
          </button>
        </div>
      </div>
      
      <div style={{ 
        background: 'rgba(237, 220, 210, 0.9)', 
        borderRadius: '15px', 
        boxShadow: '0 4px 12px rgba(101, 67, 33, 0.25)',
        padding: '20px',
        width: '95%',
        maxWidth: '800px',
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <h2 style={{ color: '#6d4c41', margin: '5px' }}>
            {clicks.toLocaleString()} Floppa Points
          </h2>
          <div style={{ fontSize: '14px', color: '#8d6e63' }}>
            <span>Click Power: {clickPower}</span>
            <span style={{ margin: '0 10px' }}>|</span>
            <span>Auto-Clicks: {autoClickRate}/second</span>
          </div>
        </div>
        <div style={{ 
          display: 'flex', 
          width: '100%', 
          gap: '20px',
          flexDirection: window.innerWidth < 600 ? 'column' : 'row'
        }}>
          <div style={{ 
            flex: '1', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}>
            <FloppaImage onClick={handleClick} clickPower={clickPower} />
          </div>
          
          <div style={{ 
            flex: '1',
            maxHeight: window.innerWidth < 600 ? 'auto' : '300px',
            overflowY: window.innerWidth < 600 ? 'visible' : 'auto'
          }}>
            <h3 style={{ color: '#6d4c41', borderBottom: '2px dashed #ddbea9', paddingBottom: '5px' }}>Upgrades</h3>
            <UpgradeShop />
          </div>
        </div>
      </div>
      <Leaderboard />
    </div>
  );
};

export default Game;
