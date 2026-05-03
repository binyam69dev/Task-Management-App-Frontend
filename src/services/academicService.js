import API from './api';

export const academicService = {
  // Get current student's academic profile
  getMyAcademicProfile: async () => {
    const response = await API.get('/academics/my-profile');
    return response.data;
  },
  
  // Get student by ID (for advisors/department heads)
  getStudentProfile: async (studentId) => {
    const response = await API.get(`/academics/student/${studentId}`);
    return response.data;
  },
  
  // Get student's courses
  getMyCourses: async (semester = null) => {
    const params = semester ? { semester } : {};
    const response = await API.get('/academics/my-courses', { params });
    return response.data;
  },
  
  // Get student's grades
  getMyGrades: async () => {
    const response = await API.get('/academics/my-grades');
    return response.data;
  },
  
  // Get student's GPA
  getMyGPA: async () => {
    const response = await API.get('/academics/my-gpa');
    return response.data;
  },
  
  // Get academic timeline
  getMyTimeline: async () => {
    const response = await API.get('/academics/my-timeline');
    return response.data;
  },
  
  // Get department info
  getMyDepartment: async () => {
    const response = await API.get('/academics/my-department');
    return response.data;
  },
  
  // Get course instructors
  getMyInstructors: async () => {
    const response = await API.get('/academics/my-instructors');
    return response.data;
  },
};

