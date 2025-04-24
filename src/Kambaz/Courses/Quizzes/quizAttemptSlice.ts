import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Attempt interface
export interface Attempt {
  quizId: string;
  userId: string;
  answers: { [questionId: string]: string }; // Store the student's answers as a key-value pair
  score: number;
  attemptDate: string;
}

// Define the structure of the state
interface QuizAttemptsState {
  attempts: Attempt[]; // Array of attempts made by students
}

// Initial state for quiz attempts
const initialState: QuizAttemptsState = {
  attempts: [],
};

const quizAttemptsSlice = createSlice({
  name: "quizAttempts",
  initialState,
  reducers: {
    // Action to save a new attempt
    saveAttempt: (state, action: PayloadAction<Attempt>) => {
      // Remove previous attempt from the same student for the same quiz
      state.attempts = state.attempts.filter(
        (a) => !(a.quizId === action.payload.quizId && a.userId === action.payload.userId)
      );
      state.attempts.push(action.payload); // Add the new attempt to the state
    },
  },
});

// Export the action and reducer
export const { saveAttempt } = quizAttemptsSlice.actions;
export default quizAttemptsSlice.reducer;