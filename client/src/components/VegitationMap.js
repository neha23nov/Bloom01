import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Create custom tree icons based on vegetation density (lai_hv)
const createTreeIcon = (laiValue) => {
  let color = '#2d5016'; // Dark green (low)
  let size = 25;
  
  if (laiValue > 0.7) {
    color = '#4ade80'; // Bright green (high)
    size = 32;
  } else if (laiValue > 0.5) {
    color = '#22c55e'; // Medium green
    size = 28;
  }
  
  return L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" stroke="#1a3a0f" stroke-width="1.5">
      <path d="M12 2L6 8h3v6H7l5 6 5-6h-2V8h3z"/>
      <rect x="11" y="14" width="2" height="8" fill="#8b4513"/>
    </svg>`,
    className: 'tree-icon',
    iconSize: [size, size],
    iconAnchor: [size/2, size],
    popupAnchor: [0, -size]
  });
};

// Predefined locations for quick search (fallback)
const LOCATIONS = {
  // India
  'delhi': { lat: 28.6139, lng: 77.2090, name: 'Delhi, India' },
  'mumbai': { lat: 19.0760, lng: 72.8777, name: 'Mumbai, India' },
  'bangalore': { lat: 12.9716, lng: 77.5946, name: 'Bangalore, India' },
  'chennai': { lat: 13.0827, lng: 80.2707, name: 'Chennai, India' },
  'kolkata': { lat: 22.5726, lng: 88.3639, name: 'Kolkata, India' },
  'hyderabad': { lat: 17.3850, lng: 78.4867, name: 'Hyderabad, India' },
  'pune': { lat: 18.5204, lng: 73.8567, name: 'Pune, India' },
  'ahmedabad': { lat: 23.0225, lng: 72.5714, name: 'Ahmedabad, India' },
  'jaipur': { lat: 26.9124, lng: 75.7873, name: 'Jaipur, India' },
  
  // International
  'new york': { lat: 40.7128, lng: -74.0060, name: 'New York, USA' },
  'london': { lat: 51.5074, lng: -0.1278, name: 'London, UK' },
  'paris': { lat: 48.8566, lng: 2.3522, name: 'Paris, France' },
  'tokyo': { lat: 35.6762, lng: 139.6503, name: 'Tokyo, Japan' },
  'sydney': { lat: -33.8688, lng: 151.2093, name: 'Sydney, Australia' },
  'dubai': { lat: 25.2048, lng: 55.2708, name: 'Dubai, UAE' },
  'singapore': { lat: 1.3521, lng: 103.8198, name: 'Singapore' },
  'beijing': { lat: 39.9042, lng: 116.4074, name: 'Beijing, China' },
  'los angeles': { lat: 34.0522, lng: -118.2437, name: 'Los Angeles, USA' },
  'berlin': { lat: 52.5200, lng: 13.4050, name: 'Berlin, Germany' },
};

// Component to handle search and fly with smooth animation
function SearchHandler({ searchQuery, setIsSearching }) {
  const map = useMap();

  useEffect(() => {
    if (!searchQuery) return;

    const fetchLocation = async () => {
      try {
        console.log("🔍 Searching for:", searchQuery);
        
        // First, try predefined locations (instant)
        const searchLower = searchQuery.toLowerCase().trim();
        if (LOCATIONS[searchLower]) {
          const location = LOCATIONS[searchLower];
          console.log(`✅ Found in predefined locations: ${location.name}`);
          
          map.flyTo([location.lat, location.lng], 12, { 
            duration: 2,
            easeLinearity: 0.25 
          });
          
          setIsSearching(false);
          return;
        }
        
        // Try Nominatim API as fallback (with timeout)
        console.log("🌐 Trying Nominatim API...");
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`,
          {
            headers: {
              'Accept': 'application/json',
            },
            signal: controller.signal
          }
        );
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("📍 Search results:", data);
        
        if (data && data.length > 0) {
          const { lat, lon, display_name } = data[0];
          const latitude = parseFloat(lat);
          const longitude = parseFloat(lon);
          
          console.log(`✈️ Flying to: ${latitude}, ${longitude}`);
          
          map.flyTo([latitude, longitude], 12, { 
            duration: 2,
            easeLinearity: 0.25 
          });
          
          console.log(`✅ Found: ${display_name}`);
        } else {
          console.warn("❌ No results found");
          alert(`Location not found.\n\nTry: Delhi, Mumbai, New York, London, Paris, Tokyo`);
        }
      } catch (err) {
        console.error("❌ Search error:", err);
        
        if (err.name === 'AbortError') {
          alert(`Search timed out.\n\nTry predefined locations:\nDelhi, Mumbai, Bangalore, New York, London, Paris, Tokyo`);
        } else {
          alert(`Search unavailable (API blocked).\n\nTry these cities:\nDelhi, Mumbai, Bangalore, Chennai, New York, London, Paris, Tokyo`);
        }
      } finally {
        setIsSearching(false);
      }
    };

    fetchLocation();
  }, [searchQuery, map, setIsSearching]);

  return null;
}

// Component to track map movements and filter points dynamically
function MapEventHandler({ points, setVisiblePoints }) {
  const map = useMapEvents({
    moveend: () => {
      updateVisibleMarkers();
    },
    zoomend: () => {
      updateVisibleMarkers();
    },
    load: () => {
      updateVisibleMarkers();
    }
  });

  const updateVisibleMarkers = () => {
    const bounds = map.getBounds();
    const visible = points.filter((p) => bounds.contains([p.lat, p.lng]));
    console.log(`🗺️ Visible markers: ${visible.length} / ${points.length}`);
    setVisiblePoints(visible);
  };

  // Set initial visible points
  useEffect(() => {
    if (points.length > 0 && map) {
      updateVisibleMarkers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);

  return null;
}

export default function VegetationMap() {
  const [points, setPoints] = useState([]);
  const [visiblePoints, setVisiblePoints] = useState([]);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Load JSON vegetation data
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/50points.json`)
      .then((res) => {
        if (!res.ok) throw new Error("File not found");
        return res.json();
      })
      .then((data) => {
        console.log("✅ Loaded vegetation data:", data.length, "points");
        const formatted = data.map((p) => ({
          lat: p.latitude,
          lng: p.longitude,
          lai_hv: p.lai_hv,
        }));
        setPoints(formatted);
        setVisiblePoints(formatted);
      })
      .catch((err) => {
        console.warn("⚠️ Could not load 50points.json, using sample data:", err);
        // Fallback to sample data
        const sampleData = [
          { lat: 28.6139, lng: 77.2090, lai_hv: 0.8 }, // Delhi
          { lat: 19.0760, lng: 72.8777, lai_hv: 0.6 }, // Mumbai
          { lat: 13.0827, lng: 80.2707, lai_hv: 0.7 }, // Chennai
          { lat: 22.5726, lng: 88.3639, lai_hv: 0.75 }, // Kolkata
          { lat: 12.9716, lng: 77.5946, lai_hv: 0.65 }, // Bangalore
          { lat: 17.3850, lng: 78.4867, lai_hv: 0.55 }, // Hyderabad
          { lat: 23.0225, lng: 72.5714, lai_hv: 0.5 }, // Ahmedabad
          { lat: 26.9124, lng: 75.7873, lai_hv: 0.45 }, // Jaipur
          { lat: 30.7333, lng: 76.7794, lai_hv: 0.85 }, // Chandigarh
          { lat: 11.0168, lng: 76.9558, lai_hv: 0.9 }, // Coimbatore
          { lat: 40.7128, lng: -74.0060, lai_hv: 0.4 }, // New York
          { lat: 51.5074, lng: -0.1278, lai_hv: 0.6 }, // London
          { lat: 35.6762, lng: 139.6503, lai_hv: 0.5 }, // Tokyo
          { lat: 48.8566, lng: 2.3522, lai_hv: 0.55 }, // Paris
        ];
        setPoints(sampleData);
        setVisiblePoints(sampleData);
      });
  }, []);

  const handleSearch = () => {
    const trimmedSearch = search.trim();
    if (!trimmedSearch) {
      alert("Please enter a location to search");
      return;
    }
    
    console.log("🔎 Starting search for:", trimmedSearch);
    setIsSearching(true);
    setSearchQuery(trimmedSearch);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {/* Search bar with improved styling */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 1000,
          background: "white",
          padding: "12px 16px",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          display: "flex",
          gap: 8,
          alignItems: "center"
        }}
      >
        <input
          type="text"
          placeholder="Delhi, Mumbai, New York, London..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isSearching}
          style={{ 
            padding: "8px 12px", 
            width: 280,
            border: "1px solid #ddd",
            borderRadius: 6,
            fontSize: 14,
            outline: "none"
          }}
        />
        <button
          onClick={handleSearch}
          disabled={isSearching}
          style={{ 
            padding: "8px 16px",
            background: isSearching ? "#9ca3af" : "#16a34a",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: isSearching ? "not-allowed" : "pointer",
            fontSize: 14,
            fontWeight: 500,
            transition: "background 0.2s"
          }}
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Info Panel */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          zIndex: 1000,
          background: "white",
          padding: 16,
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          minWidth: 200
        }}
      >
        <h3 style={{ margin: "0 0 12px 0", fontSize: 16, fontWeight: 600 }}>Map Info</h3>
        <p style={{ margin: "4px 0", fontSize: 14, color: "#4b5563" }}>
          Visible markers: <span style={{ fontWeight: 600, color: "#16a34a" }}>{visiblePoints.length}</span>
        </p>
        <p style={{ margin: "4px 0", fontSize: 14, color: "#4b5563" }}>
          Total points: <span style={{ fontWeight: 600 }}>{points.length}</span>
        </p>
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #e5e7eb" }}>
          <p style={{ margin: "0 0 8px 0", fontSize: 12, fontWeight: 600, color: "#374151" }}>Legend:</p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, marginBottom: 4 }}>
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#4ade80", display: "inline-block" }}></span>
            <span>High (&gt;0.7)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, marginBottom: 4 }}>
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#22c55e", display: "inline-block" }}></span>
            <span>Medium (0.5-0.7)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#2d5016", display: "inline-block" }}></span>
            <span>Low (&lt;0.5)</span>
          </div>
        </div>
      </div>

      {/* Map */}
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ width: "100%", height: "100vh" }}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        touchZoom={true}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Render visible points with color-coded tree icons */}
        {visiblePoints.map((p, idx) => (
          <Marker 
            key={idx} 
            position={[p.lat, p.lng]} 
            icon={createTreeIcon(p.lai_hv)}
          >
            <Popup>
              <div style={{ fontSize: 13 }}>
                <p style={{ fontWeight: 600, color: "#16a34a", margin: "0 0 8px 0" }}>
                  Vegetation Data
                </p>
                <p style={{ margin: "4px 0" }}>
                  <span style={{ fontWeight: 500 }}>LAI Value:</span> {p.lai_hv.toFixed(2)}
                </p>
                <p style={{ margin: "4px 0" }}>
                  <span style={{ fontWeight: 500 }}>Density:</span>{" "}
                  {p.lai_hv > 0.7 ? "High" : p.lai_hv > 0.5 ? "Medium" : "Low"}
                </p>
                <p style={{ margin: "8px 0 0 0", fontSize: 11, color: "#6b7280" }}>
                  {p.lat.toFixed(4)}, {p.lng.toFixed(4)}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Search handler */}
        {searchQuery && <SearchHandler searchQuery={searchQuery} setIsSearching={setIsSearching} />}

        {/* Event handler to update visible markers dynamically */}
        <MapEventHandler points={points} setVisiblePoints={setVisiblePoints} />
      </MapContainer>
    </div>
  );
}