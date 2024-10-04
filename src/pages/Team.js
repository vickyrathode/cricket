import React from 'react';
import { playerteam } from '../dummyData';

function Team() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Player Matches</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {playerteam.map((team) => (
          <div key={team.id} className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-600">
              <strong>Venue:</strong> {team.team}
            </p>
            <p className="text-gray-600">
              <strong>Date:</strong> {team.date}
            </p>
            <div className="flex justify-between my-2">
              <div>
                <p className="font-semibold">Played: {team.played}</p>
              </div>
              <div>
                <p className="font-semibold">Wins: {team.win}</p>
              </div>
            </div>
            <p className="text-gray-500">Losses: {team.loss}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;

