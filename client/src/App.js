// Authorization related Components
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import PrivateRoute from './components/PrivateRoute';
import AuthProvider from './hooks/AuthProvider';
// Item related components
import CreateItemForm from './components/CreateItemForm';
import ItemDetails from './components/ItemDetails';
import UpdateItemForm from './components/UpdateItemForm';

// Webapp structure related
import Home from './components/Home';
import IndexPage from './components/IndexPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// React Router - navigation import
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              {/* Route to login */}
              <Route path="/" element={<IndexPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/details" element={<ItemDetails />} />

              {/* Private routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/addItem" element={<CreateItemForm />} />
                <Route path="/update" element={<UpdateItemForm />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
