// src/pages/Stats.js
import React from 'react';
import { playerStats } from '../dummyData';

const Stats = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Player Stats</h2>
      <div className="grid grid-cols-6 gap-4">
        {Object.entries(playerStats).map(([key, value]) => (
          <div key={key} className="border p-4 rounded-lg bg-white shadow">
            <p className="text-lg">{value}</p>
            <h3 className="font-semibold">{key.replace(/([A-Z])/g, ' $1')}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
