import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore'; // Import Firestore methods
import { db } from '../firebase'; // Import your Firestore instance

const MyTournaments = () => {
  const [tournaments, setTournaments] = useState([]); // State to hold the tournaments data
  const [loading, setLoading] = useState(true); // State to track loading status

  // Fetch tournaments from Firestore
  const fetchTournaments = async () => {
    try {
      // Reference to the 'tournaments' collection in Firestore
      const querySnapshot = await getDocs(collection(db, 'tournaments'));

      // Mapping through the documents to create an array of tournament data
      const tournamentList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTournaments(tournamentList); // Store the fetched data in state
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error('Error fetching tournaments: ', error);
      setLoading(false);
    }
  };

  // Fetch the tournaments when the component mounts
  useEffect(() => {
    fetchTournaments();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  return (
    <div className="container mx-auto p-4 m-6 bg-slate-100 rounded">
      <h2 className="text-xl font-bold mb-4">My Tournaments</h2>

      {/* Display tournaments */}
      {tournaments.length === 0 ? (
        <p>No tournaments found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tournaments.map(tournament => (
            <div key={tournament.id} className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-sm text-green-500">Completed</p>
              <div className="flex">
                {tournament.logo && (
                  <img src={tournament.logo} alt="logo" className="h-24" />
                )}
                <div className="ml-4">
                  <p className="text-gray-600">
                    <strong>{tournament.tournamentName}</strong>
                  </p>
                  <p className="text-gray-600">
                    <strong>Venue:</strong> {tournament.ground}
                  </p>
                  <p className="text-gray-600">
                    {tournament.startDate} <strong>To</strong> {tournament.endDate}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTournaments;
