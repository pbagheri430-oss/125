import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Teams from './pages/Teams';
import Standings from './pages/Standings';
import Matches from './pages/Matches';
import Scorers from './pages/Scorers';
import Contact from './pages/Contact';
import Player from './pages/Player';
import SearchBar from './components/SearchBar';
import DarkModeToggle from './components/DarkModeToggle';
import './index.css';
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'));
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <div className="flex items-center gap-4 p-4 bg-gray-900 text-white">
      <Link to="/">Home</Link>
      <Link to="/teams">Teams</Link>
      <Link to="/standings">Standings</Link>
      <Link to="/matches">Matches</Link>
      <Link to="/scorers">Scorers</Link>
      <Link to="/contact">Contact</Link>
      <SearchBar />
      <DarkModeToggle />
    </div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/standings" element={<Standings />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/scorers" element={<Scorers />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/player/:id" element={<Player />} />
    </Routes>
  </Router>
);
