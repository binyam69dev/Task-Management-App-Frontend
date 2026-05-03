import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiBook, FiUsers, FiCalendar, FiAward, FiTrendingUp, 
  FiPlus, FiEdit2, FiTrash2, FiUserPlus, FiCheckCircle,
  FiXCircle, FiClock, FiBarChart2, FiDownload
} from 'react-icons/fi';
import { Departments, Roles, GradeScale } from '../utils/universityConstants';

const DepartmentDashboard = ({ userRole, departmentId }) => {
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Mock data for demonstration
  useEffect(() => {
    setCourses([
      { id: 1, code: 'CS301', name: 'Data Structures', credits: 3, instructor: 'Dr. Smith', semester: 'Fall 2024', enrolled: 45, capacity: 60 },
      { id: 2, code: 'CS302', name: 'Algorithms', credits: 3, instructor: 'Dr. Johnson', semester: 'Fall 2024', enrolled: 42, capacity: 60 },
      { id: 3, code: 'CS401', name: 'Database Systems', credits: 4, instructor: 'Prof. Brown', semester: 'Spring 2025', enrolled: 38, capacity: 50 },
    ]);
    
    setStudents([
      { id: 1, name: 'Alice Johnson', email: 'alice@university.edu', batch: '2024', gpa: 3.8, status: 'active' },
      { id: 2, name: 'Bob Smith', email: 'bob@university.edu', batch: '2024', gpa: 3.5, status: 'active' },
      { id: 3, name: 'Carol Davis', email: 'carol@university.edu', batch: '2023', gpa: 3.9, status: 'active' },
    ]);
    
    setBatches([
      { id: 1, year: '2024', name: 'Batch of 2024', studentCount: 120, status: 'active' },
      { id: 2, year: '2023', name: 'Batch of 2023', studentCount: 115, status: 'active' },
      { id: 3, year: '2022', name: 'Batch of 2022', studentCount: 110, status: 'graduated' },
    ]);
  }, []);

  const tabs = [
    { id: 'courses', label: 'Courses', icon: FiBook, count: courses.length },
    { id: 'students', label: 'Students', icon: FiUsers, count: students.length },
    { id: 'batches', label: 'Batches', icon: FiCalendar, count: batches.length },
    { id: 'performance', label: 'Performance', icon: FiBarChart2 },
  ];

  const renderCourses = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Course Management</h3>
        <button
          onClick={() => { setEditingItem(null); setShowModal(true); }}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Course</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded">
                    {course.code}
                  </span>
                  <span className="text-xs text-gray-500">{course.credits} credits</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{course.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Instructor: {course.instructor}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-green-600 dark:text-green-400">
                    {course.enrolled}/{course.capacity} enrolled
                  </span>
                  <span className="text-blue-600 dark:text-blue-400">{course.semester}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                  <FiEdit2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <FiTrash2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                  <FiUserPlus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Student Management</h3>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            <FiDownload className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
            <FiPlus className="w-4 h-4" />
            <span>Add Student</span>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Batch</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">GPA</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                  {student.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                  {student.batch}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600 dark:text-green-400">
                  {student.gpa}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-primary-600 hover:text-primary-800 mr-3">View</button>
                  <button className="text-blue-600 hover:text-blue-800 mr-3">Grades</button>
                  <button className="text-red-600 hover:text-red-800">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Average GPA</p>
              <p className="text-2xl font-bold text-gray-900">3.65</p>
            </div>
            <FiTrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pass Rate</p>
              <p className="text-2xl font-bold text-gray-900">92%</p>
            </div>
            <FiAward className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Graduation Rate</p>
              <p className="text-2xl font-bold text-gray-900">88%</p>
            </div>
            <FiCheckCircle className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Retention Rate</p>
              <p className="text-2xl font-bold text-gray-900">94%</p>
            </div>
            <FiUsers className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>
      
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">Grade Distribution</h3>
        <div className="space-y-3">
          {Object.entries(GradeScale).slice(0, 5).map(([grade, scale]) => (
            <div key={grade}>
              <div className="flex justify-between text-sm mb-1">
                <span>{grade}</span>
                <span>{scale.min}-{scale.max}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: ${Math.random() * 30 + 10}% }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={lex items-center space-x-2 py-4 px-1 border-b-2 transition-colors }
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'courses' && renderCourses()}
        {activeTab === 'students' && renderStudents()}
        {activeTab === 'batches' && renderBatches()}
        {activeTab === 'performance' && renderPerformance()}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">
              {editingItem ? 'Edit Course' : 'Add New Course'}
            </h3>
            <form className="space-y-4">
              <input type="text" placeholder="Course Code" className="input-field" />
              <input type="text" placeholder="Course Name" className="input-field" />
              <input type="number" placeholder="Credits" className="input-field" />
              <select className="input-field">
                <option>Select Instructor</option>
                <option>Dr. Smith</option>
                <option>Dr. Johnson</option>
              </select>
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingItem ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentDashboard;
