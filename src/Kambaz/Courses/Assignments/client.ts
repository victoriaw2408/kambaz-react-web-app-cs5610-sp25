import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const findAssignmentsForCourse = async (courseId: string) => {
    const response = await axios
        .get(`${ASSIGNMENTS_API}/${courseId}`);
    return response.data;
};
export const fetchAllAssignments = async () => {
    const { data } = await axios.get(ASSIGNMENTS_API);
    return data;
};
export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
    const response = await axios.post(
        `${ASSIGNMENTS_API}/${courseId}`,
        assignment
    );
    return response.data;
};

export const deleteAssignment = async (courseId: string) => {
    const response = await axios.delete(`${ASSIGNMENTS_API}/${courseId}`);
    return response.data;
};
export const updateAssignment = async (assignment: any) => {
    const { data } = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
    return data;
};
