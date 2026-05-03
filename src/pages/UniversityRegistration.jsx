import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/authContext';
import { Departments, Roles } from '../utils/universityConstants';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCheck, FiBriefcase, FiCalendar } from 'react-icons/fi';

const UniversityRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    department: '',
    studentId: '',
    batch: '',
    enrollmentYear: new Date().getFullYear(),
    advisor: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const departments = Object.values(Departments);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Add department and role info to registration
    const registrationData = {
      ...formData,
      role: formData.role,
      metadata: {
        department: formData.department,
        studentId: formData.studentId,
        batch: formData.batch,
        enrollmentYear: formData.enrollmentYear,
      }
    };
    const success = await register(registrationData);
    setLoading(false);
    if (success) navigate('/dashboard');
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Select Role</label>
        <div className="grid grid-cols-2 gap-3">
          {Object.values(Roles).slice(0, 4).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setFormData({ ...formData, role })}
              className={p-3 rounded-lg border-2 transition-all }
            >
              <div className="capitalize font-medium">{role.replace('_', ' ')}</div>
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Full Name</label>
        <div className="relative">
          <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            className="input-field pl-10"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Email Address</label>
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            className="input-field pl-10"
            placeholder="you@university.edu"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Department</label>
        <div className="relative">
          <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            className="input-field pl-10"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            required
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>{dept.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Student ID (if applicable)</label>
        <input
          type="text"
          className="input-field"
          placeholder="e.g., STU-2024-001"
          value={formData.studentId}
          onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Batch Year</label>
          <div className="relative">
            <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              className="input-field pl-10"
              value={formData.batch}
              onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
            >
              <option value="">Select Batch</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Enrollment Year</label>
          <select
            className="input-field"
            value={formData.enrollmentYear}
            onChange={(e) => setFormData({ ...formData, enrollmentYear: parseInt(e.target.value) })}
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Password</label>
        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            className="input-field pl-10 pr-10"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? <FiEyeOff className="text-gray-400" /> : <FiEye className="text-gray-400" />}
          </button>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Confirm Password</label>
        <div className="relative">
          <FiCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            className="input-field pl-10"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          By creating an account, you agree to the university's terms and conditions.
          Your information will be used for academic purposes only.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-2xl w-full">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 relative">
                <div className={h-2 }></div>
                <div className={bsolute -mt-2 w-8 h-8 rounded-full flex items-center justify-center } style={{ left: 'calc(50% - 16px)', top: '-12px' }}>
                  {s}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <span>Account Info</span>
            <span>University Details</span>
            <span>Security</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button type="button" onClick={handleBack} className="btn-secondary">
                  Back
                </button>
              )}
              {step < 3 ? (
                <button type="button" onClick={handleNext} className="btn-primary ml-auto">
                  Next
                </button>
              ) : (
                <button type="submit" disabled={loading} className="btn-primary w-full ml-auto">
                  {loading ? 'Creating Account...' : 'Register'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UniversityRegistration;

