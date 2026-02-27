import React from "react";
import VegetationMap from "./VegitationMap";

const Map3D = () => (
  <div style={{ position: "relative", width: "100%", height: "100vh" }}>
    <VegetationMap />
    
    {/* Enhanced title overlay with better styling */}
    <div style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "white",
      textAlign: "center",
      zIndex: 1000,
      textShadow: "2px 2px 10px rgba(0,0,0,0.8)",
      pointerEvents: "none", // Allow clicking through to map
      userSelect: "none"
    }}>
      <h1 style={{
        fontSize: "4rem",
        fontWeight: "bold",
        margin: "0 0 16px 0",
        letterSpacing: "2px",
        background: "linear-gradient(135deg, #4ade80, #22c55e)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        filter: "drop-shadow(2px 2px 8px rgba(0,0,0,0.5))"
      }}>
        BloomWatch
      </h1>
      <p style={{
        fontSize: "1.5rem",
        margin: 0,
        fontWeight: 300,
        letterSpacing: "1px"
      }}>
        Tracking Global Vegetation
      </p>
    </div>

    {/* Optional: Instructions overlay that fades after a few seconds */}
    <InstructionsOverlay />
  </div>
);

// Optional instructions component
const InstructionsOverlay = () => {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: "absolute",
      bottom: 140,
      right: 20,
      zIndex: 1000,
      background: "rgba(255, 255, 255, 0.95)",
      padding: "16px 20px",
      borderRadius: 8,
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      maxWidth: 280,
      animation: "fadeIn 0.5s ease-in"
    }}>
      <h4 style={{ margin: "0 0 8px 0", fontSize: 14, fontWeight: 600, color: "#16a34a" }}>
        Quick Guide
      </h4>
      <ul style={{ margin: 0, paddingLeft: 20, fontSize: 12, color: "#4b5563", lineHeight: 1.6 }}>
        <li>Search for any location using the search bar</li>
        <li>Pan and zoom to explore vegetation</li>
        <li>Click markers for detailed info</li>
        <li>Tree colors indicate vegetation density</li>
      </ul>
      <button
        onClick={() => setVisible(false)}
        style={{
          marginTop: 12,
          padding: "6px 12px",
          background: "#16a34a",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          fontSize: 12,
          fontWeight: 500,
          width: "100%"
        }}
      >
        Got it!
      </button>
    </div>
  );
};

export default Map3D;