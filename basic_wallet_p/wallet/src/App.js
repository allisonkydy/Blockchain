import React, { useEffect } from 'react';
import './App.css';
import IdForm from './components/IdForm';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [id, setId] = useLocalStorage('id', null)

  const handleId = (new_id) => {
    setId(new_id)
  }

  return id === null ? (
    <IdForm handleId={handleId} />
  ) : (
    <div className="App">
      what's up
    </div>
  );
}

export default App;
