import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ObservationsList() {
  const [observations, setObservations] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/observations')
      .then((res) => setObservations(res.data.observations))
      .catch((err) => console.error(err));
  }, []);

  if (observations.length === 0) {
    return (
      <p style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>
        No observations yet.
      </p>
    );
  }

  return (
    <div
      style={{
        maxWidth: '750px',
        margin: '30px auto',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          marginBottom: '25px',
          fontSize: '24px',
        }}
      >
        Submitted Observations
      </h2>

      {observations.map((obs, index) => (
        <div
          key={obs.id || index}
          style={{
            border: '1px solid #444',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            backgroundColor: '#1e1e1e',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          }}
        >
          <div style={{ flex: 1 }}>
            <p style={{ margin: '4px 0' }}>
              <strong>#{index + 1}</strong>
            </p>
            <p style={{ margin: '4px 0' }}>
              <strong>Name:</strong> {obs.user_name}
            </p>
            <p style={{ margin: '4px 0' }}>
              <strong>Location:</strong> {obs.lat}, {obs.lon}
            </p>
            <p style={{ margin: '4px 0' }}>
              <strong>Date:</strong> {obs.date_observed}
            </p>
            <p style={{ margin: '4px 0' }}>
              <strong>Plant:</strong> {obs.plant_type}
            </p>
            <p style={{ margin: '4px 0' }}>
              <strong>Intensity:</strong> {obs.intensity}
            </p>
          </div>

          {obs.photo_path && (
            <img
              src={`http://127.0.0.1:5000/photos/${obs.photo_path}`}
              alt="Observation"
              style={{
                width: '120px',
                height: '120px',
                objectFit: 'cover',
                borderRadius: '8px',
                border: '1px solid #555',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
