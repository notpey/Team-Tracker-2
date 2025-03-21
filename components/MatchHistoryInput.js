// components/MatchHistoryInput.js
import { useState } from 'react';

export default function MatchHistoryInput() {
  const [historyText, setHistoryText] = useState('');

  const parseHistory = () => {
    // Expected format: "March 17, 2025 21:54 Tragicksz vs Gon Winner Gon"
    const lines = historyText.split('\n').filter(line => line.trim().length > 0);
    const matches = lines.map(line => {
      const regex = /^(.+?)\s+(\d{2}:\d{2})\s+(.+?)\s+vs\s+(.+?)\s+Winner\s+(.+)$/i;
      const match = line.match(regex);
      if (match) {
        return {
          date: match[1].trim(),
          time: match[2].trim(),
          player1: match[3].trim(),
          player2: match[4].trim(),
          winner: match[5].trim()
        };
      } else {
        return null;
      }
    }).filter(m => m !== null);
    localStorage.setItem('matchHistory', JSON.stringify(matches));
    alert(`Parsed ${matches.length} matches.`);
  };

  return (
    <div>
      <h2>Parse Match History</h2>
      <textarea
        rows="6"
        style={{ width: '100%' }}
        value={historyText}
        onChange={(e) => setHistoryText(e.target.value)}
        placeholder="Paste match history here..."
      ></textarea>
      <br />
      <button onClick={parseHistory}>Parse History</button>
    </div>
  );
}
