import axios from "axios";
import { Question } from "./quizcontext";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const createQuiz = async (quiz: any) => {
    const { data } = await axiosWithCredentials.post(QUIZZES_API, quiz);
    return data;
};

export const findQuizzesForCourse = async (courseId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/course/${courseId}`);
    return response.data;
};

export const fetchAllQuizzes = async (courseId?: string) => {
    if (courseId) {
        return findQuizzesForCourse(courseId);
    }
    const { data } = await axiosWithCredentials.get(QUIZZES_API);
    return data;
};

export const updateQuiz = async (quiz: any) => {
    const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return data;
};

export const deleteQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

export const updateQuizQuestions = async (quizId: string, questions: Question[]) => {
    const { data } = await axiosWithCredentials.patch(
        `${QUIZZES_API}/${quizId}/questions`,
        { questions }
    );
    return data;
};

// Sync questions with the server
export const syncQuestionsWithServer = async (quizId: string, questions: Question[]) => {
    return updateQuizQuestions(quizId, questions);
};

export const addQuestionToQuiz = async (quizId: string, question: Question) => {
    const { data } = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/questions`, question);
    return data;
};

export const updateQuestionInQuiz = async (
    quizId: string,
    questionId: string,
    updatedQuestion: Question
) => {
    const { data } = await axiosWithCredentials.put(
        `${QUIZZES_API}/${quizId}/questions/${questionId}`,
        updatedQuestion
    );
    return data;
};

export const deleteQuestionFromQuiz = async (quizId: string, questionId: string) => {
    const { data } = await axiosWithCredentials.delete(
        `${QUIZZES_API}/${quizId}/questions/${questionId}`
    );
    return data;
};

// Fetch quiz questions
export const fetchQuizQuestions = async (quizId: string): Promise<Question[]> => {
    const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/questions`);
    return Array.isArray(data) ? data : data.questions || [];  // Ensure data is in array format
};

// Submit quiz attempt
export const submitQuizAttempt = async (quizId: string, userId: string, answers: any) => {
    try {// Submit quiz attempt
    
        
        const response = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/attempts/${userId}`, { answers });
        console.log('Quiz attempt submitted:', response.data);
    } catch (error) {
        console.error('Error submitting quiz attempt:', error);
        throw new Error('Error submitting quiz attempt');
    }
};



// Fetch user attempts for a specific quiz
export const fetchUserAttempts = async (userId: string, quizId: string) => {
    try {
        const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts/${userId}`);
        return response.data; // Return the attempts
    } catch (error) {
        console.error("Error fetching user attempts:", error);
        throw error; // Optionally throw error for further handling
    }
};

// Fetch the quiz configuration, including maxAttempts
export const fetchQuizConfig = async (quizId: string) => {
    try {
        const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/config`);
        return data; // The response should include maxAttempts and other quiz config details
    } catch (error) {
        console.error("Error fetching quiz config:", error);
        throw error; // Optionally throw error for further handling
    }
};