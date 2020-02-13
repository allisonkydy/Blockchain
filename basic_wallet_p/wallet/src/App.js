import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import IdForm from './components/IdForm';
import { useLocalStorage } from './hooks/useLocalStorage';

const serverURI = 'http://localhost:5000'

function App() {
  const [id, setId] = useLocalStorage('id', null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (id !== null) {
      axios.get(serverURI + '/chain')
        .then(res => {
          const allTransactions = res.data.chain.map(block => block.transactions).flat();
          const myTransactions = allTransactions.filter(t => {
            return t.recipient === id || t.sender === id;
          })
          // console.log(myTransactions)
          setTransactions(myTransactions);
        })
        .catch(err => console.log(err))

    }
  }, [id])

  const handleId = (new_id) => {
    setId(new_id);
  }

  return id === null ? (
    <IdForm handleId={handleId} />
  ) : (
    <div className="App">
      <h1>
        what's up {id}
      </h1>
      <button onClick={() => setId(null)}>edit id</button>
      <h2>Past transactions: </h2>
      {transactions.map(t => {
        return (
          <ul>
            <li>
              Sender: {t.sender}
            </li>
            <li>
              Recipient: {t.recipient}
            </li>
            <li>
              Amount: {t.amount}
            </li>
          </ul>
        )
      })}
    </div>
  );
}

export default App;
