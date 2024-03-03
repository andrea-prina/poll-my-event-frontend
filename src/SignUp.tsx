import { FormEvent, useState } from 'react';
import { configuration as config } from './configuration';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [userSignUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const registerUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiBody = JSON.stringify(userSignUpData);
    try {
      const response = await fetch(`${config().backendUrl}/auth/signup`, {
        method: 'POST',
        body: apiBody,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      if (!response.ok) {
        // If response is not OK, throw an error with the error message from the response
        const errorMessage = await response.text(); // Extract error message from response body
        throw new Error(errorMessage);
      }
      // Handle successful response if needed
    } catch (error: any) {
      // Log or handle the error message
      console.error('Error:', error.message);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setSignUpData({ ...userSignUpData, [name]: value });
  };

  return (
    <>
      <h1>Welcome to PollMyEvent - SIGNUP</h1>
      <form
        className="center-element"
        onSubmit={registerUser}
        style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}
      >
        <input
          onChange={handleInputChange}
          style={{ maxWidth: '200px' }}
          type="text"
          name="firstName"
          placeholder="firstName"
        />
        <input
          onChange={handleInputChange}
          style={{ maxWidth: '200px' }}
          type="text"
          name="lastName"
          placeholder="lastName"
        />
        <input
          onChange={handleInputChange}
          style={{ maxWidth: '200px' }}
          type="email"
          name="email"
          placeholder="email"
        />
        <input
          onChange={handleInputChange}
          style={{ maxWidth: '200px' }}
          type="password"
          name="password"
          placeholder="password"
        />
        <button style={{ maxWidth: '100px' }} type="submit">
          Sign Up
        </button>
      </form>
      <p>
        Already signed up? <button onClick={() => navigate('/login')}>LOGIN</button>
      </p>
    </>
  );
}

export default SignUp;
