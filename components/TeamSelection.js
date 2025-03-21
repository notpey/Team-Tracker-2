// components/TeamSelection.js
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialTeamState = {
  game1: { yourTeam: [], oppTeam: [] },
  game2: { yourTeam: [], oppTeam: [] },
  game3: { yourTeam: [], oppTeam: [] },
  game4: { yourTeam: [], oppTeam: [] },
  game5: { yourTeam: [], oppTeam: [] }
};

export default function TeamSelection({ onTeamChange }) {
  const [teams, setTeams] = useState(initialTeamState);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Fetch characters from public/characters.json
    fetch('/characters.json')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCharacters(data);
        } else if (data.characters) {
          setCharacters(data.characters);
        }
      })
      .catch(err => console.error("Error loading characters:", err));
  }, []);

  // When teams change, pass data back to parent
  useEffect(() => {
    onTeamChange(teams);
  }, [teams, onTeamChange]);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    
    // Determine source list (either 'characterPool' or a game droppable)
    let sourceList = [];
    if (source.droppableId === 'characterPool') {
      sourceList = characters;
    } else {
      const [teamType, gameId] = source.droppableId.split('-'); // e.g., "yourGame1" or "oppGame2"
      sourceList = teams[`game${gameId}`][teamType === 'your' ? 'yourTeam' : 'oppTeam'];
    }

    // If dragging from the global pool, we are copying (not moving)
    if (source.droppableId === 'characterPool') {
      const charIndex = parseInt(draggableId, 10);
      const char = characters[charIndex];
      const [teamType, gameId] = destination.droppableId.split('-');
      const gameKey = `game${gameId}`;
      const targetList = teams[gameKey][teamType === 'your' ? 'yourTeam' : 'oppTeam'];
      if (targetList.length >= 3) return; // limit to 3 per team
      // Avoid duplicates if desired (optional)
      const newList = [...targetList, char];
      setTeams(prev => ({
        ...prev,
        [gameKey]: {
          ...prev[gameKey],
          [teamType === 'your' ? 'yourTeam' : 'oppTeam']: newList
        }
      }));
    }
    // Allow reordering within same droppable area
    else if (source.droppableId === destination.droppableId) {
      const [teamType, gameId] = source.droppableId.split('-');
      const gameKey = `game${gameId}`;
      const list = Array.from(teams[gameKey][teamType === 'your' ? 'yourTeam' : 'oppTeam']);
      const [removed] = list.splice(source.index, 1);
      list.splice(destination.index, 0, removed);
      setTeams(prev => ({
        ...prev,
        [gameKey]: {
          ...prev[gameKey],
          [teamType === 'your' ? 'yourTeam' : 'oppTeam']: list
        }
      }));
    }
    // Allow moving between different droppables within the same game if needed
    else {
      // For simplicity, we won't allow moving between yourTeam and oppTeam
      return;
    }
  };

  // Render droppable for global character pool
  const renderCharacterPool = () => (
    <Droppable droppableId="characterPool" isDropDisabled={true}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
            gap: '10px',
            marginBottom: '20px'
          }}
        >
          {characters.map((char, index) => (
            <Draggable key={index.toString()} draggableId={index.toString()} index={index}>
              {(provided2) => (
                <div
                  ref={provided2.innerRef}
                  {...provided2.draggableProps}
                  {...provided2.dragHandleProps}
                  style={{
                    userSelect: 'none',
                    padding: 4,
                    margin: '0 0 8px 0',
                    minHeight: '50px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    textAlign: 'center',
                    borderRadius: '4px',
                    ...provided2.draggableProps.style
                  }}
                >
                  <img src={char.url} alt={char.name} style={{ width: '70px', height: '70px', borderRadius: '4px' }} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  // Render droppable area for a team
  const renderTeamArea = (gameNumber, teamKey, teamData) => {
    const droppableId = `${teamKey}-game${gameNumber}`;
    return (
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            className="team-droppable"
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ minHeight: '90px', marginBottom: '10px' }}
          >
            {teamData.map((char, index) => (
              <div key={index} style={{ position: 'relative', margin: '4px' }}>
                <img src={char.url} alt={char.name} style={{ width: '70px', height: '70px', borderRadius: '4px' }} />
                <button
                  style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    backgroundColor: '#dc3545',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    color: 'white'
                  }}
                  onClick={() => {
                    // Remove character from team
                    setTeams(prev => {
                      const newTeam = prev[`game${gameNumber}`][teamKey].filter((_, i) => i !== index);
                      return {
                        ...prev,
                        [`game${gameNumber}`]: {
                          ...prev[`game${gameNumber}`],
                          [teamKey]: newTeam
                        }
                      };
                    });
                  }}
                >×</button>
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };

  return (
    <div>
      <h2>Team Selection (Drag & Drop Characters)</h2>
      {renderCharacterPool()}
      {[1,2,3,4,5].map(gameNumber => (
        <div key={gameNumber} style={{ marginBottom: '20px', border: '1px solid var(--border-color)', padding: '10px', borderRadius: '4px' }}>
          <h3>Game {gameNumber}</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '48%' }}>
              <h4>Your Team</h4>
              {renderTeamArea(gameNumber, 'yourTeam', teams[`game${gameNumber}`].yourTeam)}
            </div>
            <div style={{ width: '48%' }}>
              <h4>Opponent Team</h4>
              {renderTeamArea(gameNumber, 'oppTeam', teams[`game${gameNumber}`].oppTeam)}
            </div>
          </div>
        </div>
      ))}
      <DragDropContext onDragEnd={onDragEnd}>
        {/* All droppable areas are rendered above inside the context */}
      </DragDropContext>
    </div>
  );
}
