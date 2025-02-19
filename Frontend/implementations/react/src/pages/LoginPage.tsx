import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backround from '../assets/images/backround.png';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organization, setOrganization] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [activeText, setActiveText] = useState<string | null>(null);
  const [getStarted, setGetStarted] = useState<boolean>(false)

  const handleAuth = () => {
    // Add authentication logic here
    navigate('/');
  };

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
      {activeText && (
       <div
          style={{
            position: 'absolute',
            top: 0,
            left: '40%', // Only dim the right side
            width: '60%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dim effect
          }}
        /> 
      )}
      {getStarted ? (
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '40%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          color: 'white',
          padding: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '10px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '20%',
            display: 'flex',
            gap: '10px',
          }}
        >
          <button
            onClick={() => setIsSignUp(false)}
            style={{
              padding: '10px 20px',
              cursor: 'pointer',
              background: !isSignUp ? 'gray' : 'transparent',
              border: 'none',
              borderRadius: '5px',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            style={{
              padding: '10px 20px',
              cursor: 'pointer',
              background: isSignUp ? 'gray' : 'transparent',
              border: 'none',
              borderRadius: '5px',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Sign Up
          </button>
        </div>

        <div style={{ marginTop: '150px', width: '80%', paddingTop: '150px' }}>
          <h2>{isSignUp ? 'Create an Account' : 'Sign In'}</h2>
          <label style={{ color: 'white', fontWeight: 'bold', display: 'block', textAlign: 'left' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
          />
          {isSignUp && (
            <>
              <label style={{ color: 'white', fontWeight: 'bold', display: 'block', textAlign: 'left' }}>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
              />
              <label style={{ color: 'white', fontWeight: 'bold', display: 'block', textAlign: 'left' }}>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
              />
            </>
          )}
          <label style={{ color: 'white', fontWeight: 'bold', display: 'block', textAlign: 'left' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
          />
          <label style={{ color: 'white', fontWeight: 'bold', display: 'block', textAlign: 'left' }}>Organization</label>
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
          />
          
          <button
            onClick={handleAuth}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              cursor: 'pointer',
              background: 'gray',
              border: 'none',
              borderRadius: '5px',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Next
          </button>
        </div>
      </div>
      ) : (
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
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dim effect

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
          onClick={() => setGetStarted(true)}
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
      )}
      <div
        style={{
          width: '3px',
          backgroundColor: 'cyan',
          height: '100vh',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 2, // Ensure it's above the dim overlay
          width: '60%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          color: 'white',
        }}
        onClick={(e) => e.stopPropagation()} // Prevent click from resetting activeText when clicking inside right section
      >
        {/* Top Right Buttons */}
        <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '10px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent click from propagating to the parent div
              setActiveText('text1');
            }}
            style={{
              padding: '10px 15px',
              fontSize: '1rem',
              backgroundColor: activeText === 'text1' ? '#666' : 'transparent', // Gray when selected, transparent otherwise
              color: 'white',
              borderRadius: '5px',
              border: 'None',
              cursor: 'pointer',
              transition: 'background 0.3s, border 0.3s',
            }}
          >
            User Guide
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveText('text2');
            }}
            style={{
              padding: '10px 15px',
              fontSize: '1rem',
              backgroundColor: activeText === 'text2' ? '#666' : 'transparent', // Gray when selected, transparent otherwise
              color: 'white',
              borderRadius: '5px',
              border: 'None',
              cursor: 'pointer',
              transition: 'background 0.3s, border 0.3s',
            }}
          >
            Documentation
          </button>
        </div>

        {/* Display Active Text */}
        <div style={{ textAlign: 'center', maxWidth: '80%', fontSize: '1.2rem' }}>
          {activeText === 'text1' && <p>User Guide</p>}
          {activeText === 'text2' && <p>Documentation</p>}
        </div>
      </div>
    </div>
  );
}
