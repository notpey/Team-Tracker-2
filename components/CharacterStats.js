// components/CharacterStats.js
import { useState, useEffect } from 'react';

export default function CharacterStats() {
  // For a complete implementation, you would parse character-team data from your wars/match history.
  // Here we provide static example data.
  const [stats] = useState([
    { character: 'Naruto', played: 10, wins: 7 },
    { character: 'Sakura', played: 8, wins: 5 }
  ]);

  return (
    <div>
      <h2>Character Statistics</h2>
      <table>
        <thead>
          <tr>
            <th>Character</th>
            <th>Played</th>
            <th>Wins</th>
            <th>Win Rate</th>
          </tr>
        </thead>
        <tbody>
          {stats.map(stat => {
            const winRate = stat.played ? ((stat.wins / stat.played) * 100).toFixed(1) : "0.0";
            return (
              <tr key={stat.character}>
                <td>{stat.character}</td>
                <td>{stat.played}</td>
                <td>{stat.wins}</td>
                <td>{winRate}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
