import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backround from '../assets/images/backround.png';

const GettingStarted: React.FC = () => {
  const navigate = useNavigate();
  const [activeText, setActiveText] = useState<string | null>('text1');

  return (
    <div
      style={{
        backgroundImage: `url(${backround})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        position: 'relative',
        display: 'flex',
      }}
    >
      {/* Dim overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dim effect
        }}
      ></div>

      {/* Left Section */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '40%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: 'white',
          padding: '20px',
        }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
          Positive Energy Districts
        </h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '80%' }}>
          Empowering Sustainable Cities<br />
          Explore, Compare & Optimize Energy for a Greener Future
        </p>

        {/* Get Started Button */}
        <button
          onClick={() => navigate('/login')}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '1rem',
            backgroundColor: '#888',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#666')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#888')}
        >
          Get started
        </button>
      </div>

      {/* Cyan Line Divider */}
      <div
        style={{
          width: '3px',
          backgroundColor: 'cyan',
          height: '100vh',
        }}
      ></div>

      {/* Right Section */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '60%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          color: 'white',
        }}
      >
        {/* Top Right Buttons */}
        <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '10px' }}>
        <button
            onClick={() => setActiveText('text1')}
            style={{
            padding: '10px 15px',
            fontSize: '1rem',
            backgroundColor: activeText === 'text1' ? '#666' : 'transparent', // Gray when selected, transparent otherwise
            color: 'white',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background 0.3s, border 0.3s',
            }}
        >
            Show Text 1
        </button>
        <button
            onClick={() => setActiveText('text2')}
            style={{
            padding: '10px 15px',
            fontSize: '1rem',
            backgroundColor: activeText === 'text2' ? '#666' : 'transparent', // Gray when selected, transparent otherwise
            color: 'white',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background 0.3s, border 0.3s',
            }}
        >
            Show Text 2
        </button>
        </div>



        {/* Display Active Text */}
        <div style={{ textAlign: 'center', maxWidth: '80%', fontSize: '1.2rem' }}>
          {activeText === 'text1' && <p> This is the content for Text 1. </p>}
          {activeText === 'text2' && <p> This is the content for Text 2. </p>}
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;
