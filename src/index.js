import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import LearnKana from './LearnKana'; // Import the LearnKana component instead of App
import './index.css';
import Dictionary from './Dictionary';

const sideMenuStyles = {
  width: '100px',
  backgroundColor: '#f0f0f0',
  padding: '10px',
  borderRight: '1px solid #ccc',
};

const buttonStyles = {
  marginBottom: '10px',
  width: '100%',
};


const RootComponent = () => {
  const [showDictionary, setShowDictionary] = useState(false);
  const [showLearnKana, setShowLearnKana] = useState(true);

  const handleShowDictionary = () => {
    setShowDictionary(true);
    setShowLearnKana(false);
  };

  const handleShowLearnKana = () => {
    setShowLearnKana(true);
    setShowDictionary(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={sideMenuStyles}>
        <button style={buttonStyles} onClick={handleShowDictionary}>Dictionary</button>
        <button style={buttonStyles} onClick={handleShowLearnKana}>HiraKana</button>
      </div>
      <div style={{ flex: 1 }}>
        {showDictionary && <Dictionary />}
        {showLearnKana && <LearnKana />}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RootComponent />);
