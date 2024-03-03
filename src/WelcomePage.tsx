import { useCookies, Cookies } from 'react-cookie';
import { configuration as config } from './configuration';
import { useNavigate } from 'react-router-dom';

function WelcomePage(props: { userEmail: string }) {
  const [userCookies, setUserCookies] = useCookies(['userEmail']);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const logOutUser = async (e: any) => {
    const apiBody = JSON.stringify({ email: userCookies.userEmail });
    try {
      const response = await fetch(`${config().backendUrl}/auth/logout`, {
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
      cookies.remove('tokens', { path: '/' });
      cookies.remove('userEmail', { path: '/' });
      navigate('/login');
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      <h1>Welcome, {props.userEmail}</h1>
      <button onClick={logOutUser}>LOGOUT</button>
    </>
  );
}

export default WelcomePage;
