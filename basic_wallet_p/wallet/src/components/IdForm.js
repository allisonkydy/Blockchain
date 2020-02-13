import React, { useState } from 'react';

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
        <form onSubmit={handleSubmit}>
            <label>
                Enter id:
                <input 
                    type="text"
                    value={input}
                    onChange={e => handleInput(e)}
                />
            </label>
            <button
                type="submit"
            >
                Submit
            </button>
        </form>
    );
}
 
export default IdForm;