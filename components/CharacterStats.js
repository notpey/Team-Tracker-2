export default function CharacterStats() {
    const dummyCharacterStats = [
      { character: "Naruto", usage: 50, winRate: "70%" },
      { character: "Sakura", usage: 30, winRate: "65%" }
    ];
  
    return (
      <div style={{ marginTop: "20px" }}>
        <h2>Character Statistics</h2>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Character</th>
              <th>Usage</th>
              <th>Win Rate</th>
            </tr>
          </thead>
          <tbody>
            {dummyCharacterStats.map((stat, index) => (
              <tr key={index}>
                <td>{stat.character}</td>
                <td>{stat.usage}</td>
                <td>{stat.winRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  