// components/CharacterStats.js
export default function CharacterStats() {
  const dummyCharacterStats = [
    { character: 'Naruto', usage: 50, winRate: '70%' },
    { character: 'Sakura', usage: 30, winRate: '65%' }
  ];

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Character Statistics</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#0070f3', color: '#fff' }}>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Character</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Usage</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Win Rate</th>
          </tr>
        </thead>
        <tbody>
          {dummyCharacterStats.map((stat, index) => (
            <tr key={index}>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{stat.character}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{stat.usage}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{stat.winRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
