import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';
const Navbar = () => {
  // Hook instance;
  const auth = useAuth();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img
              src="/logo.png"
              alt="Lemnar company logo"
              className="rounded"
              style={{ height: '58px', width: '58px', objectFit: 'cover' }}
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto align-items-center gap-2">
              <Link className="nav-item nav-link" to="/home">
                Home
              </Link>
              <Link className="nav-item nav-link" to="/contact">
                Contact
              </Link>
              {!auth.user ? (
                <>
                  <Link className="nav-item nav-link" to="/login">
                    Login
                  </Link>
                  <Link className="nav-item nav-link" to="/register">
                    Register
                  </Link>
                </>
              ) : (
                <button className="btn btn-danger" onClick={auth.logOut}>
                  Logout
                </button>
              )}

              {auth.user && auth.user.isAdmin ? (
                <Link className="btn btn-primary" to="/addItem">
                  Add Item
                </Link>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
