import React, { useState, useEffect } from 'react';
import { Button, Form, Dropdown, DropdownButton, Table } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { updateQuizQuestions, fetchQuizQuestions } from './client'; // Assuming fetchQuizQuestions is defined
import { v4 as uuidv4 } from 'uuid';
import { Question, useQuiz } from './quizcontext';

export default function QuizQuestionsEditor() {
    const { questions, setQuestions } = useQuiz();
    const [newQuestion, setNewQuestion] = useState<Question>({
        _id: '',
        type: 'multiple_choice',
        question: '',
        points: 1,
        options: ['', '', '', ''],
        correctAnswer: '', // Ensure correctAnswer is initialized
    });

    const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
    const [points, setPoints] = useState<number>(0);
    const navigate = useNavigate();
    const { cid, qid } = useParams();

    // Fetch questions when component mounts
    useEffect(() => {
        if (qid) {
            const fetchQuestions = async () => {
                try {
                    const fetchedQuestions = await fetchQuizQuestions(qid);
                    setQuestions(fetchedQuestions);
                } catch (err) {
                    console.error('Failed to fetch questions:', err);
                }
            };

            fetchQuestions();
        } else {
            console.error("Quiz ID (qid) is missing!");
            navigate('/path-to-some-other-page');
        }
    }, [qid, navigate, setQuestions]);

    useEffect(() => {
        calculateTotalPoints();
    }, [questions]);

    const calculateTotalPoints = () => {
        const total = questions.reduce((acc, curr) => acc + curr.points, 0);
        setPoints(total);
    };

    const syncQuestionsWithServer = async (updatedQuestions: Question[]) => {
        if (!qid) return;
        try {
            await updateQuizQuestions(qid, updatedQuestions);
        } catch (err) {
            console.error("Failed to sync questions with server:", err);
        }
    };

    const handleAddQuestion = async () => {
        if (qid) {
            const newQ: Question = { ...newQuestion, _id: uuidv4() }; // Using UUID for the new question ID
            const updated: Question[] = [...questions, newQ];
            setQuestions(updated);
            resetNewQuestion();
            await syncQuestionsWithServer(updated);
        } else {
            console.error("Quiz ID (qid) is undefined. Cannot save question.");
        }
    };

    const handleEditQuestion = (questionId: string) => {
        const questionToEdit = questions.find((q) => q._id === questionId);
        if (questionToEdit) {
            setEditingQuestionId(questionId);
            setNewQuestion({ ...questionToEdit });
        }
    };

    const handleSaveEdit = async () => {
        if (editingQuestionId) {
            const updated = questions.map((q) =>
                q._id === editingQuestionId ? { ...newQuestion } : q
            );
            setQuestions(updated);
            await syncQuestionsWithServer(updated);
            resetNewQuestion();
        }
    };

    const handleCancelEdit = () => {
        resetNewQuestion();
    };

    const handleDeleteQuestion = async (id: string) => {
        const updated = questions.filter((q) => q._id !== id);
        setQuestions(updated);
        await syncQuestionsWithServer(updated);
    };

    const resetNewQuestion = () => {
        setEditingQuestionId(null);
        setNewQuestion({
            _id: '',
            type: 'multiple_choice',
            question: '',
            points: 1,
            options: ['', '', '', ''],
            correctAnswer: '', // Reset the correct answer field
        });
    };

    const handleChangeQuestion = (e: React.ChangeEvent<HTMLElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        setNewQuestion((prev: Question) => ({
            ...prev,
            [name]: name === 'points' ? parseInt(value) : value,
        }));
    };

    const handleChangeOptions = (e: React.ChangeEvent<HTMLElement>, index: number) => {
        const updated = [...(newQuestion.options || [])];
        updated[index] = (e.target as HTMLInputElement).value;
        setNewQuestion((prev: Question) => ({
            ...prev,
            options: updated,
        }));
    };

    const handleBackToQuiz = () => {
        navigate(`/Kambaz/courses/${cid}/quizzes/${qid}`);
    };

    const handleSaveAllQuestions = async () => {
        if (qid) {
            try {
                await syncQuestionsWithServer(questions);
                console.log('All questions saved!');
            } catch (err) {
                console.error('Error saving all questions:', err);
            }
        }
    };

    const handleCorrectOptionSelect = (index: number) => {
        if (newQuestion.options) {
            const correctAnswer = newQuestion.options[index];
            setNewQuestion((prev: Question) => ({
                ...prev,
                correctAnswer,
            }));
        }
    };

    const handleCorrectTrueFalseSelect = (value: 'True' | 'False') => {
        setNewQuestion((prev: Question) => ({
            ...prev,
            correctAnswer: value,
        }));
    };

    // New handler for fill-in-the-blank questions
    const handleFillInTheBlankAnswerSelect = (answer: string) => {
        setNewQuestion((prev: Question) => ({
            ...prev,
            correctAnswer: answer,
        }));
    };


    return (
        <div className="quiz-questions-editor">
            <h2>Quiz Questions Editor</h2>

            <div className="d-flex justify-content-between">
                <h5>Total Points: {points}</h5>
                <Button onClick={handleAddQuestion} variant="success">Add New Question</Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Type</th>
                        <th>Points</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((q) => (
                        <tr key={q._id}>
                            <td>{q.question}</td>
                            <td>{q.type}</td>
                            <td>{q.points}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEditQuestion(q._id)}>Edit</Button>{' '}
                                <Button variant="danger" onClick={() => handleDeleteQuestion(q._id)}>
                                    <FaTrashAlt />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="d-flex justify-content-between mt-3">
                <Button variant="primary" onClick={handleBackToQuiz}>Back to Quiz Details</Button>
                <Button variant="primary" onClick={handleSaveAllQuestions}>Save All Questions</Button>
            </div>

            {(editingQuestionId || newQuestion.question) && (
                <div>
                    <h3>{editingQuestionId ? 'Edit Question' : 'New Question'}</h3>

                    <Form>
                        <Form.Group controlId="formQuestion">
                            <Form.Label>Question</Form.Label>
                            <Form.Control
                                type="text"
                                name="question"
                                value={newQuestion.question}
                                onChange={handleChangeQuestion}
                            />
                        </Form.Group>

                        <Form.Group controlId="formQuestionType">
                            <Form.Label>Question Type</Form.Label>
                            <DropdownButton
                                title={newQuestion.type || "Select Type"}
                                onSelect={(type) => setNewQuestion((prev) => ({ ...prev, type: type as Question['type'] }))}>
                                <Dropdown.Item eventKey="multiple_choice">Multiple Choice</Dropdown.Item>
                                <Dropdown.Item eventKey="true_false">True/False</Dropdown.Item>
                                <Dropdown.Item eventKey="fill_in_the_blank">Fill in the Blank</Dropdown.Item>
                            </DropdownButton>
                        </Form.Group>

                        <Form.Group controlId="formPoints">
                            <Form.Label>Points</Form.Label>
                            <Form.Control
                                type="number"
                                name="points"
                                value={newQuestion.points}
                                onChange={handleChangeQuestion}
                            />
                        </Form.Group>

                        {newQuestion.type === 'multiple_choice' && (
                            <div className="mt-4">
                                <Form.Label>Options</Form.Label>
                                {newQuestion.options && newQuestion.options.map((option, index) => (
                                    <div key={index} className="d-flex align-items-center mb-2">
                                        <Form.Control
                                            type="text"
                                            placeholder={`Option ${index + 1}`}
                                            value={option}
                                            onChange={(e) => handleChangeOptions(e, index)}
                                            className="me-2"
                                        />
                                        <Button
                                            variant={newQuestion.correctAnswer === option ? "success" : "outline-success"}
                                            onClick={() => handleCorrectOptionSelect(index)}
                                        >
                                            {newQuestion.correctAnswer === option ? "Correct Answer" : "Mark Correct"}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {newQuestion.type === 'true_false' && (
                            <div className="mt-4">
                                <Form.Label>Select Correct Answer</Form.Label>
                                <div className="d-flex">
                                    <Button
                                        variant={newQuestion.correctAnswer === 'True' ? "success" : "outline-success"}
                                        onClick={() => handleCorrectTrueFalseSelect('True')}
                                    >
                                        True
                                    </Button>
                                    <Button
                                        variant={newQuestion.correctAnswer === 'False' ? "success" : "outline-success"}
                                        onClick={() => handleCorrectTrueFalseSelect('False')}
                                    >
                                        False
                                    </Button>
                                </div>
                            </div>
                        )}

                        {newQuestion.type === 'fill_in_the_blank' && (
                            <div className="mt-4">
                                <Form.Label>Correct Answer</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="correctAnswer"
                                    value={newQuestion.correctAnswer}
                                    onChange={(e) => handleFillInTheBlankAnswerSelect(e.target.value)}
                                    placeholder="Enter correct answer"
                                />
                            </div>
                        )}

                        <div className="mt-4">
                            <Button
                                variant={editingQuestionId ? "warning" : "success"}
                                onClick={editingQuestionId ? handleSaveEdit : handleAddQuestion}
                            >
                                {editingQuestionId ? 'Save Changes' : 'Add Question'}
                            </Button>
                            {editingQuestionId && (
                                <Button variant="secondary" className="ms-2" onClick={handleCancelEdit}>
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </Form>
                </div>
            )}
        </div>
    );
}