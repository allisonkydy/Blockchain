import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import IdForm from './components/IdForm';
import { useLocalStorage } from './hooks/useLocalStorage';
import editIcon from './assets/pencil.svg';
import PayForm from './components/PayForm';

const serverURI = 'http://localhost:5000'

function App() {
  const [id, setId] = useLocalStorage('id', null);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(null);

  const getTransactions = () => {
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

  useEffect(() => {
    if (id !== null) {
      getTransactions()
    }
  }, [id])

  const handleId = (new_id) => {
    setId(new_id);
  }

  const getBalance = (transactions) => {
    // sum amounts where id is sender (paid)
    const amountPaid = transactions.reduce((acc, cur) => {
      if (cur.sender === id) {
        return acc + +cur.amount
      }
      return acc
    }, 0)
    // sum amounts where id is recipient (earned)
    const amountEarned = transactions.reduce((acc, cur) => {
      if (cur.recipient === id) {
        return acc + +cur.amount
      }
      return acc
    }, 0)
    // subtract amount paid from amount earned to find balance
    setBalance((amountEarned - amountPaid).toFixed(2));
  }

  const payCoins = (input) => {
    axios.post(serverURI + '/transaction/new', {...input, 'sender': id})
      .then(res => {
        console.log(res)
        getTransactions()
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="App">
      <h1>wallet</h1>
      <div className="id">
        <h2>what's up </h2>
        {id === null ? (
          <IdForm handleId={handleId} />
        ) : (
          <>
            <h2>{id}</h2>
            <button className="btn edit-btn" onClick={() => setId(null)}><img className="icon" src={editIcon} /></button>
          </>
        )}
      </div>
      {id && (
      <div className="display">
        <div>
          <h3>past transactions: </h3>
          {transactions.map((t, index) => {
            return (
              <ul key={index} className={t.sender === id ? "paid" : "earned"}>
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
        <div>
          <h3>current balance:</h3>
          <p>${balance}</p>
          <h3>pay coins:</h3>
          <PayForm payCoins={payCoins} />
        </div>
      </div>
      )}
    </div>
  );
}

export default App;
