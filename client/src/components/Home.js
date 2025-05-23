import { useAuth } from '../hooks/AuthProvider';
import Logout from '../components/Logout';
import LoginForm from '../components/LoginForm';
const Home = () => {
  const auth = useAuth();
  return (
    <div>
      <div>
        <h1>Welcome! {auth.user ? auth.user.username : ''}</h1>
        {!auth.user ? <LoginForm /> : <Logout />}
      </div>
    </div>
  );
};

export default Home;
