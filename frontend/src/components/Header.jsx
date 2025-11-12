import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { isAuthenticated, getUser, clearAuth } from '../api';

export default function Header() {
  const navigate = useNavigate();
  const user = getUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    clearAuth();
    setShowDropdown(false);
    navigate('/');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🏥</span>
            <span className="logo-text">MedBook</span>
          </Link>

          <nav className="nav">
            {isAuthenticated() ? (
              <>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <Link to="/doctors" className="nav-link">Doctors</Link>
                <Link to="/appointments" className="nav-link">My Appointments</Link>
                <div className="user-menu">
                  <div className="user-dropdown" ref={dropdownRef}>
                    <button className="user-name-btn" onClick={toggleDropdown}>
                      👤 {user?.name} <span className="dropdown-arrow">{showDropdown ? '▲' : '▼'}</span>
                    </button>
                    {showDropdown && (
                      <div className="dropdown-menu">
                        <Link to="/dashboard" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                          📊 Dashboard
                        </Link>
                        <Link to="/appointments" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                          📅 My Appointments
                        </Link>
                        <div className="dropdown-divider"></div>
                        <button onClick={handleLogout} className="dropdown-item logout-item">
                          🚪 Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/" className="nav-link">Home</Link>
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
