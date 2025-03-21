// components/PlayerStats.js
export default function PlayerStats() {
  const dummyStats = [
    { player: 'Naruto', winRate: '75%', clan: 'Hidden Leaf', matches: 20 },
    { player: 'Sasuke', winRate: '80%', clan: 'Uchiha', matches: 25 }
  ];

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Player Statistics</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#0070f3', color: '#fff' }}>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Player</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Clan</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Win Rate</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Matches</th>
          </tr>
        </thead>
        <tbody>
          {dummyStats.map((stat, index) => (
            <tr key={index}>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{stat.player}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{stat.clan}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{stat.winRate}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{stat.matches}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
