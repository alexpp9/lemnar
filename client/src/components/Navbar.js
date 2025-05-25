// import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
const Navbar = () => {
  // Hook instance;
  const auth = useAuth();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a href="/" className="navbar-brand d-flex align-items-center">
            <img
              src="/logo.png"
              alt="Lemnar company logo"
              className="rounded"
              style={{ height: '48px', width: '48px', objectFit: 'cover' }}
            />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto align-items-center gap-2">
              <a className="nav-item nav-link active" href="/home">
                Home
              </a>

              {!auth.user ? (
                <>
                  <a className="nav-item nav-link" href="/login">
                    Login
                  </a>
                  <a className="nav-item nav-link" href="/register">
                    Register
                  </a>
                </>
              ) : (
                <button className="btn btn-danger" onClick={auth.logOut}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
