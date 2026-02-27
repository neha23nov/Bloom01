import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import HomePage from "./components/Homepage";
import Map3D from "./components/Map3D";
import { Plants_screen } from "./components/plants_screen"; // Use PascalCase
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import LowVegetationData from "./components/low_vegetation";
import input_screen from "./components/input_screen";




// Import your data (no changes to your file)
import { conservationData } from "./data/conservationData";
import FlowerPredictor from "./components/prediction_cnn";


// Inline component to render conservation data
function ConservationWrapper() {
  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Conservation Strategies</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {conservationData.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
            <p className="text-sm mb-1">{item.data}</p>
            <p className="text-xs text-gray-400">Region: {item.region}</p>
            <p className="text-xs text-gray-400">Threat Level: {item.threatLevel}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />
      {/* <LowVegetationData/> */}
      <div className="px-6 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/3d-map" element={<Map3D />} />
          <Route path="/phenology-trends" element={<Plants_screen />} />

          {/* Login & Signup */}
          <Route
            path="/login"
            element={
              <div className="flex justify-center items-center min-h-screen bg-[#0D1117] text-white px-4">
                <Login />
              </div>
            }
          />
          <Route
            path="/signup"
            element={
              <div className="flex justify-center items-center min-h-screen bg-[#0D1117] text-white px-4">
                <Signup />
              </div>
            }
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={
              <main className="min-h-screen p-6 text-black bg-white">
                <Profile />
              </main>
            }
          />

          {/* Conservation Route */}
          <Route
            path="/conservation"
            element={
              <main className="min-h-screen p-6 text-white bg-white">
                <ConservationWrapper />
              </main>


            }
          />

           <Route
            path="/predictive-analytics"
            element={
              <main className="min-h-screen p-6 text-white bg-[#0D1117]">
                <LowVegetationData />
              </main>


            }
          />

          <Route
            path="/ai-detection"
            element={
              <main className="min-h-screen p-6 text-white bg-white">
                <FlowerPredictor/>
              </main>


            }
          />

        





          


        </Routes>
      </div>
    </>
  );
}

export default App;
