import React, { useEffect, useState } from 'react';

export default function Standings() {
  const [table, setTable] = useState([]);

  useEffect(() => {
    fetch('/api/standings?season=1')
      .then(res => res.json())
      .then(setTable);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Standings</h1>
      <table className="w-full text-left">
        <thead>
          <tr><th>Team</th><th>Pts</th></tr>
        </thead>
        <tbody>
          {table.map(row => (
            <tr key={row.team_id} className="border-b">
              <td className="py-1">{row.Team?.name}</td>
              <td className="py-1">{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
