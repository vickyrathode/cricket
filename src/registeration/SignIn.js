// src/registration/SignIn.js
import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);  // State to store logged-in user info
  const navigate = useNavigate();

  // UseEffect to listen to changes in authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);  // Set the current user when logged in
      } else {
        setUser(null);  // Set user to null when logged out
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setError('');  // Clear any previous errors
        setUser(auth.currentUser);  // Set the user state after sign-in
        navigate('/');  // Redirect to home page after successful sign-in
      })
      .catch(() => {
        setError('Failed to sign in. Please check your credentials.');
      });
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      setUser(null);  // Clear user state after sign-out
      navigate('/signin');  // Redirect to sign-in page after logging out
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {user ? (
        // Show the menu if the user is logged in
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80">
          <h2 className="text-xl font-bold mb-4">Welcome, {user.displayName || user.email}</h2>
          <ul className="space-y-2">
            <li className="bg-gray-200 p-2 rounded cursor-pointer">Profile</li>
            <li className="bg-gray-200 p-2 rounded cursor-pointer">My Matches</li>
            <li className="bg-gray-200 p-2 rounded cursor-pointer">My Tournaments</li>
            <li className="bg-gray-200 p-2 rounded cursor-pointer">Organizer Admin</li>
            <li>
              <button
                onClick={handleSignOut}
                className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded w-full"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      ) : (
        // Show the sign-in form if the user is not logged in
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSignIn}>
          <h2 className="text-xl font-bold mb-4">Sign In</h2>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded w-full"
          >
            Sign In
          </button>

          <p className="mt-4">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-0 px-2 rounded"
            >
              Sign up
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

export default SignIn;
