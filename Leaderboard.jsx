import React, { useState, useEffect } from 'react';
import { useGame } from 'GameContext';

const Leaderboard = () => {
  const { clicks, clickPower, autoClickRate } = useGame();
  const [leaderboard, setLeaderboard] = useState([]);
  const [playerName, setPlayerName] = useState(localStorage.getItem('floppaPlayerName') || 'Player');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // Load leaderboard from localStorage or use default
    const savedLeaderboard = localStorage.getItem('floppaLeaderboard');
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    } else {
      // Default leaderboard with fictional players
      setLeaderboard([
        { name: 'FloopMaster', score: 95000, clickPower: 250, autoRate: 150 },
        { name: 'Caracal Fan', score: 42000, clickPower: 120, autoRate: 80 },
        { name: 'BigFloppa', score: 25000, clickPower: 75, autoRate: 50 },
        { name: 'CaracalKing', score: 10000, clickPower: 40, autoRate: 30 },
        { name: 'FloppaLover', score: 5000, clickPower: 20, autoRate: 15 },
      ]);
    }
  }, []);

  // Update player's position in leaderboard
  useEffect(() => {
    // Only update if player has scored points
    if (clicks > 0) {
      const currentPlayer = { name: playerName, score: clicks, clickPower, autoRate: autoClickRate };
      
      // Check if player already exists
      const newLeaderboard = leaderboard.filter(entry => entry.name !== playerName);
      newLeaderboard.push(currentPlayer);
      
      // Sort leaderboard by score
      newLeaderboard.sort((a, b) => b.score - a.score);
      
      // Keep only top 10 entries
      const topEntries = newLeaderboard.slice(0, 10);
      
      setLeaderboard(topEntries);
      localStorage.setItem('floppaLeaderboard', JSON.stringify(topEntries));
    }
  }, [clicks, clickPower, autoClickRate, playerName, leaderboard]);

  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
    localStorage.setItem('floppaPlayerName', e.target.value);
  };

  const handleNameSubmit = () => {
    setEditing(false);
  };

  return (
    <div style={{
      background: 'rgba(50, 30, 20, 0.85)',
      borderRadius: '12px',
      padding: '15px',
      width: '100%',
      maxWidth: '800px',
      marginBottom: '15px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
      border: '2px solid #ff9d00'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
        borderBottom: '2px solid #ff9d00',
        paddingBottom: '8px'
      }}>
        <h3 style={{ 
          color: '#ff9d00', 
          margin: 0,
          textShadow: '0 0 5px rgba(255, 157, 0, 0.5)'
        }}>
          Global Floppa Leaderboard
        </h3>
        <div>
          {editing ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                value={playerName}
                onChange={handleNameChange}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid #ff9d00',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  color: 'white',
                  marginRight: '5px'
                }}
              />
              <button 
                onClick={handleNameSubmit}
                style={{
                  background: '#ff9d00',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  color: '#321e14',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Save
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: 'white', marginRight: '10px' }}>Playing as: {playerName}</span>
              <button 
                onClick={() => setEditing(true)}
                style={{
                  background: 'rgba(255, 157, 0, 0.2)',
                  border: '1px solid #ff9d00',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  color: '#ff9d00',
                  cursor: 'pointer'
                }}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(20px, 40px) minmax(120px, 1fr) repeat(3, minmax(80px, 1fr))',
        gap: '10px',
        marginBottom: '8px',
        padding: '0 10px',
        color: '#ff9d00',
        fontWeight: 'bold'
      }}>
        <div>#</div>
        <div>Player</div>
        <div style={{ textAlign: 'right' }}>Score</div>
        <div style={{ textAlign: 'right' }}>Click Power</div>
        <div style={{ textAlign: 'right' }}>Auto Clicks</div>
      </div>
      
      <div style={{ 
        maxHeight: '200px', 
        overflowY: 'auto',
        padding: '0 5px'
      }}>
        {leaderboard.map((entry, index) => {
          const isCurrentPlayer = entry.name === playerName;
          return (
            <div 
              key={index}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(20px, 40px) minmax(120px, 1fr) repeat(3, minmax(80px, 1fr))',
                gap: '10px',
                padding: '8px 5px',
                borderRadius: '6px',
                marginBottom: '4px',
                background: isCurrentPlayer 
                  ? 'linear-gradient(90deg, rgba(255, 157, 0, 0.3), rgba(255, 157, 0, 0.1))' 
                  : 'rgba(255, 255, 255, 0.05)',
                border: isCurrentPlayer ? '1px solid rgba(255, 157, 0, 0.5)' : '1px solid transparent',
                color: isCurrentPlayer ? '#fff' : 'rgba(255, 255, 255, 0.8)'
              }}
            >
              <div>{index + 1}</div>
              <div style={{ 
                fontWeight: isCurrentPlayer ? 'bold' : 'normal',
                color: isCurrentPlayer ? '#ff9d00' : 'inherit'
              }}>
                {entry.name}
                {isCurrentPlayer && ' (You)'}
              </div>
              <div style={{ textAlign: 'right' }}>{entry.score.toLocaleString()}</div>
              <div style={{ textAlign: 'right' }}>{entry.clickPower}</div>
              <div style={{ textAlign: 'right' }}>{entry.autoRate}/s</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
