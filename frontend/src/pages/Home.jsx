import React, { useEffect, useState } from 'react';

export default function Home() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch('/api/matches')
      .then(res => res.json())
      .then(setMatches);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Welcome to the EPL Dashboard</h1>
      <ul>
        {matches.map(m => (
          <li key={m.id}>{m.HomeTeam?.name} {m.home_score} - {m.away_score} {m.AwayTeam?.name}</li>
        ))}
      </ul>
    </div>
  );
}
