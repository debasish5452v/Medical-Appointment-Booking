import { useEffect, useState } from 'react';
import { fetchAppointments, cancelAppointment } from '../api';
import AppointmentCard from '../components/AppointmentCard';
import Loading from '../components/Loading';

export default function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const data = await fetchAppointments(false);
      setAppointments(data);
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
      loadAppointments();
    } catch (err) {
      alert('Failed to cancel appointment: ' + err.message);
    }
  };

  const getFilteredAppointments = () => {
    const now = new Date();
    
    switch (filter) {
      case 'upcoming':
        return appointments.filter(apt => 
          new Date(apt.date) >= now && apt.status === 'booked'
        );
      case 'past':
        return appointments.filter(apt => 
          new Date(apt.date) < now || apt.status !== 'booked'
        );
      case 'cancelled':
        return appointments.filter(apt => apt.status === 'cancelled');
      default:
        return appointments;
    }
  };

  const filteredAppointments = getFilteredAppointments();

  if (loading) return <Loading />;

  return (
    <div className="container">
      <div className="page-header">
        <h1>My Appointments</h1>
        <p>View and manage all your appointments</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="filter-tabs">
        <button
          className={`tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({appointments.length})
        </button>
        <button
          className={`tab ${filter === 'upcoming' ? 'active' : ''}`}
          onClick={() => setFilter('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`tab ${filter === 'past' ? 'active' : ''}`}
          onClick={() => setFilter('past')}
        >
          Past
        </button>
        <button
          className={`tab ${filter === 'cancelled' ? 'active' : ''}`}
          onClick={() => setFilter('cancelled')}
        >
          Cancelled
        </button>
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="empty-state">
          <p>No appointments found</p>
        </div>
      ) : (
        <div className="appointments-grid">
          {filteredAppointments.map(appointment => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              onCancel={handleCancelAppointment}
            />
          ))}
        </div>
      )}
    </div>
  );
}
