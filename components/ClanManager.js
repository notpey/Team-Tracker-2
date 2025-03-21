// components/ClanManager.js
import { useState, useEffect } from 'react';

export default function ClanManager() {
  const [clanName, setClanName] = useState('');
  const [players, setPlayers] = useState('');
  const [clans, setClans] = useState([]);

  useEffect(() => {
    const storedClans = JSON.parse(localStorage.getItem('clans')) || [];
    setClans(storedClans);
  }, []);

  const addClan = () => {
    if (!clanName.trim()) return;
    const newClan = {
      name: clanName.trim(),
      players: players.split(',').map(p => p.trim()).filter(p => p)
    };
    const updatedClans = [...clans, newClan];
    setClans(updatedClans);
    localStorage.setItem('clans', JSON.stringify(updatedClans));
    setClanName('');
    setPlayers('');
  };

  return (
    <div>
      <h2>Add a Clan</h2>
      <input
        type="text"
        placeholder="Clan Name"
        value={clanName}
        onChange={(e) => setClanName(e.target.value)}
      />
      <br /><br />
      <input
        type="text"
        placeholder="Players (comma separated)"
        value={players}
        onChange={(e) => setPlayers(e.target.value)}
      />
      <br /><br />
      <button onClick={addClan}>Add Clan</button>
      <h3>Existing Clans</h3>
      <ul>
        {clans.map((clan, index) => (
          <li key={index}>
            <strong>{clan.name}</strong> — Players: {clan.players.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}
