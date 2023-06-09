import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import { AuthContext } from './AuthContext';


const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthenticatedUser } = useContext(AuthContext);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9292/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful sign-in response
        // Redirect to another page, e.g., dashboard
        navigate('/bookings');
        alert(`Successfully logged in as ${data.name}`);
        setAuthenticatedUser(data.user_id);
         console.log(data)
        
      } else {
        alert('Sign-in failed');
      }
    } catch (error) {
      console.log('An error occurred during sign-in:', error);
    }
  };

  return (
    <div className='sign-in-container'>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
