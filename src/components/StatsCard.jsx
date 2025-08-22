import React from 'react';
import './StatsCard.css';

const StatsCard = ({ title, value }) => {
  return (
    <div className="stats-card">
      <h3 className="stats-title">{title}</h3>
      <p className="stats-value">{value}</p>
    </div>
  );
};

export default StatsCard;

