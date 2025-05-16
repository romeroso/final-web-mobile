import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Dashboard from './pages/Dashboard';
import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected app routes */}
          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/activity" element={<div className="p-4"><h1>Activity Page</h1><p>This page would contain detailed activity tracking features.</p></div>} />
            <Route path="/nutrition" element={<div className="p-4"><h1>Nutrition Page</h1><p>This page would contain meal tracking and nutritional information.</p></div>} />
            <Route path="/sleep" element={<div className="p-4"><h1>Sleep Page</h1><p>This page would contain sleep tracking and analysis features.</p></div>} />
            <Route path="/water" element={<div className="p-4"><h1>Water Page</h1><p>This page would contain water intake tracking features.</p></div>} />
            <Route path="/settings" element={<div className="p-4"><h1>Settings Page</h1><p>This page would contain user profile and app settings.</p></div>} />
          </Route>
          
          {/* Redirect to login by default */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;