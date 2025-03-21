// components/WarForm.js
import { useState } from 'react';
import axios from 'axios';

export default function WarForm() {
  const [warName, setWarName] = useState('');
  const [rules, setRules] = useState('');
  const [banList, setBanList] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/wars', { warName, rules, banList });
      setMessage('War created successfully!');
      setWarName('');
      setRules('');
      setBanList('');
    } catch (error) {
      console.error(error);
      setMessage('Error creating war.');
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Create New War</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>War Name:</label><br />
          <input
            type="text"
            value={warName}
            onChange={(e) => setWarName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Rules (JSON or text):</label><br />
          <textarea
            value={rules}
            onChange={(e) => setRules(e.target.value)}
            required
            rows="5"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Ban List (Comma separated):</label><br />
          <textarea
            value={banList}
            onChange={(e) => setBanList(e.target.value)}
            required
            rows="3"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '5px'
        }}>Create War</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
