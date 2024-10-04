import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase'; // Make sure this imports your Firestore setup
import { useNavigate } from 'react-router-dom';

const LiveTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all tournaments from Firestore
  const fetchTournaments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'tournaments'));
      const tournamentList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTournaments(tournamentList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">All Live Tournaments</h2>
      {tournaments.length === 0 ? (
        <p>No tournaments available yet.</p>
      ) : (
        tournaments.map((tournament) => (
          <div
            key={tournament.id}
            className="mb-4 p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 flex items-center lg:mb-0"
            onClick={() => navigate(`/tournament/${tournament.id}`)} // Navigate to the tournament detail page
          >
            <img src={tournament.logo} alt="" className='h-28 lg:h-32 rounded-full mr-4'/>
            <div>
            <h3 className="text-xl font-bold">{tournament.tournamentName}</h3>
            <p><strong>City:</strong> {tournament.city}</p>
            <p><strong>Start Date:</strong> {tournament.startDate} to {tournament.endDate}</p>
          </div>
          </div>
        ))
      )}
    </div>
  );
};

export default LiveTournaments;
