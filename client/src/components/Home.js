import { useAuth } from '../hooks/AuthProvider';
import Logout from '../components/Logout';
import LoginForm from '../components/LoginForm';
import CreateItemForm from './CreateItemForm';
const Home = () => {
  const auth = useAuth();
  return (
    <div>
      <div>
        <h1>Welcome! {auth.user ? auth.user.username : ''}</h1>
        {!auth.user ? <LoginForm /> : <Logout />}
        {auth.user && auth.user.isAdmin ? <CreateItemForm /> : ''}
      </div>
    </div>
  );
};

export default Home;
