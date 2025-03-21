// components/PlayerStats.js
import { useState, useEffect } from 'react';

export default function PlayerStats() {
  const [playerStats, setPlayerStats] = useState({});

  useEffect(() => {
    // Combine stats from parsed match history and war data (if available)
    const history = JSON.parse(localStorage.getItem('matchHistory')) || [];
    const wars = JSON.parse(localStorage.getItem('wars')) || [];
    const stats = {};

    // Process match history
    history.forEach(match => {
      [match.player1, match.player2].forEach(player => {
        if (!stats[player]) {
          stats[player] = { played: 0, wins: 0, games: {} };
        }
        stats[player].played += 1;
        if (match.winner.toLowerCase() === player.toLowerCase()) {
          stats[player].wins += 1;
        }
      });
    });

    // Process war data for per-game info (if team selection data exists)
    wars.forEach(war => {
      if (war.teamData) {
        Object.keys(war.teamData).forEach(gameKey => {
          const gameNum = gameKey.replace('game', '');
          // For this example, we assume that if yourPlayer won the match (based on matchHistory),
          // they won all games; otherwise, lost. (A more detailed approach would store game-by-game results.)
          const win = war.yourPlayer && war.matchHistory.includes(war.yourPlayer) && war.matchHistory.includes(war.opponentPlayer)
            ? (war.matchHistory.includes(war.yourPlayer) ? 1 : 0)
            : 0;
          if (!stats[war.yourPlayer]) {
            stats[war.yourPlayer] = { played: 0, wins: 0, games: {} };
          }
          if (!stats[war.yourPlayer].games[`G${gameNum}`]) {
            stats[war.yourPlayer].games[`G${gameNum}`] = { played: 0, wins: 0 };
          }
          stats[war.yourPlayer].games[`G${gameNum}`].played += 1;
          stats[war.yourPlayer].games[`G${gameNum}`].wins += win;
        });
      }
    });

    setPlayerStats(stats);
  }, []);

  return (
    <div>
      <h2>Player Statistics</h2>
      {Object.keys(playerStats).length === 0 ? (
        <p>No match history parsed.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Matches Played</th>
              <th>Wins</th>
              <th>Win %</th>
              <th>Game Breakdown</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(playerStats).map(player => {
              const { played, wins, games } = playerStats[player];
              const winRate = played ? ((wins / played) * 100).toFixed(1) : "0.0";
              return (
                <tr key={player}>
                  <td>{player}</td>
                  <td>{played}</td>
                  <td>{wins}</td>
                  <td>{winRate}%</td>
                  <td>
                    {games && Object.keys(games).map(g => {
                      const { played, wins } = games[g];
                      const rate = played ? ((wins / played) * 100).toFixed(1) : "0.0";
                      return <div key={g}>{g}: {rate}%</div>;
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
