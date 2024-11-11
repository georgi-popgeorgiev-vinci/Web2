import React, { useState } from "react";
import './ClickCounter.css';

interface ClickCounterProps {
    title : string; 
    on10Click ?: string;
    onMouseHover ?: string;
}

const ClickCounter = ({title, on10Click = "Master of clicks", onMouseHover = "Click Here"} : ClickCounterProps) => {

    const [count, setCount] = useState(0);
    const [hover, setHover] = useState(false);

    return (
    
    <div className="card">
        <h4>{title}</h4>
        {hover ? <p>{onMouseHover}</p> : null}
        <button onClick={() => setCount((count) => count + 1)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false) }>
          count is {count}
        </button>
        {count >= 10 ? <p>{on10Click}</p> : null}
    </div>
    );
};

export default ClickCounter;