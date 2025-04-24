import React from 'react';
import { Button, Card, ListGroup, Container, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

type Question = {
    id: string;
    type: 'multiple_choice' | 'true_false' | 'fill_in_blank';
    question: string;
    points: number;
    options?: string[];
    correctAnswer?: string;
};

const QuizPreview: React.FC = () => {
    const { cid, qid } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const questions: Question[] = location.state?.questions || [];

    console.log("Questions previewing:", questions); // Debug log

    return (
        <Container className="my-4">
            <Row className="mb-4">
                <Col>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>Quiz Preview</h3>
                        <Button
                            variant="outline-primary"
                            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`)}
                        >
                            Back to Quiz Details
                        </Button>
                    </div>
                </Col>
            </Row>

            {questions.length === 0 ? (
                <p>No questions available to preview.</p>
            ) : (
                questions.map((question: Question) => (
                    <Card key={question.id} className="mb-4">
                        <Card.Body>
                            <Card.Title className="fw-bold">{question.question}</Card.Title>

                            {question.type === 'multiple_choice' && (
                                <ListGroup variant="flush" className="mb-3">
                                    {question.options && question.options.length > 0 ? (
                                        question.options.map((option, index) => (
                                            <ListGroup.Item
                                                key={index}
                                                className={question.correctAnswer === option ? 'bg-success text-white' : ''}
                                            >
                                                {option}
                                                {question.correctAnswer === option && (
                                                    <span className="text-white ms-2">(Correct Answer)</span>
                                                )}
                                            </ListGroup.Item>
                                        ))
                                    ) : (
                                        <ListGroup.Item>No options available</ListGroup.Item>
                                    )}
                                </ListGroup>
                            )}

                            {question.type === 'true_false' && (
                                <p>
                                    <strong>Correct Answer:</strong>{' '}
                                    {question.correctAnswer || 'No correct answer set'}
                                </p>
                            )}

                            {question.type === 'fill_in_blank' && (
                                <div>
                                    <p><strong>Correct Answer:</strong></p>
                                    {/* Render the correctAnswer directly */}
                                    {question.correctAnswer ? (
                                        <ListGroup variant="flush" className="mb-3">
                                            <ListGroup.Item className="bg-success text-white">
                                                {question.correctAnswer}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    ) : (
                                        <p>No correct answer set</p>
                                    )}
                                </div>
                            )}

                            <p><strong>Points:</strong> {question.points}</p>
                        </Card.Body>
                    </Card>
                ))
            )}
        </Container>
    );
};

export default QuizPreview;