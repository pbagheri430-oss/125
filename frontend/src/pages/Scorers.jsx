import React, { useEffect, useState } from 'react';

export default function Scorers() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch('/api/scorers?season=1')
      .then(res => res.json())
      .then(setPlayers);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Top Scorers</h1>
      <ul>
        {players.map(s => (
          <li key={s.player_id}>{s.Player?.name} - {s.goals} goals</li>
        ))}
      </ul>
    </div>
  );
}
