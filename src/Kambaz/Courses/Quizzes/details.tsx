import { Button, Table } from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useQuiz } from "./quizcontext";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const { questions } = useQuiz();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);

  const [quiz, setQuiz] = useState<any>(null);

  useEffect(() => {
    if (qid && quizzes.length > 0) {
      const foundQuiz = quizzes.find((q: any) => q._id === qid);
      if (foundQuiz) {
        setQuiz(foundQuiz);
      }
    }
  }, [qid, quizzes]);

//   if (!quiz) return <div>Loading quiz details...</div>;

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center gap-3">
        <Button
          className="btn btn-lg btn-light btn-outline-secondary"
          onClick={() =>
            navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Preview`, {
              state: { questions },
            })
          }
        >
          Preview
        </Button>

        <Button
          className="btn btn-lg btn-light btn-outline-secondary"
          onClick={() =>
            navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Edit`)
          }
        >
          <FaPencil className="me-2" />
          Details
        </Button>

        <Button
          className="btn btn-lg btn-light btn-outline-secondary"
          onClick={() =>
            navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Questions`)
          }
        >
          Questions
        </Button>
      </div>

      <hr />
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>

      <div className="list-group rounded-0 w-100" style={{ maxWidth: "600px" }}>
        <div className="container">
          <div className="row mb-2">
            <div className="col-6 text-end fw-bold">Quiz Type</div>
            <div className="col-6 text-start">{quiz.type}</div>

            <div className="col-6 text-end fw-bold">Points</div>
            <div className="col-6 text-start">{quiz.points}</div>

            <div className="col-6 text-end fw-bold">Assignment Group</div>
            <div className="col-6 text-start">{quiz.assignmentGroup}</div>

            {/* These are placeholder values – you can replace these with real values if you add them to the state */}
            <div className="col-6 text-end fw-bold">Shuffle Answers</div>
            <div className="col-6 text-start">{quiz.shuffleAnswers ? "Yes" : "No"}</div>


            <div className="col-6 text-end fw-bold">Time Limit</div>
            <div className="col-6 text-start"> {quiz.timeLimit} Minutes</div>

            <div className="col-6 text-end fw-bold">Multiple Attempts</div>
            <div className="col-6 text-start">{quiz.multipleAttempts ? "Yes" : "No"}</div>

            <div className="col-6 text-end fw-bold">View Responses</div>
            <div className="col-6 text-start">Always</div>

            <div className="col-6 text-end fw-bold">Show Correct Answers</div>
            <div className="col-6 text-start">Immediately</div>

            <div className="col-6 text-end fw-bold">One Question at a Time</div>
            <div className="col-6 text-start">{quiz.oneQuestionAtATime ? "Yes" : "No"}</div>

            <div className="col-6 text-end fw-bold">Require Respondus LockDown Browser</div>
            <div className="col-6 text-start">No</div>

            <div className="col-6 text-end fw-bold">Required to View Quiz Results</div>
            <div className="col-6 text-start">No</div>

            <div className="col-6 text-end fw-bold">Webcam Required</div>
            <div className="col-6 text-start">{quiz.webcamRequired  ? "Yes" : "No"}</div>

            <div className="col-6 text-end fw-bold">Lock Questions After Answering</div>
            <div className="col-6 text-start">{quiz.lockQuestionsAfterAnswering  ? "Yes" : "No"}</div>
          </div>
        </div>
      </div>

      <br />
      <div>
        <Table striped>
          <thead>
            <tr>
              <th>Due</th>
              <th>For</th>
              <th>Available from</th>
              <th>Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{quiz.dueDate || "N/A"}</td>
              <td>Everyone</td>
              <td>{quiz.availableFrom || "N/A"}</td>
              <td>{quiz.availableUntil || "N/A"}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}