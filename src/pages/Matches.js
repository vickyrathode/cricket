import React from 'react';
import { playerMatches } from '../dummyData';

const Matches = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Player Matches</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {playerMatches.map((match) => (
          <div key={match.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2">{match.tournament}</h3>
            <p className="text-gray-600">
              <strong>Venue:</strong> {match.venue}
            </p>
            <p className="text-gray-600">
              <strong>Date:</strong> {match.date}
            </p>
            <div className="flex justify-between my-2">
              <div>
                <p className="font-semibold">{match.team1}</p>
                <p>{match.team1Score.runs}/{match.team1Score.wickets} ({match.team1Score.overs} ov)</p>
              </div>
              <div>
                <p className="font-semibold">{match.team2}</p>
                <p>{match.team2Score.runs}/{match.team2Score.wickets} ({match.team2Score.overs} ov)</p>
              </div>
            </div>
            <p className="font-semibold text-green-600">{match.result}</p>
            <p className="text-gray-500">{match.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matches;
