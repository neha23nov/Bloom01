import React, { useState } from "react";

// ----------------------
// Phenology Data
// ----------------------
const phenologyData = [
  {
    country: "India",
    flowering_start: "2025-02-15",
    flowering_end: "2025-04-30",
    season_length: 75,
    temperature_trend: "increasing",
    precipitation_trend: "decreasing",
    data_source: "Global Phenology Maps"
  },
  {
    country: "USA",
    flowering_start: "2025-03-01",
    flowering_end: "2025-05-15",
    season_length: 75,
    temperature_trend: "increasing",
    precipitation_trend: "stable",
    data_source: "Global Phenology Maps"
  },
  {
    country: "Brazil",
    flowering_start: "2025-09-01",
    flowering_end: "2025-11-10",
    season_length: 70,
    temperature_trend: "stable",
    precipitation_trend: "increasing",
    data_source: "Global Phenology Maps"
  },
  {
    country: "China",
    flowering_start: "2025-03-10",
    flowering_end: "2025-05-25",
    season_length: 76,
    temperature_trend: "increasing",
    precipitation_trend: "decreasing",
    data_source: "Global Phenology Maps"
  },
  {
    country: "Australia",
    flowering_start: "2025-08-15",
    flowering_end: "2025-10-30",
    season_length: 76,
    temperature_trend: "stable",
    precipitation_trend: "decreasing",
    data_source: "Global Phenology Maps"
  },
  {
    country: "Germany",
    flowering_start: "2025-04-01",
    flowering_end: "2025-06-15",
    season_length: 75,
    temperature_trend: "increasing",
    precipitation_trend: "stable",
    data_source: "Global Phenology Maps"
  },
  {
    country: "Russia",
    flowering_start: "2025-05-01",
    flowering_end: "2025-07-15",
    season_length: 75,
    temperature_trend: "increasing",
    precipitation_trend: "stable",
    data_source: "Global Phenology Maps"
  },
  {
    country: "Canada",
    flowering_start: "2025-05-10",
    flowering_end: "2025-07-25",
    season_length: 76,
    temperature_trend: "increasing",
    precipitation_trend: "stable",
    data_source: "Global Phenology Maps"
  },
  {
    country: "France",
    flowering_start: "2025-04-10",
    flowering_end: "2025-06-25",
    season_length: 76,
    temperature_trend: "increasing",
    precipitation_trend: "stable",
    data_source: "Global Phenology Maps"
  },
  {
    country: "South Africa",
    flowering_start: "2025-08-01",
    flowering_end: "2025-10-10",
    season_length: 71,
    temperature_trend: "stable",
    precipitation_trend: "increasing",
    data_source: "Global Phenology Maps"
  }
];

// ----------------------
// Color Palette for Cards
// ----------------------
const colors = [
  "#1abc9c", "#3498db", "#9b59b6", "#e67e22", "#e74c3c",
  "#16a085", "#2980b9", "#8e44ad", "#d35400", "#c0392b"
];

// ----------------------
// Country Card Component
// ----------------------
function CountryCard({ country, color, onClick }) {
  return (
    <div
      onClick={() => onClick(country)}
      style={{
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: color,
        color: "white",
        cursor: "pointer",
        textAlign: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h3 style={{ margin: 0 }}>{country.country}</h3>
    </div>
  );
}

function CountryDialog({ country, onClose }) {
  if (!country) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#2c2c2c",
          padding: "30px 40px",
          borderRadius: "14px",
          width: "400px",
          color: "white",
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <h2 style={{ margin: "0 0 15px 0", textAlign: "center", borderBottom: "1px solid #444", paddingBottom: "10px" }}>
          {country.country}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <p><strong>Flowering Start:</strong> {country.flowering_start}</p>
          <p><strong>Flowering End:</strong> {country.flowering_end}</p>
          <p><strong>Season Length:</strong> {country.season_length} days</p>
          <p><strong>Temperature Trend:</strong> {country.temperature_trend}</p>
          <p><strong>Precipitation Trend:</strong> {country.precipitation_trend}</p>
          <p><strong>Data Source:</strong> {country.data_source}</p>
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: "15px",
            padding: "10px 16px",
            borderRadius: "8px",
            backgroundColor: "#28a745",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            alignSelf: "center",
            width: "120px",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
        >
          Close
        </button>
      </div>
    </div>
  );
}


// ----------------------
// Main Dashboard
// ----------------------
export default function PhenologyDashboard() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <div style={{ padding: "40px", backgroundColor: "#121212", minHeight: "100vh" }}>
      <h1 style={{ color: "white", textAlign: "center", marginBottom: "30px" }}>
        Phenological Hotspots
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "20px",
        }}
      >
        {phenologyData.map((country, index) => (
          <CountryCard
            key={country.country}
            country={country}
            color={colors[index % colors.length]}
            onClick={setSelectedCountry}
          />
        ))}
      </div>

      <CountryDialog country={selectedCountry} onClose={() => setSelectedCountry(null)} />
    </div>
  );
}