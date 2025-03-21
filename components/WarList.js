// components/WarList.js
import { useState, useEffect } from 'react';

export default function WarList() {
  const [wars, setWars] = useState([]);

  useEffect(() => {
    const storedWars = JSON.parse(localStorage.getItem('wars')) || [];
    setWars(storedWars);
  }, []);

  return (
    <div>
      <h2>Saved War Sets</h2>
      {wars.length === 0 ? (
        <p>No war data saved yet.</p>
      ) : (
        <ul>
          {wars.map((war, index) => (
            <li key={index} style={{ marginBottom: '15px' }}>
              <strong>{war.eventName}</strong><br />
              Your Clan: {war.yourClan} (Player: {war.yourPlayer})<br />
              Opponent: {war.opponentClan} (Player: {war.opponentPlayer})<br />
              <small>Match History (first 50 chars): {war.matchHistory.substring(0,50)}...</small><br />
              <small>Team Data: {JSON.stringify(war.teamData)}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
