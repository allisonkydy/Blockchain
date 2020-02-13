import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import IdForm from './components/IdForm';
import { useLocalStorage } from './hooks/useLocalStorage';

const serverURI = 'http://localhost:5000'

function App() {
  const [id, setId] = useLocalStorage('id', null);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(null);

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
          getBalance(myTransactions);
        })
        .catch(err => console.log(err))

    }
  }, [id])

  const handleId = (new_id) => {
    setId(new_id);
  }

  const getBalance = (transactions) => {
    // sum amounts where id is sender (paid)
    const amountPaid = transactions.reduce((acc, cur) => {
      if (cur.sender === id) {
        return acc + cur.amount
      }
      return acc
    }, 0)
    // sum amounts where id is recipient (earned)
    const amountEarned = transactions.reduce((acc, cur) => {
      if (cur.recipient === id) {
        return acc + cur.amount
      }
      return acc
    }, 0)
    // subtract amount paid from amount earned to find balance
    setBalance((amountEarned - amountPaid).toFixed(2));
  }

  return id === null ? (
    <IdForm handleId={handleId} />
  ) : (
    <div className="App">
      <h1>
        what's up {id}
      </h1>
      <button onClick={() => setId(null)}>change id</button>
      <h2>Current balance:</h2>
      <p>${balance}</p>
      <h2>Past transactions: </h2>
      {transactions.map((t, index) => {
        return (
          <ul key={index}>
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
