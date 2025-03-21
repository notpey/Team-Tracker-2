// components/WarList.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function WarList() {
  const [wars, setWars] = useState([]);

  useEffect(() => {
    const fetchWars = async () => {
      try {
        const res = await axios.get('/api/wars');
        setWars(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWars();
  }, []);

  return (
    <div>
      <h2>Existing Wars</h2>
      {wars.length === 0 ? (
        <p>No wars created yet.</p>
      ) : (
        <ul>
          {wars.map((war) => (
            <li key={war.id} style={{
              marginBottom: '15px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px'
            }}>
              <strong>{war.warName}</strong> - Created on {new Date(war.createdAt).toLocaleString()}
              <div><strong>Rules:</strong> {war.rules}</div>
              <div><strong>Banned Characters:</strong> {war.banList.join(', ')}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
