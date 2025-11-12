import { useEffect, useState } from 'react';
import { fetchDoctors } from '../api';
import DoctorCard from '../components/DoctorCard';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';

export default function Doctors() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDoctors();
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [doctors, selectedSpecialization, searchTerm]);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const data = await fetchDoctors();
      setDoctors(data);
      
      // Extract unique specializations
      const specs = [...new Set(data.map(d => d.specialization))];
      setSpecializations(specs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterDoctors = () => {
    let filtered = doctors;

    if (selectedSpecialization) {
      filtered = filtered.filter(d => d.specialization === selectedSpecialization);
    }

    if (searchTerm) {
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDoctors(filtered);
  };

  const handleBookAppointment = (doctor) => {
    navigate('/book-appointment', { state: { doctor } });
  };

  if (loading) return <Loading />;

  return (
    <div className="container">
      <div className="page-header">
        <h1>Our Doctors</h1>
        <p>Find and book appointments with our qualified medical professionals</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search doctors by name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <label>Filter by Specialization:</label>
          <select
            value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
            className="filter-select"
          >
            <option value="">All Specializations</option>
            {specializations.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredDoctors.length === 0 ? (
        <div className="empty-state">
          <p>No doctors found matching your criteria</p>
        </div>
      ) : (
        <div className="doctors-grid">
          {filteredDoctors.map(doctor => (
            <DoctorCard
              key={doctor._id}
              doctor={doctor}
              onBook={handleBookAppointment}
            />
          ))}
        </div>
      )}
    </div>
  );
}
