import { FormEvent, useState } from 'react';
import { configuration as config } from './configuration';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function LogIn() {
  const [userLogInData, setLogInData] = useState({
    email: '',
    password: '',
  });

  const [tokenCookies, setTokenCookie] = useCookies(['tokens']);
  const [userCookies, setUserCookies] = useCookies(['userEmail']);
  const navigate = useNavigate();

  const logInUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiBody = JSON.stringify(userLogInData);
    try {
      const response = await fetch(`${config().backendUrl}/auth/login`, {
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
      const data: { userEmail: string; tokens: { accessToken: string; refreshToken: string } } = await response.json();

      setTokenCookie('tokens', data.tokens, { path: '/' });
      setUserCookies('userEmail', data.userEmail, { path: '/' });
      navigate('/');
    } catch (error: any) {
      // Log or handle the error message
      console.error('Error:', error.message);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setLogInData({ ...userLogInData, [name]: value });
  };

  return (
    <>
      <h1>Welcome to PollMyEvent - LOGIN</h1>
      <form
        className="center-element"
        onSubmit={logInUser}
        style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}
      >
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
          Log In
        </button>
      </form>
    </>
  );
}

export default LogIn;
