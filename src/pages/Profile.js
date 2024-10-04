import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'; // Assuming Firestore and Auth are set up
import { doc, getDoc } from 'firebase/firestore';
import Matches from './Matches';
import Stats from './Stats';
import Team from './Team';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('matches'); // Default to Matches tab
  const [profileData, setProfileData] = useState(null);  // State to store the profile data
  const [loading, setLoading] = useState(true);          // Loading state
  const [error, setError] = useState(null);              // Error state

  // Fetch user data from Firestore based on authenticated user
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, 'registered', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfileData(docSnap.data());
          } else {
            setError('No profile data found....! Register first');
          }
        }
      } catch (err) {
        setError('Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 my-8">
      {/* Profile Section */}
      <div className="bg-red-600 text-white p-6 flex flex-col lg:flex-row items-center justify-between rounded-lg shadow-lg">
        <div className="flex items-center mb-4 lg:mb-0">
          <img
            src={profileData.profileImage || '/images/default-profile.jpg'}  // Display user's profile image or a default one
            alt="Profile"
            className="h-28 lg:h-32 rounded-full mr-4"
          />
          <div>
            <h2 className="text-xl font-bold">{profileData.name || 'Unknown Player'}</h2>
            <p>{profileData.location || 'Location not set'} • {profileData.views || 0} Views</p>
            <p>{profileData.battingHand || 'N/A'} Batsman</p>
            <p>{profileData.bowlingHand || 'N/A'} Bowler</p>
            {profileData.allRounder && <p>All-Rounder</p>}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4 lg:mt-0">
          <div className="text-center">
            <p className="text-4xl font-bold">{profileData.matchesPlayed || 0}</p>
            <span>Matches</span>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">{profileData.runs || 0}</p>
            <span>Runs</span>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">{profileData.wickets || 0}</p>
            <span>Wickets</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mt-6">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('matches')}
            className={`p-4 font-semibold ${activeTab === 'matches' ? 'border-b-2 border-yellow-400' : ''}`}>
            MATCHES
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`p-4 font-semibold ${activeTab === 'stats' ? 'border-b-2 border-yellow-400' : ''}`}>
            STATS
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`p-4 font-semibold ${activeTab === 'team' ? 'border-b-2 border-yellow-400' : ''}`}>
            TEAM
          </button>
          {/* Add more tabs as needed */}
        </div>
      </div>

      {/* Conditional Rendering based on Tab */}
      <div className="my-8">
        {activeTab === 'matches' && <Matches />}
        {activeTab === 'stats' && <Stats />}
        {activeTab === 'team' && <Team />}
      </div>
    </div>
  );
};

export default Profile;
