import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { auth, db } from '../firebase'; // Import Firebase Firestore
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore'; // Firestore functions

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false); // Toggle for showing/hiding the search input
  const [searchQuery, setSearchQuery] = useState('');  // Search input value
  const [searchResults, setSearchResults] = useState([]); // Store search results
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser(null);
      navigate('/signin'); // Redirect to sign-in page after sign-out
    });
  };

  // Handle search input field toggle
  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
    setSearchQuery(''); // Clear search query when closing search
    setSearchResults([]); // Clear search results
  };

  // Handle search query change
  const handleSearchQueryChange = async (e) => {
    setSearchQuery(e.target.value);

    if (e.target.value) {
      try {
        // Example: Search tournaments by name from Firestore
        const q = query(collection(db, 'tournaments'), where('tournamentName','>=', e.target.value));
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSearchResults(results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults([]); // Clear results if the search query is empty
    }
  };

  // Handle search result click
  const handleSearchResultClick = (id) => {
    navigate(`/tournament/${id}`); // Navigate to tournament details page
    setSearchOpen(false); // Close search input after navigation
  };

  return (
    <nav className="text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center space-x-4">
            <img className="h-20 w-auto" src="/images/logo.png" alt="Your Logo" />
          </div>

          {/* Center: Live Score Menu */}
          <div className="flex space-x-6">
            <a
              onClick={() => navigate('/live-matches')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Matches
            </a>
            <a
              onClick={() => navigate('/live-tournaments')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Tournaments
            </a>
          </div>

          {/* Right: Sign In, Sign Up or User's Name */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button onClick={toggleUserDropdown} className="font-medium">
                  Welcome, {user.displayName || user.email}
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                      <a
                        onClick={() => { navigate('/profile'); toggleUserDropdown(); }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        Profile
                      </a>
                      <a
                        onClick={() => { navigate('/registeration'); toggleUserDropdown(); }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        Registration
                      </a>
                      <a
                        onClick={() => { navigate('/my-matches'); toggleUserDropdown(); }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        My Matches
                      </a>
                      <a
                        onClick={() => { navigate('/my-tournaments'); toggleUserDropdown(); }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        My Tournaments
                      </a>
                      <a
                        onClick={() => { navigate('/organizer-admin'); toggleUserDropdown(); }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        Organizer Admin
                      </a>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/signin')}
                className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
              >
                Sign In
              </button>
            )}

            {/* Search Icon and Search Input */}
            <div className="relative">
              <button onClick={handleSearchClick} className="hover:text-orange-400">
                <FaSearch className="h-6 w-6" />
              </button>
              {searchOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border border-gray-200 rounded-lg z-10">
                  <form onSubmit={(e) => e.preventDefault()} className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={handleSearchQueryChange}
                      className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </form>
                  {searchResults.length > 0 && (
                    <ul className="max-h-48 overflow-y-auto">
                      {searchResults.map((result) => (
                        <li
                          key={result.id}
                          className="p-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSearchResultClick(result.id)}
                        >
                          {result.tournamentName}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
