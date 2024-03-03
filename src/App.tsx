import { useCookies } from 'react-cookie';
import SignUp from './SignUp';
import WelcomePage from './WelcomePage';

function App() {
  const [cookies, setCookie] = useCookies(['userEmail']);

  return (
    <>
      <div>{cookies.userEmail ? <WelcomePage userEmail={cookies.userEmail} /> : <SignUp />}</div>
    </>
  );
}

export default App;
