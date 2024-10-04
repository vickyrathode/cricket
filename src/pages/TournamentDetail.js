import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from '../firebase';

const TournamentDetail = () => {
  const { id } = useParams(); // Get the tournament ID from the URL
  const [tournament, setTournament] = useState(null);
  const [activeTab, setActiveTab] = useState('schedule'); // Default tab is "schedule"
  const [loading, setLoading] = useState(true);
  const [isOrganizer, setIsOrganizer] = useState(false); // Check if the user is the organizer
  const [teamName, setTeamName] = useState(''); // For registering teams

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const docRef = doc(db, 'tournaments', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const tournamentData = docSnap.data();
          setTournament(tournamentData);

          // Check if the logged-in user is the tournament organizer
          const user = auth.currentUser;
          if (user && user.uid === tournamentData.organizerId) {
            setIsOrganizer(true);
          }
        } else {
          console.log('No such document!');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tournament details:', error);
        setLoading(false);
      }
    };

    fetchTournament();
  }, [id]);

  const registerTeam = async (e) => {
    e.preventDefault();
    try {
      const tournamentRef = doc(db, 'tournaments', id);
      await updateDoc(tournamentRef, {
        teams: arrayUnion({ teamName, registeredBy: auth.currentUser.uid }),
      });
      alert('Team registered successfully!');
      setTeamName(''); // Reset the form
    } catch (error) {
      console.error('Error registering team:', error);
      alert('Failed to register the team. Please check your permissions.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!tournament) {
    return <div>No tournament found!</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">{tournament.tournamentName}</h2>
      <p><strong>City:</strong> {tournament.city}</p>
      <p><strong>Start Date:</strong> {tournament.startDate} to {tournament.endDate}</p>

      {/* Team Registration Button */}
      {!isOrganizer && (
        <form onSubmit={registerTeam} className="mt-4 mb-6">
          <h3 className="text-xl font-bold mb-4">Register Your Team</h3>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Team Name"
            className="border rounded p-2 mr-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Register Team
          </button>
        </form>
      )}

      {/* Tab Navigation */}
      <div className="mt-6 flex space-x-6 border-b">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`p-4 font-semibold ${activeTab === 'schedule' ? 'border-b-2 border-yellow-400' : ''}`}
        >
          Match Schedule
        </button>
        <button
          onClick={() => setActiveTab('teams')}
          className={`p-4 font-semibold ${activeTab === 'teams' ? 'border-b-2 border-yellow-400' : ''}`}
        >
          Teams
        </button>
        <button
          onClick={() => setActiveTab('points')}
          className={`p-4 font-semibold ${activeTab === 'points' ? 'border-b-2 border-yellow-400' : ''}`}
        >
          Points Table
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`p-4 font-semibold ${activeTab === 'leaderboard' ? 'border-b-2 border-yellow-400' : ''}`}
        >
          Leader Board
        </button>
      </div>

      {/* Conditional Rendering based on Active Tab */}
      <div className="my-8">
        {activeTab === 'schedule' && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Match Schedule</h3>
            <ul>
              <li>Match 1: Team A vs Team B - Date: 01/01/2023</li>
              <li>Match 2: Team C vs Team D - Date: 02/01/2023</li>
            </ul>
          </div>
        )}

        {activeTab === 'teams' && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Teams</h3>
            <ul>
              {tournament.teams && tournament.teams.length > 0 ? (
                tournament.teams.map((team, index) => (
                  <li key={index}>{team.teamName}</li>
                ))
              ) : (
                <p>No teams registered yet.</p>
              )}
            </ul>
          </div>
        )}

        {activeTab === 'points' && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Points Table</h3>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Team</th>
                  <th className="px-4 py-2">Matches Played</th>
                  <th className="px-4 py-2">Points</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Team A</td>
                  <td className="border px-4 py-2">3</td>
                  <td className="border px-4 py-2">6</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Team B</td>
                  <td className="border px-4 py-2">3</td>
                  <td className="border px-4 py-2">4</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Leaderboard */}
        {activeTab === 'leaderboard' && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Leader Board</h3>
            <ul>
              <li>Player 1</li>
              <li>Player 2</li>
              <li>Player 3</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentDetail;
