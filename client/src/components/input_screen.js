import React from 'react';
import CitizenObservationForm from './input_form';
import ObservationsList from './input_observations';

export default function Dashboard() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#121212',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
        color: 'white',
        padding: '20px',
      }}
    >
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '500', margin: '0 0 8px 0' }}>
          Citizen Science Dashboard
        </h1>
        <p style={{ fontSize: '14px', color: '#ccc', margin: 0 }}>
          Submit your plant observations and view community submissions in real-time.
        </p>
      </div>

      {/* Main Content Row */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '30px',
        }}
      >
        {/* Form Section */}
        <div style={{
          flex: '0 0 350px',
          backgroundColor: '#1e1e1e',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        }}>
          <CitizenObservationForm />
        </div>

        {/* Observations Section */}
        <div style={{
          flex: '1',
          maxWidth: '650px',
          backgroundColor: '#1e1e1e',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          overflowY: 'auto',
          maxHeight: '85vh',
        }}>
          <ObservationsList />
        </div>
      </div>
    </div>
  );
}