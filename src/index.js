import React from 'react';
import ReactDOM from 'react-dom/client';
import LearnKana from './LearnKana'; // Import the LearnKana component instead of App
import './index.css';
import Dictionary from './Dictionary';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <Dictionary />
    <LearnKana />
  </div>
);
