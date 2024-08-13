import React, { useState, useEffect } from 'react';

function Clock () {
  const [date, setDate] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timerID = setInterval(() => {
      setDate(new Date().toLocaleTimeString());
      }, 1000);
        return () => {
          clearInterval(timerID);
        };
    });

  return (
    <div>
      <h5>{date}</h5>
    </div>
  );
};

export default Clock;