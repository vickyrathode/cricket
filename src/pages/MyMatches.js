import React from 'react';
import { playerMatches } from '../dummyData';

const MyMatches = () => {
  return (
    <div className="container mx-auto p-4 m-6 bg-slate-100 rounded">
      <h2 className="text-xl font-bold mb-4">My Matches</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {playerMatches.map((match) => (
          <div key={match.id} className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-600">
              <strong>Tournament:</strong> {match.tournament}
            </p>
            <p className="text-gray-600">
              <strong>Venue:</strong> {match.venue}
            </p>
            <p className="text-gray-600">
              <strong>Date:</strong> {match.date}
            </p>
            <div className="flex justify-between my-2">
              <div>
                <p className="font-semibold">Team 1: {match.team1}</p>
                <p className="text-sm">Score: {match.team1Score.runs}/{match.team1Score.wickets} in {match.team1Score.overs} overs</p>
              </div>
              <div>
                <p className="font-semibold">Team 2: {match.team2}</p>
                <p className="text-sm">Score: {match.team2Score.runs}/{match.team2Score.wickets} in {match.team2Score.overs} overs</p>
              </div>
            </div>
            <p className="text-gray-500">Result: {match.result}</p>
            <p className={`text-sm ${match.status === 'Live' ? 'text-red-500' : 'text-green-500'}`}>{match.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyMatches;

