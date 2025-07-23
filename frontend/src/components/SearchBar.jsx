import React, { useState } from 'react';

export default function SearchBar() {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);

  async function handleChange(e) {
    const value = e.target.value;
    setTerm(value);
    if (value.length < 2) return setResults([]);
    const res = await fetch(`/api/search?q=${value}`);
    const data = await res.json();
    setResults([...data.teams, ...data.players]);
  }

  return (
    <div className="relative w-full max-w-sm">
      <input
        value={term}
        onChange={handleChange}
        className="border p-2 w-full text-black"
        placeholder="Search..."
      />
      {results.length > 0 && (
        <ul className="absolute bg-white text-black w-full z-10 max-h-40 overflow-y-auto">
          {results.map(r => (
            <li key={r.id} className="p-1 border-b last:border-none">
              {r.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
