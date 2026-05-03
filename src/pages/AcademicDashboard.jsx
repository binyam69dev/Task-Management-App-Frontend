import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUser, FiBook, FiAward, FiTrendingUp, FiCalendar, 
  FiClock, FiCheckCircle, FiBarChart2, FiUsers, FiLoader
} from 'react-icons/fi';
import { academicService } from '../services/academicService';
import { useAuth } from '../store/authContext';

const AcademicDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    setLoading(true);
    try {
      const [profile, courses, grades, gpa, timeline, department, instructors] = await Promise.all([
        academicService.getMyAcademicProfile().catch(() => null),
        academicService.getMyCourses().catch(() => []),
        academicService.getMyGrades().catch(() => []),
        academicService.getMyGPA().catch(() => null),
        academicService.getMyTimeline().catch(() => []),
        academicService.getMyDepartment().catch(() => null),
        academicService.getMyInstructors().catch(() => [])
      ]);
      
      setStudentData({
        profile: profile?.data || user,
        courses: courses?.data || [],
        grades: grades?.data || [],
        gpa: gpa?.data || { cumulative: 0, current: 0 },
        timeline: timeline?.data || [],
        department: department?.data || null,
        instructors: instructors?.data || []
      });
    } catch (err) {
      console.error('Error fetching academic data:', err);
      setError('Failed to load academic data');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiUser },
    { id: 'courses', label: 'Courses', icon: FiBook },
    { id: 'timeline', label: 'Timeline', icon: FiCalendar },
    { id: 'performance', label: 'Performance', icon: FiBarChart2 },
    { id: 'department', label: 'Department', icon: FiUsers },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <FiLoader className="w-12 h-12 text-primary-500 animate-spin" />
        <p className="mt-4 text-gray-600">Loading your academic profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <button onClick={fetchStudentData} className="btn-primary mt-4">Retry</button>
      </div>
    );
  }

  const getGradeColor = (grade) => {
    const colors = {
      'A': 'text-green-600 bg-green-100',
      'A-': 'text-green-600 bg-green-100',
      'B+': 'text-blue-600 bg-blue-100',
      'B': 'text-blue-600 bg-blue-100',
      'B-': 'text-yellow-600 bg-yellow-100',
    };
    return colors[grade] || 'text-gray-600 bg-gray-100';
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {studentData?.profile?.name?.charAt(0) || 'S'}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {studentData?.profile?.name || 'Student Name'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {studentData?.profile?.department || 'Department'}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                    Batch {studentData?.profile?.batch || 'N/A'}
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                    {studentData?.profile?.status || 'Active'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div>
                <p className="text-xs text-gray-500">Student ID</p>
                <p className="font-semibold">{studentData?.profile?.studentId || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Enrollment Year</p>
                <p className="font-semibold">{studentData?.profile?.enrollmentYear || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Expected Graduation</p>
                <p className="font-semibold">{studentData?.profile?.expectedGraduation || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Years</p>
                <p className="font-semibold">{studentData?.profile?.totalYears || 'N/A'} Years</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-64 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-4 text-white">
            <p className="text-sm opacity-90">Cumulative GPA</p>
            <p className="text-4xl font-bold">{studentData?.gpa?.cumulative || '0.00'}</p>
            <p className="text-sm mt-2">Credits Completed: {studentData?.gpa?.completedCredits || 0}</p>
            <div className="mt-3 pt-3 border-t border-white/20">
              <p className="text-xs">Current Semester GPA: {studentData?.gpa?.current || '0.00'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Courses</p>
              <p className="text-2xl font-bold">{studentData?.courses?.length || 0}</p>
            </div>
            <FiBook className="w-8 h-8 text-primary-500" />
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Completed</p>
              <p className="text-2xl font-bold">
                {studentData?.courses?.filter(c => c.status === 'completed').length || 0}
              </p>
            </div>
            <FiCheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Attendance</p>
              <p className="text-2xl font-bold">{studentData?.performance?.attendance || 0}%</p>
            </div>
            <FiClock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Class Rank</p>
              <p className="text-2xl font-bold">{studentData?.performance?.rank || 'N/A'}</p>
            </div>
            <FiAward className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-6">Course History</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course Code</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Credits</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Semester</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {studentData?.courses?.map((course, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium">{course.code}</td>
                <td className="px-4 py-3 text-sm">{course.name}</td>
                <td className="px-4 py-3 text-sm">{course.credits}</td>
                <td className="px-4 py-3 text-sm">{course.semester}</td>
                <td className="px-4 py-3">
                  <span className={"px-2 py-1 rounded-full text-xs font-semibold " + getGradeColor(course.grade)}>
                    {course.grade || 'In Progress'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={"px-2 py-1 rounded-full text-xs " + (course.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700')}>
                    {course.status || 'In Progress'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTimeline = () => (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-6">Academic Timeline</h3>
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
        {studentData?.timeline?.map((event, index) => (
          <div key={index} className="relative flex mb-8">
            <div className="absolute left-6 w-4 h-4 bg-primary-500 rounded-full border-4 border-white"></div>
            <div className="ml-16 flex-1">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <h4 className="font-semibold">{event.year} - {event.semester}</h4>
                    <p className="text-sm text-gray-600">Status: {event.status}</p>
                    {event.note && <p className="text-xs text-red-500 mt-1">{event.note}</p>}
                  </div>
                  {event.gpa > 0 && (
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary-600">{event.gpa}</p>
                      <p className="text-xs text-gray-500">GPA</p>
                    </div>
                  )}
                </div>
                {event.courses > 0 && (
                  <div className="mt-2 text-sm text-gray-500">
                    {event.courses} courses taken
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={"flex items-center space-x-2 px-4 py-2 rounded-lg transition-all " + (activeTab === tab.id ? "bg-primary-500 text-white" : "text-gray-600 hover:bg-gray-100")}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Dynamic Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'courses' && renderCourses()}
        {activeTab === 'timeline' && renderTimeline()}
        {activeTab === 'performance' && <div className="card p-6">Performance content from backend</div>}
        {activeTab === 'department' && <div className="card p-6">Department content from backend</div>}
      </motion.div>
    </div>
  );
};

export default AcademicDashboard;