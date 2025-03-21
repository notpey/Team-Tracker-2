// components/CharacterStats.js
import { useState, useEffect } from 'react';

export default function CharacterStats() {
  const [charStats, setCharStats] = useState({});
  const [comboStats, setComboStats] = useState({});

  useEffect(() => {
    const wars = JSON.parse(localStorage.getItem('wars')) || [];
    const stats = {};
    const combos = {};

    wars.forEach(war => {
      if (war.teamData) {
        Object.keys(war.teamData).forEach(gameKey => {
          // Process yourTeam only for simplicity
          const team = war.teamData[gameKey].yourTeam;
          if (team && team.length > 0) {
            team.forEach(char => {
              if (!stats[char.name]) {
                stats[char.name] = { played: 0, wins: 0, url: char.url };
              }
              stats[char.name].played += 1;
              // For demo purposes, assume if yourPlayer is in war.matchHistory as winner then win
              if (war.matchHistory.includes(war.yourPlayer)) {
                stats[char.name].wins += 1;
              }
            });
            // Two-character combos
            for (let i = 0; i < team.length; i++) {
              for (let j = i + 1; j < team.length; j++) {
                const comboKey = [team[i].name, team[j].name].sort().join(" + ");
                if (!combos[comboKey]) {
                  combos[comboKey] = { played: 0, wins: 0 };
                }
                combos[comboKey].played += 1;
                if (war.matchHistory.includes(war.yourPlayer)) {
                  combos[comboKey].wins += 1;
                }
              }
            }
          }
        });
      }
    });

    setCharStats(stats);
    setComboStats(combos);
  }, []);

  return (
    <div>
      <h2>Character Statistics & Combos</h2>
      <h3>Individual Characters</h3>
      {Object.keys(charStats).length === 0 ? (
        <p>No data available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Character</th>
              <th>Played</th>
              <th>Wins</th>
              <th>Win %</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(charStats).map(name => {
              const { played, wins, url } = charStats[name];
              const winRate = played ? ((wins / played) * 100).toFixed(1) : "0.0";
              return (
                <tr key={name}>
                  <td><img src={url} alt={name} style={{ width: '30px', height: '30px', borderRadius: '3px' }} /><br/>{name}</td>
                  <td>{played}</td>
                  <td>{wins}</td>
                  <td>{winRate}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <h3>Two-Character Combos</h3>
      {Object.keys(comboStats).length === 0 ? (
        <p>No combo data available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Combo</th>
              <th>Played</th>
              <th>Wins</th>
              <th>Win %</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(comboStats).map(combo => {
              const { played, wins } = comboStats[combo];
              const winRate = played ? ((wins / played) * 100).toFixed(1) : "0.0";
              return (
                <tr key={combo}>
                  <td>{combo}</td>
                  <td>{played}</td>
                  <td>{wins}</td>
                  <td>{winRate}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
