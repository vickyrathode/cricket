import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase'; // Import Firestore and Storage
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const Registeration = () => {
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState(''); // Add location state
  const [battingHand, setBattingHand] = useState('');
  const [bowlingHand, setBowlingHand] = useState('');
  const [allRounder, setAllRounder] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [existingProfileImage, setExistingProfileImage] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || user.email); // Get the user's name or email if name is not available
      loadExistingRegistration(user.uid); // Load existing registration data if available
    }
  }, []);

  // Load existing registration data
  const loadExistingRegistration = async (uid) => {
    const docRef = doc(db, 'registered', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setPhone(data.phone || '');
      setLocation(data.location || ''); // Load location data
      setBattingHand(data.battingHand || '');
      setBowlingHand(data.bowlingHand || '');
      setAllRounder(data.allRounder || false);
      setExistingProfileImage(data.profileImage || '');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        alert('You need to be logged in to submit the form.');
        return;
      }

      let profileImageUrl = existingProfileImage;
      if (profileImage) {
        // Upload the profile image to Firebase Storage
        const imageRef = ref(storage, `profileImages/${profileImage.name}`);
        const snapshot = await uploadBytes(imageRef, profileImage);
        profileImageUrl = await getDownloadURL(snapshot.ref);
      }

      // Store the player registration data in Firestore
      await setDoc(doc(db, 'registered', user.uid), {
        name: userName,        // User's name from Firebase Auth
        phone,                 // Phone number from form input
        location,              // Location from form input
        battingHand,           // Batting hand (left or right) from form input
        bowlingHand,           // Bowling hand (left or right) from form input
        allRounder,            // Boolean for all-rounder checkbox
        profileImage: profileImageUrl, // Profile image URL from Firebase Storage
        registrationComplete: true,    // Mark registration as complete
      });

      alert('Registration successful!');
      navigate('/profile'); // Redirect to profile page after registration
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">{existingProfileImage ? 'Edit' : 'New'} Registration</h2>

      <form onSubmit={handleSubmit}>
        {/* Name (already signed in) */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            value={userName}
            readOnly
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Location</label>
          <input
            type="text"
            placeholder="Enter current location"
            value={location}
            onChange={(e) => setLocation(e.target.value)} // Change handler for location
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Batting Hand */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Batting Hand</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="battingHand"
                value="Right-Hand"
                checked={battingHand === 'Right-Hand'}
                onChange={(e) => setBattingHand(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Right-Handed</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="battingHand"
                value="Left-Hand"
                checked={battingHand === 'Left-Hand'}
                onChange={(e) => setBattingHand(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Left-Handed</span>
            </label>
          </div>
        </div>

        {/* Bowling Hand */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Bowling Hand</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="bowlingHand"
                value="Right-Hand"
                checked={bowlingHand === 'Right-Hand'}
                onChange={(e) => setBowlingHand(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Right-Handed</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="bowlingHand"
                value="Left-Hand"
                checked={bowlingHand === 'Left-Hand'}
                onChange={(e) => setBowlingHand(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Left-Handed</span>
            </label>
          </div>
        </div>

        {/* All-rounder */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={allRounder}
              onChange={(e) => setAllRounder(e.target.checked)}
              className="form-checkbox"
            />
            <span className="ml-2">All-rounder</span>
          </label>
        </div>

        {/* Profile Image */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Profile Image</label>
          {existingProfileImage && (
            <img src={existingProfileImage} alt="Profile" className="mb-4 h-20 w-20 rounded-full" />
          )}
          <input
            type="file"
            onChange={(e) => setProfileImage(e.target.files[0])}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Registeration;
