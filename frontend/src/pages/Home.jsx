import { Link } from 'react-router-dom';
import { isAuthenticated } from '../api';

export default function Home() {
  const authenticated = isAuthenticated();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Your Health, Our Priority
              </h1>
              <p className="hero-subtitle">
                Book appointments with top doctors and specialists. 
                Get quality healthcare at your convenience.
              </p>
              <div className="hero-buttons">
                {authenticated ? (
                  <>
                    <Link to="/dashboard" className="btn btn-primary btn-large">
                      Go to Dashboard
                    </Link>
                    <Link to="/doctors" className="btn btn-outline btn-large">
                      Browse Doctors
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/signup" className="btn btn-primary btn-large">
                      Get Started
                    </Link>
                    <Link to="/login" className="btn btn-outline btn-large">
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-card">
                <div className="hero-card-icon">🏥</div>
                <h3>24/7 Healthcare</h3>
                <p>Book appointments anytime, anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Us?</h2>
            <p>Experience healthcare like never before</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👨‍⚕️</div>
              <h3>Expert Doctors</h3>
              <p>Access to qualified and experienced medical professionals</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Easy Booking</h3>
              <p>Simple and quick appointment scheduling process</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>Your health data is protected with advanced security</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h3>Flexible Timing</h3>
              <p>Choose appointment slots that fit your schedule</p>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section className="specializations-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Specializations</h2>
            <p>Find the right specialist for your needs</p>
          </div>
          <div className="specializations-grid">
            <div className="specialization-card">
              <div className="spec-icon">❤️</div>
              <h4>Cardiology</h4>
            </div>
            <div className="specialization-card">
              <div className="spec-icon">🧠</div>
              <h4>Neurology</h4>
            </div>
            <div className="specialization-card">
              <div className="spec-icon">👁️</div>
              <h4>Ophthalmology</h4>
            </div>
            <div className="specialization-card">
              <div className="spec-icon">🦴</div>
              <h4>Orthopedics</h4>
            </div>
            <div className="specialization-card">
              <div className="spec-icon">👶</div>
              <h4>Pediatrics</h4>
            </div>
            <div className="specialization-card">
              <div className="spec-icon">🩺</div>
              <h4>Dermatology</h4>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Get started in 3 simple steps</p>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">📝</div>
              <h3>Create Account</h3>
              <p>Sign up with your basic information in seconds</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">🔍</div>
              <h3>Find Doctor</h3>
              <p>Browse through our list of qualified specialists</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">✅</div>
              <h3>Book Appointment</h3>
              <p>Choose your preferred time slot and confirm booking</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of patients who trust us with their healthcare</p>
            {authenticated ? (
              <Link to="/book-appointment" className="btn btn-primary btn-large">
                Book Appointment Now
              </Link>
            ) : (
              <Link to="/signup" className="btn btn-primary btn-large">
                Sign Up Today
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>🏥 MediCare</h3>
              <p>Your trusted healthcare partner</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/doctors">Doctors</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>📧 support@medicare.com</p>
              <p>📞 +1 (555) 123-4567</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Medical Appointment System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
