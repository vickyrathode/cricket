import React, { useState, useEffect } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const OrganiserAdmin = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Correct usage of useNavigate hook
  const [user, setUser] = useState(null); // To store authenticated user

  // Step 1: Listen for auth state changes and set the user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set authenticated user
      } else {
        console.error("No user signed in.");
      }
    });

    return () => unsubscribe();
  }, []);

  // Step 2: Fetch tournaments created by the logged-in user
  const fetchTournaments = async () => {
    try {
      if (user) {
        // Query Firestore for tournaments where 'organizerId' matches the logged-in user's uid
        const q = query(collection(db, 'tournaments'), where('organizerId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const tournamentList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTournaments(tournamentList);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
      setLoading(false);
    }
  };

  // Step 3: Fetch tournaments when the user is available
  useEffect(() => {
    if (user) {
      fetchTournaments(); // Fetch tournaments when user is available
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Your Tournaments</h2>
      {tournaments.length === 0 ? (
        <p>No tournaments created yet.</p>
      ) : (
        tournaments.map((tournament) => (
          <div
            key={tournament.id}
            className="mb-4 p-4 bg-gray-100 rounded-lg flex items-center lg:mb-0 cursor-pointer"
            onClick={() => navigate(`/tournament/${tournament.id}`)} // Navigate to tournament detail page
          >
            <img src={tournament.logo} alt="Logo" className='h-28 lg:h-32 rounded-full mr-4'/>
            <div>
              <h3 className="text-xl font-bold">{tournament.tournamentName}</h3>
              <p><strong>City:</strong> {tournament.city}</p>
              <p><strong>Start Date:</strong> {tournament.startDate} to {tournament.endDate}</p>
            </div>  
          </div>
        ))
      )}
      <button
        onClick={() => navigate('/add-tournament')} // Corrected navigation to add tournament
        className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
      >
        Add a New Tournament
      </button>
    </div>
  );
};

export default OrganiserAdmin;
