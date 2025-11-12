import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, getUser, clearAuth } from '../api';

export default function Header() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/dashboard" className="logo">
            <span className="logo-icon">🏥</span>
            <span className="logo-text">MedBook</span>
          </Link>

          <nav className="nav">
            {isAuthenticated() ? (
              <>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <Link to="/doctors" className="nav-link">Doctors</Link>
                <Link to="/appointments" className="nav-link">My Appointments</Link>
                <div className="user-menu">
                  <span className="user-name">👤 {user?.name}</span>
                  <button onClick={handleLogout} className="btn btn-outline">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/signup" className="btn btn-primary">Sign Up</Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
