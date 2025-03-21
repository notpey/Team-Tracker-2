// components/CharacterSelector.js
import { useState, useEffect } from 'react';

export default function CharacterSelector({ onSelect }) {
  const [characters, setCharacters] = useState([]);

  // Fetch characters from public/characters.json automatically
  useEffect(() => {
    fetch('/characters.json')
      .then(res => res.json())
      .then(data => {
        // Assume the JSON is either an array or { characters: [...] }
        if (Array.isArray(data)) {
          setCharacters(data);
        } else if (data.characters) {
          setCharacters(data.characters);
        }
      })
      .catch(err => console.error('Error loading characters.json:', err));
  }, []);

  return (
    <div>
      <h2>Select a Character</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
        gap: '10px'
      }}>
        {characters.map((char, index) => (
          <div key={index} style={{ cursor: 'pointer', textAlign: 'center' }}
            onClick={() => onSelect(char)}>
            <img src={char.url} alt={char.name}
                 style={{ width: '70px', height: '70px', borderRadius: '4px' }} />
            <div>{char.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
