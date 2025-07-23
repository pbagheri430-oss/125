import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Player() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    fetch(`/api/players/${id}`)
      .then(res => res.json())
      .then(setPlayer);
  }, [id]);

  if (!player) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">{player.name}</h2>
      <p>Position: {player.position}</p>
      <p>Nationality: {player.nationality}</p>
      <p>Goals: {player.TopScorers?.[0]?.goals || 0}</p>
      <p>Yellow Cards: {player.yellow_cards}</p>
      <p>Red Cards: {player.red_cards}</p>
    </div>
  );
}
