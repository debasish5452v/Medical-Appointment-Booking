import { format } from 'date-fns';
import { useState } from 'react';
import AgoraCall from './AgoraCall';

export default function AppointmentCard({ appointment, onCancel }) {
  const [showVideoCall, setShowVideoCall] = useState(false);

  const getStatusBadge = (status) => {
    const badges = {
      booked: 'badge badge-success',
      cancelled: 'badge badge-danger',
      completed: 'badge badge-info',
      'no-show': 'badge badge-warning'
    };
    return badges[status] || 'badge';
  };

  const isPast = new Date(appointment.date) < new Date();
  const canCancel = appointment.status === 'booked' && !isPast;
  const canJoinCall = appointment.status === 'booked' && !isPast;

  if (showVideoCall) {
    return (
      <div className="card appointment-card video-call-active">
        <div className="card-header">
          <h3 className="card-title">Video Call - Dr. {appointment.doctor?.name}</h3>
          <button 
            onClick={() => setShowVideoCall(false)}
            className="btn btn-sm"
          >
            ← Back to Appointments
          </button>
        </div>
        <AgoraCall 
          channelName={appointment._id} 
          onLeave={() => setShowVideoCall(false)}
        />
      </div>
    );
  }

  return (
    <div className="card appointment-card">
      <div className="card-header">
        <div>
          <h3 className="card-title">Dr. {appointment.doctor?.name}</h3>
          <p className="card-subtitle">{appointment.doctor?.specialization}</p>
        </div>
        <span className={getStatusBadge(appointment.status)}>
          {appointment.status}
        </span>
      </div>
      
      <div className="card-body">
        <div className="info-row">
          <span className="info-label">📅 Date:</span>
          <span className="info-value">
            {format(new Date(appointment.date), 'MMMM d, yyyy')}
          </span>
        </div>
        
        <div className="info-row">
          <span className="info-label">🕐 Time:</span>
          <span className="info-value">{appointment.timeSlot}</span>
        </div>
        
        {appointment.reason && (
          <div className="info-row">
            <span className="info-label">📋 Reason:</span>
            <span className="info-value">{appointment.reason}</span>
          </div>
        )}
        
        {appointment.doctor?.consultationFee && (
          <div className="info-row">
            <span className="info-label">💰 Fee:</span>
            <span className="info-value">₹{appointment.doctor.consultationFee}</span>
          </div>
        )}
      </div>
      
      {canCancel && onCancel && (
        <div className="card-footer">
          {canJoinCall && (
            <button 
              onClick={() => setShowVideoCall(true)}
              className="btn btn-primary btn-sm"
              style={{ marginRight: '10px' }}
            >
              🎥 Join Video Call
            </button>
          )}
          <button 
            onClick={() => onCancel(appointment._id)} 
            className="btn btn-danger btn-sm"
          >
            Cancel Appointment
          </button>
        </div>
      )}
    </div>
  );
}
