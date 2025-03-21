export default function PlayerStats() {
    const dummyStats = [
      { player: "Naruto", winRate: "75%", clan: "Hidden Leaf", matches: 20 },
      { player: "Sasuke", winRate: "80%", clan: "Uchiha", matches: 25 }
    ];
  
    return (
      <div style={{ marginTop: "20px" }}>
        <h2>Player Statistics</h2>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Player</th>
              <th>Clan</th>
              <th>Win Rate</th>
              <th>Matches</th>
            </tr>
          </thead>
          <tbody>
            {dummyStats.map((stat, index) => (
              <tr key={index}>
                <td>{stat.player}</td>
                <td>{stat.clan}</td>
                <td>{stat.winRate}</td>
                <td>{stat.matches}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  