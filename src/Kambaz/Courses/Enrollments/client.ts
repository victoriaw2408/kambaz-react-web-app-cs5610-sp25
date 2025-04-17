// import axios from "axios";
// const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
// const ENROLLMENTS_API = `${REMOTE_SERVER}/api/users`;
// const axiosWithCredentials = axios.create({ withCredentials: true });

// export const findAllEnrollments = async (userId: string) => {
//   const { data } = await axiosWithCredentials.get(`${ENROLLMENTS_API}/users/${userId}/enrollments`);
//   return data;
// };

// export const unenroll = async  (userId: string, courseId: string) => {
//     const { data: enrollment } = await axiosWithCredentials.get(`${ENROLLMENTS_API}/${userId}/${courseId}`);
//     if (enrollment) {
//         const { data } = await axiosWithCredentials.delete(`${ENROLLMENTS_API}/${enrollment._id}`);
//         return data;
//       }
//       throw new Error("Enrollment not found");
//     };  
//   export const addEnrollment = async (enrollment: { user: string; course: string }) => {
//     const { data } = await axiosWithCredentials.post(`${ENROLLMENTS_API}`, enrollment);
//     return data;
//   };
//   export const findEnrollment = async (userId: string, courseId: string) => {
//     const { data } = await axiosWithCredentials.get(`${ENROLLMENTS_API}/${userId}/${courseId}`);
//     return data;
//   };
import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

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

export const getUserEnrollments = async (userId: string) => {
    try {
        const { data } = await axios.get(`${ENROLLMENTS_API}/${userId}`);
        return data;
    } catch (error) {
        console.error("Error fetching user enrollments:", error);
        throw error;
    }
};