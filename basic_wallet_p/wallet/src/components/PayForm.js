import React, { useState } from 'react';
import submitIcon from '../assets/enter.svg';

const PayForm = ({ payCoins }) => {
    const [input, setInput] = useState({recipient: '', amount: ''});

    const handleInput = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        payCoins(input);
        setInput({recipient: '', amount: ''});
    }

    return (
        <form onSubmit={handleSubmit} className="pay-form">
            <label>
                send to: 
                <input 
                    type="text"
                    name="recipient"
                    value={input.recipient}
                    onChange={e => handleInput(e)}
                />
            </label>
            <label>
                amount:  
                <input 
                    type="text"
                    name="amount"
                    value={input.amount}
                    onChange={e => handleInput(e)}
                />
            </label>
            <button
                type="submit"
                className="btn pay-btn"
            >
                send
            </button>
        </form>
    );
}
 
export default PayForm;