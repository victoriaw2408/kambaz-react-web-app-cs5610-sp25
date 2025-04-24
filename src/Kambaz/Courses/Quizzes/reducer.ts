import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type QuestionType = "multiple_choice" | "fill_in_the_blank" | "true_false";

export interface Question {
    _id: string;
    type: QuestionType;
    question: string;
    points: number;
    options?: string[]; // only for multiple_choice
    correctAnswer?: string;
    fillInTheBlankAnswers?: string[];
}

export interface Quiz {
    _id: string;
    course: string;
    title: string;
    description: string;
    type: "Graded Quiz" | "Practice Quiz" | "Exam";
    assignmentGroup: "Assignments" | "Quizzes" | "Exams";
    shuffleAnswers: boolean;
    timeLimit: number;
    multipleAttempts: boolean;
    showCorrectAnswers: boolean;
    accessCode: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
    dueDate: string | null;
    availableDate: string | null;
    untilDate: string | null;
    questions: Question[];
    points: number;
    editing?: boolean;
}

interface QuizzesState {
    quizzes: Quiz[];
    studentAttempts: any[];
}

const initialState: QuizzesState = {
    quizzes: [],
    studentAttempts: [],
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
            state.quizzes = action.payload;
        },
        setStudentAttempts: (state, action: PayloadAction<any[]>) => {
            state.studentAttempts = action.payload; // Set attempts for the student
        },
        addQuiz: (state, action: PayloadAction<Quiz>) => {
            state.quizzes.push(action.payload);
        },
        deleteQuiz: (state, action: PayloadAction<string>) => {
            state.quizzes = state.quizzes.filter((quiz) => quiz._id !== action.payload);
        },
        updateQuiz: (state, action: PayloadAction<Quiz>) => {
            console.log("Updating quiz with payload: ", action.payload);  // Debug log
            state.quizzes = state.quizzes.map((quiz) =>
                quiz._id === action.payload._id ? action.payload : quiz
            );
        },

        addQuestionToQuiz: (
            state,
            action: PayloadAction<{ quizId: string; question: Question }>
        ) => {
            const { quizId, question } = action.payload;
            const quiz = state.quizzes.find((q) => q._id === quizId);
            if (quiz) {
                quiz.questions.push(question);
                quiz.points += question.points; // Update points for the quiz
            }
        },
        updateQuestionInQuiz: (
            state,
            action: PayloadAction<{
                quizId: string;
                questionId: string;
                updatedQuestion: Question;
            }>
        ) => {
            const { quizId, questionId, updatedQuestion } = action.payload;
            const quiz = state.quizzes.find((q) => q._id === quizId);
            if (quiz) {
                quiz.questions = quiz.questions.map((q) =>
                    q._id === questionId ? updatedQuestion : q
                );
                quiz.points = quiz.questions.reduce((total, q) => total + q.points, 0); // Recalculate total points
            }
        },
        deleteQuestionFromQuiz: (
            state,
            action: PayloadAction<{ quizId: string; questionId: string }>
        ) => {
            const { quizId, questionId } = action.payload;
            const quiz = state.quizzes.find((q) => q._id === quizId);
            if (quiz) {
                quiz.questions = quiz.questions.filter((q) => q._id !== questionId);
                quiz.points = quiz.questions.reduce((total, q) => total + q.points, 0); // Recalculate total points
            }
        },
        setQuestionsForQuiz: (
            state,
            action: PayloadAction<{ quizId: string; questions: Question[] }>
        ) => {
            const { quizId, questions } = action.payload;
            const quiz = state.quizzes.find((q) => q._id === quizId);
            if (quiz) {
                quiz.questions = questions;
                quiz.points = questions.reduce((total, q) => total + q.points, 0); // Recalculate total points
            }
        },
        editQuiz: (state, action: PayloadAction<string>) => {
            const quizId = action.payload;
            const quiz = state.quizzes.find((q) => q._id === quizId);
            if (quiz) {
                quiz.editing = true;
            }
        },
    },
});

export const {
    setQuizzes,
    setStudentAttempts,
    addQuiz,
    deleteQuiz,
    updateQuiz,
    addQuestionToQuiz,
    updateQuestionInQuiz,
    deleteQuestionFromQuiz,
    setQuestionsForQuiz,
    editQuiz,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;