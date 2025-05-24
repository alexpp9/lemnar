import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
// import Logout from './components/Logout';
import CreateItemForm from './components/CreateItemForm';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import IndexPage from './components/IndexPage';
import ItemDetails from './components/ItemDetails';
import UpdateItemForm from './components/UpdateItemForm';
// Context + Router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthProvider from './hooks/AuthProvider';
// import { useAuth } from './hooks/AuthProvider';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            {/* Route to login */}
            <Route path="/" element={<IndexPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/details" element={<ItemDetails />} />
            <Route path="/update" element={<UpdateItemForm />} />
            {/* Goes through the PrivateRoute, if it passes, takes me home. Otherwise, PrivateRoute login redirect to /login */}
            <Route element={<PrivateRoute />}>
              <Route path="/addItem" element={<CreateItemForm />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
