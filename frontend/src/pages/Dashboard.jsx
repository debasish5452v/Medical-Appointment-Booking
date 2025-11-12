import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser, fetchAppointments, cancelAppointment } from '../api';
import AppointmentCard from '../components/AppointmentCard';
import Loading from '../components/Loading';

export default function Dashboard() {
  const user = getUser();
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUpcomingAppointments();
  }, []);

  const loadUpcomingAppointments = async () => {
    try {
      setLoading(true);
      const data = await fetchAppointments(true);
      setUpcomingAppointments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      await cancelAppointment(id, 'Cancelled by patient');
      loadUpcomingAppointments();
    } catch (err) {
      alert('Failed to cancel appointment: ' + err.message);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user?.name}! 👋</h1>
          <p className="subtitle">Manage your medical appointments</p>
        </div>
        <Link to="/book-appointment" className="btn btn-primary">
          📅 Book New Appointment
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <div className="stat-value">{upcomingAppointments.length}</div>
            <div className="stat-label">Upcoming Appointments</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👨‍⚕️</div>
          <div className="stat-content">
            <div className="stat-value">
              <Link to="/doctors" className="link">View All</Link>
            </div>
            <div className="stat-label">Available Doctors</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <div className="stat-value">
              <Link to="/appointments" className="link">View History</Link>
            </div>
            <div className="stat-label">Appointment History</div>
          </div>
        </div>
      </div>

      <section className="dashboard-section">
        <h2>Upcoming Appointments</h2>
        
        {upcomingAppointments.length === 0 ? (
          <div className="empty-state">
            <p>📅 No upcoming appointments</p>
            <Link to="/book-appointment" className="btn btn-primary">
              Book Your First Appointment
            </Link>
          </div>
        ) : (
          <div className="appointments-grid">
            {upcomingAppointments.map(appointment => (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                onCancel={handleCancelAppointment}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
