import React, { useState } from 'react';

const Counter = () => {
    const [currentCount, setCurrentCount] = useState(0);
    const incrementCounter = () => {
        setCurrentCount(currentCount+1)
    }
    return (
      <div>
        <h1>Counter</h1>

        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">Current count: <strong>{currentCount}</strong></p>

        <button className="btn btn-primary" onClick={incrementCounter}>Increment</button>
      </div>
    );
}
export { Counter };