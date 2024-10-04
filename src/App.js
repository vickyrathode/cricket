// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Matches from './pages/Matches';
import Stats from './pages/Stats';
import MyMatches from './pages/MyMatches';
import MyTournaments from './pages/MyTournaments';
import OrganizerAdmin from './pages/OrganiserAdmin';
import AddTournament from './pages/AddTournament';
import SignIn from './registeration/SignIn';
import SignUp from './registeration/SignUp';
import TournamentDetail from './pages/TournamentDetail';
import Registeration from './pages/Registeration';
import LiveTournaments from './pages/LiveTournaments';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/registeration' element={<Registeration/>}/>
        <Route path="/matches" element={<Matches />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/my-matches" element={<MyMatches />} />
        <Route path="/my-tournaments" element={<MyTournaments />} />
        <Route path="/organizer-admin" element={<OrganizerAdmin />} />
        <Route path="/add-tournament" element={<AddTournament />} />
         <Route path="/tournament/:id" element={<TournamentDetail />} />
         <Route path="/live-tournaments" element={<LiveTournaments />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
