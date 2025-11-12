import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchDoctors, createAppointment } from '../api';
import Loading from '../components/Loading';
import { format, addDays, setHours, setMinutes } from 'date-fns';

export default function BookAppointment() {
  const navigate = useNavigate();
  const location = useLocation();
  const preSelectedDoctor = location.state?.doctor;

  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: preSelectedDoctor?._id || '',
    date: '',
    timeSlot: '',
    reason: '',
    symptoms: ''
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadDoctors();
  }, []);

  useEffect(() => {
    if (formData.date) {
      generateTimeSlots();
    }
  }, [formData.date]);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const data = await fetchDoctors();
      setDoctors(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    const start = 9; // 9 AM
    const end = 17; // 5 PM
    
    for (let hour = start; hour < end; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    
    setAvailableSlots(slots);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    // Validation
    if (!formData.doctorId || !formData.date || !formData.timeSlot) {
      setError('Please fill in all required fields');
      setSubmitting(false);
      return;
    }

    try {
      await createAppointment(formData);
      setSuccess('Appointment booked successfully!');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Get minimum date (today)
  const minDate = format(new Date(), 'yyyy-MM-dd');
  // Get maximum date (60 days from now)
  const maxDate = format(addDays(new Date(), 60), 'yyyy-MM-dd');

  if (loading) return <Loading />;

  const selectedDoctor = doctors.find(d => d._id === formData.doctorId);

  return (
    <div className="container">
      <div className="page-header">
        <h1>Book an Appointment</h1>
        <p>Schedule your medical consultation</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="booking-container">
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label htmlFor="doctorId">Select Doctor *</label>
            <select
              id="doctorId"
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              required
            >
              <option value="">Choose a doctor...</option>
              {doctors.map(doctor => (
                <option key={doctor._id} value={doctor._id}>
                  Dr. {doctor.name} - {doctor.specialization}
                  {doctor.consultationFee > 0 && ` ($${doctor.consultationFee})`}
                </option>
              ))}
            </select>
          </div>

          {selectedDoctor && (
            <div className="doctor-info-box">
              <h3>👨‍⚕️ Dr. {selectedDoctor.name}</h3>
              <p><strong>Specialization:</strong> {selectedDoctor.specialization}</p>
              {selectedDoctor.qualification && (
                <p><strong>Qualification:</strong> {selectedDoctor.qualification}</p>
              )}
              {selectedDoctor.experience > 0 && (
                <p><strong>Experience:</strong> {selectedDoctor.experience} years</p>
              )}
              {selectedDoctor.consultationFee > 0 && (
                <p><strong>Consultation Fee:</strong> ${selectedDoctor.consultationFee}</p>
              )}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Select Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={minDate}
                max={maxDate}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="timeSlot">Select Time Slot *</label>
              <select
                id="timeSlot"
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleChange}
                required
                disabled={!formData.date}
              >
                <option value="">Choose a time...</option>
                {availableSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="reason">Reason for Visit</label>
            <input
              type="text"
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="e.g., Regular checkup, Follow-up visit"
            />
          </div>

          <div className="form-group">
            <label htmlFor="symptoms">Symptoms (Optional)</label>
            <textarea
              id="symptoms"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              placeholder="Describe any symptoms you're experiencing..."
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Booking...' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
