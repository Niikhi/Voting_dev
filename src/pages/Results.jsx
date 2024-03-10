import React, { useState } from 'react';

const Results = () => {
  const [electionsCompleted, setElectionsCompleted] = useState(true);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const contentStyle = {
    textAlign: 'center',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#232a32',
  };

  const headerStyle = {
    fontSize: '2rem',
    color: '#b95ce0',
    marginBottom: '1rem',
  };

  const textStyle = {
    fontSize: '1.5rem',
    color: '#fff',
    marginBottom: '2rem',
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {electionsCompleted ? (
          <div>
            <h2 style={headerStyle}>Results</h2>
            <p style={textStyle}>Party XYZ won the elections!</p>
          </div>
        ) : (
          <div>
            <h2 style={headerStyle}>Elections Not Completed</h2>
            <p style={textStyle}>Come back again to view the results.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
