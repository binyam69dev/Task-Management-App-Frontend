import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../store/authContext';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    const success = await register({ name: formData.name, email: formData.email, password: formData.password });
    setLoading(false);
    if (success) navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-400" />
            <input type="text" placeholder="Full Name" className="input-field pl-10" 
              value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          </div>
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
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" />
            <input type="password" placeholder="Confirm Password" className="input-field pl-10" 
              value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} required />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Loading...' : 'Register'}
          </button>
          <Link to="/login" className="text-primary-600 block text-center">Already have an account? Login</Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
