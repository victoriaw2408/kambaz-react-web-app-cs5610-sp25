// import axios from "axios";
// const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
// const COURSES_API = `${REMOTE_SERVER}/api/courses`;
// const axiosWithCredentials = axios.create({ withCredentials: true });

// export const fetchAllCourses = async () => {
//   const { data } = await axiosWithCredentials.get(COURSES_API);
//   return data;
// };

// export const createCourse = async (course: any) => {
//   const { data } = await axiosWithCredentials.post(COURSES_API, course);
//   return data;
//  };
 
// export const deleteCourse = async (id: string) => {
//   const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
//   return data;
//   };
//   export const updateCourse = async (course: any) => {
//     const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
//     return data;
//   };
//   export const findModulesForCourse = async (courseId: string) => {
//     const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/modules`);
//     return response.data;   
//   };
//   export const createModuleForCourse = async (courseId: string, module: any) => {
//     const response = await axiosWithCredentials.post(
//       `${COURSES_API}/${courseId}/modules`,
//       module
//     );
//     return response.data;
//   };
//   export const findUsersForCourse = async (courseId: string) => {
//     const response = await axios.get(`${COURSES_API}/${courseId}/users`);
//     return response.data;
//    };
   
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;  // New enrollments API

export const findUsersForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/users`);
  return response.data;
 }; 

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(COURSES_API, course);
  return data;
 }; 

export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/assignments`);
    return response.data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};
export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};
export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};
export const updateCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

// Enroll a User in a Course
export const enrollUserInCourse = async (userId: string, courseId: string) => {
  const response = await axios.post(`${ENROLLMENTS_API}/enroll`, { userId, courseId });
  return response.data;  // Assuming the server sends a success message
};

// Unenroll a User from a Course
export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
  const response = await axios.post(`${ENROLLMENTS_API}/unenroll`, { userId, courseId });
  return response.data;  // Assuming the server sends a success message
};
 