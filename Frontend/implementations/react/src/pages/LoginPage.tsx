import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backround from '../assets/images/backround.png';
import documentation from '../static_text/documentation'
import userguide from '../static_text/userguide'
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
    navigate('/projects');
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
            left: 'calc(40vw + 8px)', // Only dim the right side
            width: 'calc(60vw)',
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
          width: '40vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          color: 'white',
          padding: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '10px',
          minHeight: '60vh', // Ensure the form does not collapse
          overflowY: 'auto', // Enable scrolling if needed
          paddingBottom: '20px', // Prevent form fields from overlapping buttons

        }}
      >
        <div
          style={{
            marginTop:'20%',
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
        {/* <div style={{height:'25%'}}/> */}
        <div style={{ width: '80%'}}>
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
          width: '40vw',
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
          zIndex:5,
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
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            display: 'flex',
            gap: '10px',
            zIndex: 10, // Ensure buttons stay above the text
          }}
        >
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
              border: 'none',
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
              backgroundColor: activeText === 'text2' ? '#666' : 'transparent',
              color: 'white',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.3s, border 0.3s',
            }}
          >
            Documentation
          </button>
        </div>

        {/* Display Active Text */}
        <div
          style={{
            position: 'absolute',
            top: '100px', // Place it below the buttons
            right: '20px',
            width: '50vw', // Adjust width as needed
            maxHeight: 'calc(100vh - 130px)', // Limit height so it doesn't go beyond the screen
            overflowY: 'auto', // Make content scrollable when it exceeds the container height
            backgroundColor: 'transparent', // Slight background for readability
            padding: '10px',
            borderRadius: '5px',
            color: 'white',
            textAlign: 'left',
          }}
        >
          <style>
          {`
            /* For Chrome, Edge, and Safari */
            div::-webkit-scrollbar {
              width: 8px;
            }

            div::-webkit-scrollbar-track {
              background: transparent;
            }

            div::-webkit-scrollbar-thumb {
              background: rgba(150, 150, 150, 0.5);
              border-radius: 10px;
            }

            div::-webkit-scrollbar-thumb:hover {
              background: rgba(150, 150, 150, 0.7);
            }
          `}
        </style>
          {activeText === 'text1' && (
            <div dangerouslySetInnerHTML={{ __html: userguide }} />
          )}
          {activeText === 'text2' && (
            <div dangerouslySetInnerHTML={{ __html: documentation }} />
          )}
        </div>

      </div>
    </div>
  );
}
