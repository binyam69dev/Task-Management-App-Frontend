import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/Common/PrivateRoute';
import Footer from './components/Common/Footer';
import LandingPage from './pages/LandingPage';
import AboutUs from './pages/AboutUs';
import FeaturesPage from './pages/FeaturesPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<><Layout /><LandingPage /><Footer /></>} />
        <Route path="/about" element={<><Layout /><AboutUs /><Footer /></>} />
        <Route path="/features" element={<><Layout /><FeaturesPage /><Footer /></>} />
        <Route path="/login" element={<><Layout /><Login /><Footer /></>} />
        <Route path="/register" element={<><Layout /><Register /><Footer /></>} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<PrivateRoute><Layout /><Dashboard /></PrivateRoute>} />
        <Route path="/tasks" element={<PrivateRoute><Layout /><Tasks /></PrivateRoute>} />
        <Route path="/tasks/create" element={<PrivateRoute><Layout /><CreateTask /></PrivateRoute>} />
        <Route path="/tasks/:id/edit" element={<PrivateRoute><Layout /><EditTask /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Layout />`n        <Route path="/settings" element={<PrivateRoute><Layout /><Settings /></PrivateRoute>} /><Profile /></PrivateRoute>} />
        
        {/* Redirect / to dashboard if authenticated, else to landing */}
        <Route path="/app" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}

export default App;

