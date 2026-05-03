import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../store/authContext';
import { FiMail, FiLock } from 'react-icons/fi';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(formData.email, formData.password);
    setLoading(false);
    if (success) navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400" />
            <input type="email" placeholder="Email" className="input-field pl-10" 
              value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" />
            <input type="password" placeholder="Password" className="input-field pl-10" 
              value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Loading...' : 'Login'}
          </button>
          <Link to="/register" className="text-primary-600 block text-center">Create Account</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
