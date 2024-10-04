// src/components/AddTournament.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../firebase'; // Ensure Firebase Storage is imported
import { addDoc, collection } from 'firebase/firestore'; // Firestore functions
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage functions

const AddTournament = () => {
  const navigate = useNavigate();
  const user = auth.currentUser; // Ensure user is authenticated

  // Form state
  const [tournamentName, setTournamentName] = useState('');
  const [city, setCity] = useState('');
  const [ground, setGround] = useState('');
  const [organizerContact, setOrganizerContact] = useState('');
  const [allowContact, setAllowContact] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('School');
  const [matchType, setMatchType] = useState('Limited Over');
  const [banner, setBanner] = useState(null);
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false); // Track loading state

// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true); // Start loading

  try {
    if (!user) {
      alert("You must be logged in to create a tournament.");
      setLoading(false);
      return;
    }

    // Initialize the file upload URLs
    let bannerUrl = null;
    let logoUrl = null;

    // Handle banner upload if selected
    if (banner) {
      const bannerRef = ref(storage, `tournamentBanners/${banner.name}`);
      const bannerSnapshot = await uploadBytes(bannerRef, banner);
      bannerUrl = await getDownloadURL(bannerSnapshot.ref);
    }

    // Handle logo upload if selected
    if (logo) {
      const logoRef = ref(storage, `tournamentLogos/${logo.name}`);
      const logoSnapshot = await uploadBytes(logoRef, logo);
      logoUrl = await getDownloadURL(logoSnapshot.ref);
    }

    // Create the tournament data to store in Firestore
    const tournamentData = {
      tournamentName,
      city,
      ground,
      organizerName: user.displayName || 'Unknown Organizer',
      organizerContact,
      allowContact,
      startDate,
      endDate,
      category,
      matchType,
      logo: logoUrl,  // Uploaded logo URL
      banner: bannerUrl, // Uploaded banner URL
      organizerId: user.uid,  // ID of the user who created the tournament (organizer)
      timestamp: new Date(),
    };

    // Add the tournament data to Firestore
    await addDoc(collection(db, 'tournaments'), tournamentData);

    // Navigate to the organizer's admin page after successful submission
    navigate('/organizer-admin');
  } catch (error) {
    console.error('Error adding tournament: ', error);
    alert('Error adding tournament. Please try again.');
  } finally {
    setLoading(false); // Stop loading
  }
};

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Create a New Tournament</h2>
      <form onSubmit={handleSubmit}>
        {/* Tournament Name and City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Tournament Name</label>
            <input
              type="text"
              value={tournamentName}
              onChange={(e) => setTournamentName(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        {/* Ground and Organizer Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Ground</label>
            <input
              type="text"
              value={ground}
              onChange={(e) => setGround(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Organizer Contact Number</label>
            <input
              type="text"
              value={organizerContact}
              onChange={(e) => setOrganizerContact(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        {/* Allow Contact Checkbox */}
        <div className="mb-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={allowContact}
              onChange={() => setAllowContact(!allowContact)}
              className="form-checkbox"
            />
            <span className="ml-2 text-gray-700">Allow players to contact me for team registration</span>
          </label>
        </div>

        {/* Start Date and End Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        {/* Category and Match Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Tournament Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="School">School</option>
              <option value="Community">Community</option>
              <option value="Open">Open</option>
              <option value="Series">Series</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Match Type</label>
            <select
              value={matchType}
              onChange={(e) => setMatchType(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="Limited Over">Limited Over</option>
              <option value="Test Match">Test Match</option>
            </select>
          </div>
        </div>

        {/* Banner Upload and Logo Upload */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Upload Banner</label>
            <input
              type="file"
              onChange={(e) => setBanner(e.target.files[0])}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Upload Logo</label>
            <input
              type="file"
              onChange={(e) => setLogo(e.target.files[0])}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-6 rounded-full ${loading ? 'opacity-50' : ''}`}
        >
          {loading ? 'Publishing...' : 'Publish Tournament'}
        </button>
      </form>
    </div>
  );
};

export default AddTournament;
