import React, { useState, useEffect } from 'react';
import './App.css'; // Create and import a CSS file for styling

const CircleMover = () => {
  const [position, setPosition] = useState({ top: 50, left: 50 });
  const [circleSize, setCircleSize] = useState(0)
  

  const moveCircle = (event) => {
    const moveAmount = 10;
    setPosition((prevPosition) => {
      switch (event.key) {
        case 'ArrowUp':
          return { ...prevPosition, top: prevPosition.top - moveAmount };
        case 'ArrowDown':
          return { ...prevPosition, top: prevPosition.top + moveAmount };
        case 'ArrowLeft':
          return { ...prevPosition, left: prevPosition.left - moveAmount };
        case 'ArrowRight':
          return { ...prevPosition, left: prevPosition.left + moveAmount };
        default:
          return prevPosition;
      }
    });
  };



  useEffect(() => {
    // Add event listener for keydown events
    document.addEventListener('keydown', moveCircle);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('keydown', moveCircle);
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      <div className="container">
        <div
          className="circle"
          style={{ top: `${position.top}px`,
                   left: `${position.left}px`,
                   width: `${circleSize}px`,
                   height: `${circleSize}px`}}
        ></div>
      </div>

      <div>
        <button onClick={() => setCircleSize((circleSize) => circleSize - 20)}>
          decrease size
        </button>
        <button onClick={() => setCircleSize((circleSize) => circleSize + 20)}>
          increase size
        </button>
      </div>
    </>
  );
};

export default CircleMover;
