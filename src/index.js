import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import LearnKana from './LearnKana';
import Dictionary from './Dictionary';
import './index.css';

const sideMenuStyles = {
  width: '200px',
  backgroundColor: '#1e1e2f', // Dark background for the side menu
  padding: '20px',
  borderRight: '1px solid #333',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100vh',
  boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
};

const buttonStyles = {
  marginBottom: '15px',
  width: '100%',
  padding: '10px 20px',
  backgroundColor: '#2e2e3e', // Darker button background
  color: '#ccc', // Light text color
  border: '1px solid #444',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
  textAlign: 'center',
  transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
};

const activeButtonStyles = {
  ...buttonStyles,
  backgroundColor: '#007bff', // Highlighted blue for active button
  color: '#ffffff',
  border: '1px solid #0056b3',
};

const VIEWS = {
  DICTIONARY: 'DICTIONARY',
  LEARN_KANA: 'LEARN_KANA',
};

const RootComponent = () => {
  const [activeView, setActiveView] = useState(VIEWS.LEARN_KANA);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#121212', color: '#ccc', height: '100vh' }}>
      {/* Side Menu */}
      <div style={sideMenuStyles}>
        <h2 style={{ color: '#ffffff', marginBottom: '20px' }}>Menu</h2>
        <button
          style={activeView === VIEWS.LEARN_KANA ? activeButtonStyles : buttonStyles}
          onClick={() => setActiveView(VIEWS.LEARN_KANA)}
        >
          HiraKana
        </button>
        <button
          style={activeView === VIEWS.DICTIONARY ? activeButtonStyles : buttonStyles}
          onClick={() => setActiveView(VIEWS.DICTIONARY)}
        >
          Dictionary
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#1e1e2f', borderRadius: '10px' }}>
        {activeView === VIEWS.DICTIONARY && <Dictionary />}
        {activeView === VIEWS.LEARN_KANA && <LearnKana />}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);