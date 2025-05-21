import axios from 'axios';

const Logout = () => {
  // Axios instance
  const client = axios.create({
    baseURL: 'http://localhost:3000',
  });
  // Form Submission
  const handleLogout = (e) => {
    e.preventDefault();

    userLogout();
  };

  // API POST CALL
  const userLogout = (username, email, password) => {
    client
      .post('/logoutUser')
      .then((response) => {
        console.log('User logged out!');
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    // // Set locally
    // localStorage.setItem('lemnar_username', '');
    // localStorage.setItem('lemnar_loginStatus', false);
    // localStorage.setItem('lemnar_loginTime', null);
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
