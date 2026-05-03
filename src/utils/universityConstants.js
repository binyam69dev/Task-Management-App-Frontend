// Department Types and Constants
export const Departments = {
  COMPUTER_SCIENCE: { id: 'cs', name: 'Computer Science', code: 'CS' },
  SOFTWARE_ENG: { id: 'se', name: 'Software Engineering', code: 'SE' },
  INFORMATION_TECH: { id: 'it', name: 'Information Technology', code: 'IT' },
  DATA_SCIENCE: { id: 'ds', name: 'Data Science', code: 'DS' },
  CYBER_SECURITY: { id: 'cyber', name: 'Cyber Security', code: 'CYB' },
  BUSINESS_ADMIN: { id: 'ba', name: 'Business Administration', code: 'BA' },
  ELECTRICAL_ENG: { id: 'ee', name: 'Electrical Engineering', code: 'EE' },
  MECHANICAL_ENG: { id: 'me', name: 'Mechanical Engineering', code: 'ME' },
};

export const Roles = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  DEPARTMENT_HEAD: 'department_head',
  ADVISOR: 'advisor',
  ADMIN: 'admin',
};

export const TaskStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  SUBMITTED: 'submitted',
  GRADED: 'graded',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

export const GradeScale = {
  A: { min: 90, max: 100, points: 4.0 },
  'A-': { min: 87, max: 89, points: 3.7 },
  'B+': { min: 83, max: 86, points: 3.3 },
  B: { min: 80, max: 82, points: 3.0 },
  'B-': { min: 77, max: 79, points: 2.7 },
  'C+': { min: 73, max: 76, points: 2.3 },
  C: { min: 70, max: 72, points: 2.0 },
  'D': { min: 60, max: 69, points: 1.0 },
  F: { min: 0, max: 59, points: 0.0 },
};
