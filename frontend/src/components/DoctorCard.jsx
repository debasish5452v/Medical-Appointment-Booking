export default function DoctorCard({ doctor, onBook }) {
  return (
    <div className="card doctor-card">
      <div className="doctor-image">
        {doctor.imageUrl ? (
          <img src={doctor.imageUrl} alt={doctor.name} />
        ) : (
          <div className="doctor-placeholder">👨‍⚕️</div>
        )}
      </div>
      
      <div className="card-body">
        <h3 className="card-title">{doctor.name}</h3>
        <p className="card-subtitle">{doctor.specialization}</p>
        
        {doctor.qualification && (
          <p className="doctor-info">🎓 {doctor.qualification}</p>
        )}
        
        {doctor.experience > 0 && (
          <p className="doctor-info">⏱️ {doctor.experience} years experience</p>
        )}
        
        {doctor.consultationFee > 0 && (
          <p className="doctor-info">💰 ${doctor.consultationFee} consultation fee</p>
        )}
        
        {doctor.bio && (
          <p className="doctor-bio">{doctor.bio}</p>
        )}
        
        <div className="doctor-contact">
          <p>📧 {doctor.email}</p>
          <p>📞 {doctor.phone}</p>
        </div>
      </div>
      
      <div className="card-footer">
        <button 
          onClick={() => onBook(doctor)} 
          className="btn btn-primary btn-block"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}
