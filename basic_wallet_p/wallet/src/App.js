import React, { useEffect, useState } from 'react';
import './App.css';
import IdForm from './components/IdForm';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [id, setId] = useLocalStorage('id', null)
  const [editingId, setEditingId] = useState(false);

  const handleId = (new_id) => {
    setId(new_id);
    setEditingId(false);
  }

  return id === null || editingId === true ? (
    <IdForm handleId={handleId} />
  ) : (
    <div className="App">
      what's up {id}
      <button onClick={() => setEditingId(true)}>edit id</button>
    </div>
  );
}

export default App;
