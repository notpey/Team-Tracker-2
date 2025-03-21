// components/PlayerStats.js
import { useState, useEffect } from 'react';

export default function PlayerStats() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('matchHistory')) || [];
    const playerStats = {};
    history.forEach(match => {
      [match.player1, match.player2].forEach(player => {
        if (!playerStats[player]) {
          playerStats[player] = { played: 0, wins: 0 };
        }
        playerStats[player].played += 1;
        if (match.winner.toLowerCase() === player.toLowerCase()) {
          playerStats[player].wins += 1;
        }
      });
    });
    setStats(playerStats);
  }, []);

  return (
    <div>
      <h2>Player Statistics</h2>
      {Object.keys(stats).length === 0 ? (
        <p>No match history parsed.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Played</th>
              <th>Wins</th>
              <th>Win Rate</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(stats).map(player => {
              const { played, wins } = stats[player];
              const winRate = played ? ((wins / played) * 100).toFixed(1) : "0.0";
              return (
                <tr key={player}>
                  <td>{player}</td>
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
