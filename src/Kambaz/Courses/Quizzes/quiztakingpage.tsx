import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';
import {
    submitQuizAttempt,
    fetchQuizQuestions,
    fetchQuizConfig,
    fetchUserAttempts,
} from './client';
import { useDispatch } from 'react-redux';
import { setStudentAttempts } from './reducer';
import { useQuiz } from './quizcontext';

export default function QuizTakingPage() {
    const { qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        questions,
        setQuestions,
        currentAnswers,
        setCurrentAnswers,
        saveAttempt,
        user,
    } = useQuiz();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [attemptsLeft, setAttemptsLeft] = useState<number>(0);
    const [lastAttempt, setLastAttempt] = useState<any>(null);
    const [maxAttempts, setMaxAttempts] = useState<number>(3);

    const userId = user?.id;
    const quizId = qid;

    // Redirect admin users
    useEffect(() => {
        if (user && user.role !== 'student') {
            navigate('/admin-dashboard');
        }
    }, [user, navigate]);

    // Fetch quiz config & attempt data
    useEffect(() => {
        const loadQuizData = async () => {
            if (!userId || !quizId) {
                setError('Missing user or quiz ID.');
                return;
            }

            try {
                const config = await fetchQuizConfig(quizId);
                const max = config.maxAttempts || 3;
                setMaxAttempts(max);

                const attempts = await fetchUserAttempts(userId, quizId);
                setAttemptsLeft(max - attempts.length);
                setLastAttempt(attempts[attempts.length - 1] || null);
                dispatch(setStudentAttempts(attempts));
            } catch (err) {
                console.error('Failed loading quiz config or attempts:', err);
                setError('There was an error loading the quiz data.');
            }
        };

        loadQuizData();
    }, [quizId, userId, dispatch]);

    // Fetch quiz questions
    useEffect(() => {
        if (!quizId) return;

        fetchQuizQuestions(quizId)
            .then((fetchedQuestions) => {
                setQuestions(fetchedQuestions);
                setLoading(false);
                setError(null);
            })
            .catch((err) => {
                console.error('Failed to fetch questions:', err);
                setError('There was an error loading the quiz questions.');
                setLoading(false);
            });
    }, [quizId, setQuestions]);

    const handleAnswerChange = (questionId: string, value: string) => {
        setCurrentAnswers((prev) => ({ ...prev, [questionId]: value }));
    };

    const calculateScore = () =>
        questions.reduce((total, q) => {
            const answer = currentAnswers[q._id];
            return q.correctAnswer && answer === q.correctAnswer
                ? total + q.points
                : total;
        }, 0);

    const handleSubmit = async () => {
        if (!quizId || !userId) {
            setError('Missing quiz or user ID.');
            return;
        }

        // if (attemptsLeft <= 0 || lastAttempt) {
        //     alert('You have already used all attempts or submitted this quiz.');
        //     return;
        // }

        const score = calculateScore();
        const attempt = {
            userId,
            quizId,
            answers: currentAnswers,
            score,
        };

        try {
            await submitQuizAttempt(userId, quizId, currentAnswers);
            saveAttempt(attempt);
            alert(`Submitted! Your score is ${score}`);
        } catch (err) {
            console.error('Failed to submit attempt', err);
            alert('There was an error submitting your quiz.');
        }
    };

    const retryFetch = () => {
        if (!quizId) {
            setError('Quiz ID is missing.');
            return;
        }

        setLoading(true);
        setError(null);

        fetchQuizQuestions(quizId)
            .then((fetchedQuestions) => {
                setQuestions(fetchedQuestions);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Retry failed:', err);
                setError('There was an error loading the quiz questions.');
                setLoading(false);
            });
    };

    if (loading) {
        return (
            <div className="text-center my-4">
                <Spinner animation="border" />
                <p>Loading quiz questions...</p>
            </div>
        );
    }

    if (!quizId) {
        navigate('/error');
        return null;
    }

    return (
        <div className="container mt-4">
            <h2>Take Quiz: {quizId}</h2>

            {error && (
                <Alert variant="danger">
                    {error} <Button variant="link" onClick={retryFetch}>Retry</Button>
                </Alert>
            )}

            {questions.length === 0 ? (
                <p>No questions available.</p>
            ) : (
                questions.map((q, idx) => (
                    <div key={q._id} className="mb-4">
                        <h5>{idx + 1}. {q.question}</h5>

                        {q.type === 'multiple_choice' &&
                            q.options?.map((opt, i) => (
                                <Form.Check
                                    key={i}
                                    type="radio"
                                    name={q._id}
                                    label={opt}
                                    value={opt}
                                    checked={currentAnswers[q._id] === opt}
                                    disabled={!!lastAttempt}
                                    onChange={() => handleAnswerChange(q._id, opt)}
                                />
                            ))}

                        {q.type === 'true_false' &&
                            ['True', 'False'].map((opt) => (
                                <Form.Check
                                    key={opt}
                                    type="radio"
                                    name={q._id}
                                    label={opt}
                                    value={opt}
                                    checked={currentAnswers[q._id] === opt}
                                    disabled={!!lastAttempt}
                                    onChange={() => handleAnswerChange(q._id, opt)}
                                />
                            ))}

                        {q.type === 'fill_in_the_blank' && (
                            <Form.Control
                                type="text"
                                placeholder="Your answer"
                                value={currentAnswers[q._id] || ''}
                                disabled={!!lastAttempt}
                                onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                            />
                        )}
                    </div>
                ))
            )}

            {attemptsLeft >= 0 && (
                <Button onClick={handleSubmit}>Submit Quiz</Button>
            )}
        </div>
    );
}





