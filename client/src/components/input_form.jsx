import React, { useState } from 'react';
import axios from 'axios';

export default function CitizenObservationForm() {
  const [formData, setFormData] = useState({
    user_name: '',
    lat: '',
    lon: '',
    date_observed: '',
    plant_type: '',
    intensity: '',
    photo: null,
  });

  const handleChange = (e) => {
    if (e.target.name === 'photo') {
      setFormData({ ...formData, photo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    try {
      await axios.post('http://127.0.0.1:5000/observations', data);
      alert('Observation submitted!');
      setFormData({
        user_name: '',
        lat: '',
        lon: '',
        date_observed: '',
        plant_type: '',
        intensity: '',
        photo: null,
      });
    } catch (err) {
      console.error(err);
      alert('Failed to submit observation');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '360px',
        gap: '12px',
        padding: '25px',
        borderRadius: '10px',
        backgroundColor: '#1f1f1f',
        boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
        color: 'white',
        margin: '20px auto',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>Submit Observation</h2>
      <input name="user_name" placeholder="Your Name" value={formData.user_name} onChange={handleChange} required style={inputStyle} />
      <input name="lat" placeholder="Latitude" value={formData.lat} onChange={handleChange} required style={inputStyle} />
      <input name="lon" placeholder="Longitude" value={formData.lon} onChange={handleChange} required style={inputStyle} />
      <input type="date" name="date_observed" value={formData.date_observed} onChange={handleChange} required style={inputStyle} />
      <input name="plant_type" placeholder="Plant Type" value={formData.plant_type} onChange={handleChange} required style={inputStyle} />
      <input name="intensity" placeholder="Intensity" value={formData.intensity} onChange={handleChange} style={inputStyle} />
      <input type="file" name="photo" onChange={handleChange} style={{ color: 'white' }} />
      <button type="submit" style={buttonStyle}>Submit</button>
    </form>
  );
}

const inputStyle = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #555',
  backgroundColor: '#2a2a2a',
  color: 'white',
};

const buttonStyle = {
  padding: '12px',
  border: 'none',
  backgroundColor: '#28a745',
  color: 'white',
  fontWeight: 'bold',
  borderRadius: '6px',
  cursor: 'pointer',
  marginTop: '10px',
};