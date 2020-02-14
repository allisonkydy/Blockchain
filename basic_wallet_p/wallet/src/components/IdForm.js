import React, { useState } from 'react';
import submitIcon from '../assets/enter.svg';

const IdForm = ({ handleId }) => {
    const [input, setInput] = useState("");

    const handleInput = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("changing id to: ", input);
        handleId(input);
        setInput("");
    }

    return (
        <form className="id-form" onSubmit={handleSubmit}>
            <input 
                type="text"
                value={input}
                onChange={e => handleInput(e)}
                autoFocus={true}
            />
            <button
                type="submit"
                className="btn"
            >
                <img className="icon" src={submitIcon} />
            </button>
        </form>
    );
}
 
export default IdForm;