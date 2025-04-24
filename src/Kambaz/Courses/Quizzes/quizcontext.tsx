import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';

import { Quiz } from './reducer';

export type QuestionType = "multiple_choice" | "fill_in_the_blank" | "true_false";

export type Question = {
    _id: string;
    type: QuestionType;
    question: string;
    points: number;
    options: string[]; // Only for multiple_choice
    correctAnswer?: string;
};

export type Attempt = {
    quizId: string;
    userId: string;
    answers: Record<string, string>;
    score: number;
};

type User = {
    id: string;
    role: 'student' | 'admin';
};

type QuizContextType = {
    user: User | null;
    quiz: Quiz | null;
    setUser: (user: User | null) => void;
    setQuiz: (quiz: Quiz | null) => void;
    questions: Question[];
    setQuestions: (questions: Question[]) => void;
    currentAnswers: Record<string, string>;
    setCurrentAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    attempts: Attempt[];
    setAttempts: React.Dispatch<React.SetStateAction<Attempt[]>>;
    saveAttempt: (attempt: Attempt) => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children, userId }: { children: ReactNode, userId: string }) => {
    const [user, setUser] = useState<User | null>(null);
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentAnswers, setCurrentAnswers] = useState<Record<string, string>>({});
    const [attempts, setAttempts] = useState<Attempt[]>([]);

    // Fetch user data using the provided userId prop
    useEffect(() => {
        const fetchUserById = async () => {
            try {
                const res = await fetch(`/api/users/${userId}`);
                const data = await res.json();
                setUser({ id: data._id, role: data.role });
            } catch (err) {
                console.error('Failed to fetch user', err);
            }
        };

        fetchUserById();
    }, [userId]);

    return (
        <QuizContext.Provider
            value={{
                user,
                quiz,
                setUser,
                setQuiz,
                questions,
                setQuestions,
                currentAnswers,
                setCurrentAnswers,
                attempts,
                setAttempts,
                saveAttempt: (attempt: Attempt) => {
                    setAttempts(prev => [...prev, attempt]); // Add new attempt to state
                    setCurrentAnswers({}); // Optionally clear the current answers after submission
                },
            }}
        >
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
};