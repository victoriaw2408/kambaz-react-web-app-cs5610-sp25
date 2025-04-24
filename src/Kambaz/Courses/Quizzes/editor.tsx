import { Button, Form, FormControl, FormSelect } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IoEllipsisVertical } from "react-icons/io5";
import { GoCircleSlash } from "react-icons/go";
import axios from 'axios'; // Import axios for API requests
import { updateQuiz } from "./reducer"; // ✅ Make sure the path is correct

export default function QuizEditor() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [quizTitle, setQuizTitle] = useState("");
    const [quizDescription, setQuizDescription] = useState("");
    const [quizPoints, setQuizPoints] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [availableFrom, setAvailableFrom] = useState("");
    const [availableUntil, setAvailableUntil] = useState("");
    const [quizType, setQuizType] = useState("Graded Quiz");
    const [group, setGroup] = useState("QUIZZES");
    const [shuffle, setShuffle] = useState(true);
    const [timeToggle, setTimeToggle] = useState(true);
    const [quizTimeLimit, setQuizTimeLimit] = useState("20");
    const [multiple, setMultiple] = useState(false);
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(true);
    const [accessCode, setAccessCode] = useState("");
    const [oneQuestionAtATime, setOneQuestionAtATime] = useState(false);
    const [webcamRequired, setWebcamRequired] = useState(false);
    const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState(false);

    const { quizzes } = useSelector((state: any) => state.quizzesReducer);

    useEffect(() => {
        if (qid) {
            const quiz = quizzes.find((q: any) => q._id === qid);
            if (quiz) {
                setQuizTitle(quiz.title);
                setQuizDescription(quiz.description);
                setQuizPoints(quiz.points);
                setDueDate(quiz.dueDate);
                setAvailableFrom(quiz.availableFrom);
                setAvailableUntil(quiz.availableUntil);
                setQuizType(quiz.type);
                setGroup(quiz.assignmentGroup);
                setShuffle(quiz.shuffleAnswers);
                setQuizTimeLimit(quiz.timeLimit);
                setTimeToggle(quiz.timeToggle);
                setMultiple(quiz.multipleAttempts);
                setShowCorrectAnswers(quiz.showCorrectAnswers);
                setAccessCode(quiz.accessCode);
                setOneQuestionAtATime(quiz.oneQuestionAtATime);
                setWebcamRequired(quiz.webcamRequired);
                setLockQuestionsAfterAnswering(quiz.lockQuestionsAfterAnswering);
            }
        }
    }, [qid, quizzes]);

    const handleSaveQuiz = async () => {
        const formattedAvailableFrom = availableFrom || null;
        const formattedAvailableUntil = availableUntil || null;

        // Handle Time Limit
        const finalTimeLimit = timeToggle ? Number(quizTimeLimit) : 0;
        const updatedQuiz = {
            _id: qid || uuidv4(),  // if qid exists, use it for updates, else create a new one
            title: quizTitle,
            course: cid!,
            description: quizDescription,
            type: quizType as "Graded Quiz" | "Practice Quiz" | "Exam",
            assignmentGroup: group as "Assignments" | "Quizzes" | "Exams",
            shuffleAnswers: shuffle,
            timeLimit: finalTimeLimit,
            multipleAttempts: multiple,
            showCorrectAnswers: showCorrectAnswers,
            accessCode: accessCode,
            oneQuestionAtATime: oneQuestionAtATime,
            webcamRequired: webcamRequired,
            lockQuestionsAfterAnswering: lockQuestionsAfterAnswering,
            dueDate: dueDate || null,
            availableDate: formattedAvailableFrom,
            untilDate: formattedAvailableUntil,
            //questions: [], // Empty for now
            points: Number(quizPoints),
        };

        console.log("Quiz data being saved:", updatedQuiz); // Debug log

        try {
            if (!qid) {
                const response = await axios.post('http://localhost:4000/api/quizzes', updatedQuiz);
                console.log('Quiz created successfully:', response.data);
                dispatch(updateQuiz(response.data));
                navigate(`/Kambaz/Courses/${cid}/Quizzes/${response.data._id}`);
            } else {
                const response = await axios.put(`http://localhost:4000/api/quizzes/${qid}`, updatedQuiz);
                console.log('Quiz updated successfully:', response.data);
                dispatch(updateQuiz(response.data));
                navigate(`/Kambaz/Courses/${cid}/Quizzes/${response.data._id}`);
            }
        } catch (error) {
            console.error('Error saving quiz:', error);
            // Provide more helpful feedback for the user, e.g.:
            alert("Error saving quiz. Please try again.");
        }

    };


    return (
        <div className="p-4">
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <h4>{qid ? "Edit Quiz" : "New Quiz"}</h4>
                <div className="d-flex align-items-center">
                    <IoEllipsisVertical size={24} />
                    <h6 className="mb-0 ms-2">Not Published</h6>
                    <GoCircleSlash className="ms-3" />
                </div>
            </div>

            {/* Form for Quiz Details */}
            <FormControl
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                placeholder="Enter quiz title"
                className="mb-3"
            />
            {/* Instructions */}
            <h5>Quiz Instructions</h5>
            <FormControl
                as="textarea"
                rows={6}
                placeholder="Enter quiz instructions"
                value={quizDescription}
                onChange={(e) => setQuizDescription(e.target.value)}
                className="mb-4"
            />

            {/* Points, Quiz Type, Assignment Group */}
            {/* These forms handle user input */}
            <Form.Group className="mb-3">
                <Form.Label>Points</Form.Label>
                <FormControl
                    type="number"
                    value={quizPoints}
                    onChange={(e) => setQuizPoints(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Quiz Type</Form.Label>
                <FormSelect
                    value={quizType}
                    onChange={(e) => setQuizType(e.target.value)}
                >
                    <option>Graded Quiz</option>
                    <option>Practice Quiz</option>
                    <option>Graded Survey</option>
                    <option>Ungraded Survey</option>
                </FormSelect>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Assignment Group</Form.Label>
                <FormSelect
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                >
                    <option>QUIZZES</option>
                    <option>ASSIGNMENTS</option>
                    <option>EXAMS</option>
                    <option>PROJECT</option>
                </FormSelect>
            </Form.Group>

            {/* Options */}
            <Form.Group className="mb-4">
                <b>Options</b>
                <Form.Check
                    type="checkbox"
                    label="Shuffle Answers"
                    checked={shuffle}
                    onChange={() => setShuffle(!shuffle)}
                />
                <Form.Check
                    type="checkbox"
                    label="One Question at a Time"
                    checked={oneQuestionAtATime}
                    onChange={() => setOneQuestionAtATime(!oneQuestionAtATime)}
                />
                <Form.Check
                    type="checkbox"
                    label="Lock Questions After Answering"
                    checked={lockQuestionsAfterAnswering}
                    onChange={() => setLockQuestionsAfterAnswering(!lockQuestionsAfterAnswering)}
                />
                <Form.Check
                    type="checkbox"
                    label="Webcam Required"
                    checked={webcamRequired}
                    onChange={() => setWebcamRequired(!webcamRequired)}
                />
                <div className="d-flex align-items-center mt-2">
                    <Form.Check
                        type="checkbox"
                        label="Time Limit"
                        checked={timeToggle}
                        onChange={() => setTimeToggle(!timeToggle)}
                    />
                    <FormControl
                        type="number"
                        size="sm"
                        placeholder="Minutes"
                        style={{ width: "100px" }}
                        onChange={(e) => setQuizTimeLimit(e.target.value)}
                    />
                </div>
            </Form.Group>

            <Form.Check
                type="checkbox"
                label="Allow Multiple Attempts"
                checked={multiple}
                onChange={() => setMultiple(!multiple)}
            />

            {/* Due Date and Availability */}
            <h5>Assign</h5>
            <FormControl value="Everyone" readOnly className="mb-2" />

            <Form.Group className="mb-2">
                <Form.Label>Due Date</Form.Label>
                <FormControl
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </Form.Group>

            <div className="d-flex gap-3 mb-4">
                <Form.Group>
                    <Form.Label>Available From</Form.Label>
                    <FormControl
                        type="date"
                        value={availableFrom}
                        onChange={(e) => setAvailableFrom(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Until</Form.Label>
                    <FormControl
                        type="date"
                        value={availableUntil}
                        onChange={(e) => setAvailableUntil(e.target.value)}
                    />
                </Form.Group>
            </div>

            {/* Save/Cancel Buttons */}
            <div className="d-flex justify-content-end gap-2">
                <Button
                    variant="secondary"
                    onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`)}
                >
                    Cancel
                </Button>

                <Button variant="danger" onClick={handleSaveQuiz}>
                    Save & View
                </Button>
            </div>
        </div>
    );
}