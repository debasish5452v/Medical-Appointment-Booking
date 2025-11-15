import { useState, useEffect, useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import axios from 'axios';

const AgoraCall = ({ channelName, onLeave }) => {
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [remoteUsers, setRemoteUsers] = useState([]);

  const clientRef = useRef(null);
  const localVideoTrackRef = useRef(null);
  const localAudioTrackRef = useRef(null);
  const localVideoContainerRef = useRef(null);
  const remoteVideoContainerRef = useRef(null);

  useEffect(() => {
    console.log('AgoraCall component mounted with channelName:', channelName);
    
    // Initialize Agora client
    clientRef.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

    // Event listeners for remote users
    clientRef.current.on('user-published', async (user, mediaType) => {
      await clientRef.current.subscribe(user, mediaType);
      
      if (mediaType === 'video') {
        setRemoteUsers(prev => {
          if (!prev.find(u => u.uid === user.uid)) {
            return [...prev, user];
          }
          return prev;
        });
      }
      
      if (mediaType === 'audio') {
        user.audioTrack?.play();
      }
    });

    clientRef.current.on('user-unpublished', (user, mediaType) => {
      if (mediaType === 'video') {
        setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid));
      }
    });

    clientRef.current.on('user-left', (user) => {
      setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid));
    });

    return () => {
      console.log('AgoraCall component unmounting');
      leaveCall();
    };
  }, []);

  useEffect(() => {
    // Play remote video tracks
    remoteUsers.forEach(user => {
      if (user.videoTrack && remoteVideoContainerRef.current) {
        const playerDiv = document.getElementById(`remote-player-${user.uid}`);
        if (playerDiv) {
          user.videoTrack.play(playerDiv);
        }
      }
    });
  }, [remoteUsers]);

  const joinCall = async () => {
    try {
      setLoading(true);
      setError('');

      // Get token from backend
      const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';
      const response = await axios.get(`${API_BASE}/agora/token`, {
        params: { channelName }
      });

      const { token, appId, uid } = response.data;

      // Join channel
      await clientRef.current.join(appId, channelName, token, uid);

      // Create and publish local tracks
      localAudioTrackRef.current = await AgoraRTC.createMicrophoneAudioTrack();
      localVideoTrackRef.current = await AgoraRTC.createCameraVideoTrack();

      await clientRef.current.publish([
        localAudioTrackRef.current,
        localVideoTrackRef.current
      ]);

      // Play local video
      if (localVideoContainerRef.current) {
        localVideoTrackRef.current.play(localVideoContainerRef.current);
      }

      setJoined(true);
      setLoading(false);
    } catch (err) {
      console.error('Error joining call:', err);
      setError('Failed to join call. Please check your camera/microphone permissions.');
      setLoading(false);
    }
  };

  const leaveCall = async () => {
    try {
      // Stop and close local tracks
      if (localAudioTrackRef.current) {
        localAudioTrackRef.current.stop();
        localAudioTrackRef.current.close();
      }
      if (localVideoTrackRef.current) {
        localVideoTrackRef.current.stop();
        localVideoTrackRef.current.close();
      }

      // Leave channel
      if (clientRef.current) {
        await clientRef.current.leave();
      }

      setJoined(false);
      setRemoteUsers([]);
      
      if (onLeave) onLeave();
    } catch (err) {
      console.error('Error leaving call:', err);
    }
  };

  return (
    <div className="agora-call-container" style={{ background: '#f0f0f0', minHeight: '400px', border: '2px solid red' }}>
      <h2 style={{ color: 'black', padding: '20px' }}>AGORA CALL COMPONENT LOADED</h2>
      
      <div className="video-grid">
        {/* Local video */}
        <div className="video-wrapper local-video">
          <div ref={localVideoContainerRef} className="video-player" style={{ background: '#333' }} />
          <span className="video-label">You</span>
        </div>

        {/* Remote videos */}
        {remoteUsers.map(user => (
          <div key={user.uid} className="video-wrapper remote-video">
            <div id={`remote-player-${user.uid}`} className="video-player" />
            <span className="video-label">User {user.uid}</span>
          </div>
        ))}

        {/* Placeholder when no remote user */}
        {joined && remoteUsers.length === 0 && (
          <div className="video-wrapper waiting">
            <div className="video-player waiting-placeholder">
              <p>Waiting for others to join...</p>
            </div>
          </div>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="call-controls">
        {!joined ? (
          <button 
            onClick={joinCall} 
            disabled={loading}
            className="btn-join"
            style={{ background: 'green', color: 'white', padding: '15px 30px', fontSize: '18px' }}
          >
            {loading ? 'Joining...' : 'Join Video Call'}
          </button>
        ) : (
          <button onClick={leaveCall} className="btn-leave" style={{ background: 'red', color: 'white', padding: '15px 30px' }}>
            Leave Call
          </button>
        )}
      </div>

      <style>{`
        .agora-call-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .video-wrapper {
          position: relative;
          background: #000;
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 16 / 9;
        }

        .video-player {
          width: 100%;
          height: 100%;
        }

        .waiting-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1a1a1a;
          color: #fff;
        }

        .video-label {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 14px;
        }

        .call-controls {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .btn-join, .btn-leave {
          padding: 12px 30px;
          font-size: 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-join {
          background: #4CAF50;
          color: white;
        }

        .btn-join:hover:not(:disabled) {
          background: #45a049;
        }

        .btn-join:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .btn-leave {
          background: #f44336;
          color: white;
        }

        .btn-leave:hover {
          background: #da190b;
        }

        .error-message {
          background: #ffebee;
          color: #c62828;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 15px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .video-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default AgoraCall;
