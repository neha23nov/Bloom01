import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-green-600 text-2xl font-bold">✱ BloomWatch</div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-green-600 font-medium" : "text-gray-600 hover:text-gray-900"}>Home</NavLink>
          <NavLink to="/3d-map" className={({ isActive }) => isActive ? "text-green-600 font-medium" : "text-gray-600 hover:text-gray-900"}>3D Map</NavLink>
          <NavLink to="/phenology-trends" className={({ isActive }) => isActive ? "text-green-600 font-medium" : "text-gray-600 hover:text-gray-900"}>Phenology Trends</NavLink>
          {/* <NavLink to="/ai-detection" className={({ isActive }) => isActive ? "text-green-600 font-medium" : "text-gray-600 hover:text-gray-900"}>AI Detection</NavLink>
          <NavLink to="/predictive-analytics" className={({ isActive }) => isActive ? "text-green-600 font-medium" : "text-gray-600 hover:text-gray-900"}>Predictive Analytics</NavLink> */}

        
          <NavLink to="/conservation" className={({ isActive }) => isActive ? "text-green-600 font-medium" : "text-gray-600 hover:text-gray-900"}>Conservation</NavLink>
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <NavLink to="/profile" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center uppercase">
                  {user.email?.[0] || "U"}
                </div>
                <span className="hidden md:inline">{user.email.split("@")[0]}</span>
              </NavLink>
              <button onClick={logout} className="text-gray-600 hover:text-gray-900">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="text-gray-600 hover:text-gray-900">Login</NavLink>
              <NavLink to="/signup" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Sign Up</NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
