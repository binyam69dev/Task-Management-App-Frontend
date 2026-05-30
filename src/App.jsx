import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './shared/layout/Layout.jsx'
import PrivateRoutes from  "./features/auth/components/PrivateRoute.jsx"
import Footer from './shared/components/Footer.jsx';
import LandingPage from './pages/LandingPage';
import AboutUs from './pages/AboutUs.jsx';
import FeaturesPage from './pages/FeaturesPage';
import Login from './features/auth/pages/Login.jsx';
import Register from './features/auth/pages/Register.jsx';
import Dashboard from './pages/Dashboard';
import Tasks from './features/tasks/pages/Tasks.jsx';
import CreateTask from './features/tasks/pages/CreateTask.jsx';
import EditTask from './features/tasks/pages/EditTask.jsx';
import Settings from './pages/Settings.jsx';
import AcademicDashboard from './pages/AcademicDashboard.jsx';
import KanbanBoard from './features/tasks/components/KanbanBoard.jsx';

function App() {
  return (
    <Routes>
      {/* Public Routes - No Layout/Footer for Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Public Routes with Layout */}
      <Route path="/" element={<><Layout /><LandingPage /><Footer /></>} />
      <Route path="/about" element={<><Layout /><AboutUs /><Footer /></>} />
      <Route path="/features" element={<><Layout /><FeaturesPage /><Footer /></>} />
      
      {/* Protected Routes with Layout */}
      <Route path="/dashboard" element={<PrivateRoutes><Layout /><Dashboard /></PrivateRoutes>} />
      <Route path="/tasks" element={<PrivateRoutes><Layout /><Tasks /></PrivateRoutes>} />
      <Route path="/tasks/kanban" element={<PrivateRoutes><Layout /><KanbanBoard /></PrivateRoutes>} />
      <Route path="/tasks/create" element={<PrivateRoutes><Layout /><CreateTask /></PrivateRoutes>} />
      <Route path="/tasks/:id/edit" element={<PrivateRoutes><Layout /><EditTask /></PrivateRoutes>} />
      <Route path="/academics" element={<PrivateRoutes><Layout /><AcademicDashboard /></PrivateRoutes>} />
      <Route path="/settings" element={<PrivateRoutes><Layout /><Settings /></PrivateRoutes>} />
      
      {/* Catch all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
