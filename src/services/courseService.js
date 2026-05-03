import API from './api';

export const courseService = {
  // Course Management
  getAllCourses: async (filters = {}) => {
    const response = await API.get('/courses', { params: filters });
    return response.data;
  },
  
  getCourseById: async (id) => {
    const response = await API.get(/courses/);
    return response.data;
  },
  
  createCourse: async (courseData) => {
    const response = await API.post('/courses', courseData);
    return response.data;
  },
  
  updateCourse: async (id, courseData) => {
    const response = await API.patch(/courses/, courseData);
    return response.data;
  },
  
  deleteCourse: async (id) => {
    const response = await API.delete(/courses/);
    return response.data;
  },
  
  // Department Management
  getDepartments: async () => {
    const response = await API.get('/departments');
    return response.data;
  },
  
  createDepartment: async (deptData) => {
    const response = await API.post('/departments', deptData);
    return response.data;
  },
  
  // Batch Management
  getBatches: async () => {
    const response = await API.get('/batches');
    return response.data;
  },
  
  createBatch: async (batchData) => {
    const response = await API.post('/batches', batchData);
    return response.data;
  },
  
  // Enrollment
  enrollStudent: async (enrollmentData) => {
    const response = await API.post('/enrollments', enrollmentData);
    return response.data;
  },
  
  getEnrollments: async (studentId) => {
    const response = await API.get(/enrollments/student/);
    return response.data;
  },
  
  // Grading
  submitGrade: async (gradeData) => {
    const response = await API.post('/grades', gradeData);
    return response.data;
  },
  
  getStudentGrades: async (studentId, courseId) => {
    const response = await API.get(/grades/student/, { params: { courseId } });
    return response.data;
  },
  
  calculateGPA: async (studentId) => {
    const response = await API.get(/grades/gpa/);
    return response.data;
  },
  
  // Advisor Management
  getAdvisors: async () => {
    const response = await API.get('/advisors');
    return response.data;
  },
  
  assignAdvisor: async (studentId, advisorId) => {
    const response = await API.post('/advisors/assign', { studentId, advisorId });
    return response.data;
  },
};
