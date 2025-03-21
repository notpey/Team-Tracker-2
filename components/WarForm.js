// components/WarForm.js
import { useState, useEffect } from 'react';
import TeamSelection from './TeamSelection';

export default function WarForm() {
  const [eventName, setEventName] = useState('');
  const [yourClan, setYourClan] = useState('');
  const [opponentClan, setOpponentClan] = useState('');
  const [yourPlayer, setYourPlayer] = useState('');
  const [opponentPlayer, setOpponentPlayer] = useState('');
  const [matchHistory, setMatchHistory] = useState('');
  const [clans, setClans] = useState([]);
  const [teamData, setTeamData] = useState({}); // Data from TeamSelection

  useEffect(() => {
    const storedClans = JSON.parse(localStorage.getItem('clans')) || [];
    setClans(storedClans);
  }, []);

  const handleTeamChange = (teams) => {
    setTeamData(teams);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const warData = {
      eventName,
      yourClan,
      opponentClan,
      yourPlayer,
      opponentPlayer,
      matchHistory,
      teamData,  // teams for each game
      createdAt: new Date().toISOString()
    };
    // Save warData to localStorage (or post to an API)
    const wars = JSON.parse(localStorage.getItem('wars')) || [];
    wars.push(warData);
    localStorage.setItem('wars', JSON.stringify(wars));
    alert("War data saved!");
    // Clear fields
    setEventName('');
    setYourClan('');
    setYourPlayer('');
    setOpponentClan('');
    setOpponentPlayer('');
    setMatchHistory('');
    setTeamData({});
  };

  return (
    <div>
      <h2>Enter War Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name:</label>
          <br />
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Your Clan:</label>
          <br />
          <select value={yourClan} onChange={(e) => setYourClan(e.target.value)} required>
            <option value="">Select Clan</option>
            {clans.map((clan, index) => (
              <option key={index} value={clan.name}>{clan.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Your Player:</label>
          <br />
          <select value={yourPlayer} onChange={(e) => setYourPlayer(e.target.value)} required>
            <option value="">Select Player</option>
            {clans.find(c => c.name === yourClan)?.players.map((player, index) => (
              <option key={index} value={player}>{player}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Opponent Clan:</label>
          <br />
          <select value={opponentClan} onChange={(e) => setOpponentClan(e.target.value)} required>
            <option value="">Select Clan</option>
            {clans.map((clan, index) => (
              <option key={index} value={clan.name}>{clan.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Opponent Player:</label>
          <br />
          <input
            type="text"
            value={opponentPlayer}
            onChange={(e) => setOpponentPlayer(e.target.value)}
            required
            placeholder="Enter opponent name"
          />
        </div>
        <div>
          <label>Match History (paste text):</label>
          <br />
          <textarea
            rows="5"
            style={{ width: '100%' }}
            value={matchHistory}
            onChange={(e) => setMatchHistory(e.target.value)}
            placeholder="March 17, 2025 21:54 Tragicksz vs Gon Winner Gon&#10;..."
          ></textarea>
        </div>
        <br />
        <TeamSelection onTeamChange={handleTeamChange} />
        <br />
        <button type="submit">Save War Data</button>
      </form>
    </div>
  );
}
