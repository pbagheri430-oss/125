import React, { useEffect, useState } from 'react';

export default function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch('/api/teams')
      .then(res => res.json())
      .then(setTeams);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Teams</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {teams.map(team => (
          <div key={team.id} className="bg-gray-800 p-2 rounded">
            <h3 className="text-green-300">{team.name}</h3>
            <p>{team.stadium}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
