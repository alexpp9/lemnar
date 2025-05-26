import { useAuth } from '../../hooks/AuthProvider';
const Logout = () => {
  // hook instance
  const auth = useAuth();
  // Form Submission
  const handleLogout = (e) => {
    e.preventDefault();

    auth.logOut();
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
