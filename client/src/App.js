// Authorization related Components
import RegisterForm from './components/User/RegisterForm';
import LoginForm from './components/User/LoginForm';
import PrivateRoute from './components/Utilities/PrivateRoute';
import AuthProvider from './hooks/AuthProvider';
// Item related components
import CreateItemForm from './components/Item/CreateItemForm';
import ItemDetails from './components/Item/ItemDetails';
import UpdateItemForm from './components/Item/UpdateItemForm';

// Webapp structure related
import Home from './components/Home';
import Contact from './components/Contact/Contact';
import IndexPage from './components/IndexPage';
import Navbar from './components/Partials/Navbar';
import Footer from './components/Partials/Footer';

// React Router - navigation import
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="vh-100">
      <Router>
        <AuthProvider>
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              {/* Route to login */}
              <Route path="/" element={<IndexPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/home" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
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
