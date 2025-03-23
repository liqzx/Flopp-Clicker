import React from 'react';
import { useGame } from 'GameContext';

const UpgradeShop = () => {
  const { upgrades, buyUpgrade, clicks } = useGame();

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '10px',
      marginTop: '10px',
      maxHeight: '400px',
      overflowY: 'auto'
    }}>
      {upgrades.map(upgrade => (
        <div 
          key={upgrade.id} 
          onClick={() => buyUpgrade(upgrade.id)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 15px',
            background: clicks >= upgrade.cost ? '#d7b29d' : '#d7ccc8',
            borderRadius: '8px',
            cursor: clicks >= upgrade.cost ? 'pointer' : 'not-allowed',
            opacity: clicks >= upgrade.cost ? 1 : 0.7,
            transition: 'transform 0.1s, background 0.2s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            ':hover': {
              transform: clicks >= upgrade.cost ? 'translateY(-2px)' : 'none',
            }
          }}
        >
          <div>
            <div style={{ fontWeight: 'bold', color: '#5d4037' }}>{upgrade.name}</div>
            <div style={{ fontSize: '12px', color: '#8d6e63' }}>{upgrade.description}</div>
            <div style={{ fontSize: '12px', color: '#a1887f' }}>Owned: {upgrade.owned}</div>
          </div>
          <div style={{ 
            fontWeight: 'bold', 
            color: clicks >= upgrade.cost ? '#43a047' : '#757575',
            fontSize: '14px'
          }}>
            {upgrade.cost} points
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpgradeShop;
