import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Logout from './components/Logout';
import CreateItemForm from './components/CreateItemForm';
// import AuthProvider from './hooks/AuthProvider';

function App() {
  // if (
  //   !localStorage.getItem('lemar_loginStatus') ||
  //   Date.now > localStorage.getItem('lemnar_loginTime') + 86400000
  // ) {
  // }
  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <RegisterForm />
      <LoginForm />
      <Logout />
      <br />
      <CreateItemForm />
    </div>
  );
}

export default App;
