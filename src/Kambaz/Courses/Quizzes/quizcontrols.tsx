import Button from "react-bootstrap/esm/Button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import QuizEditor from "./editor";

export default function QuizControls() {
  const { cid, qid } = useParams();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  useEffect(() => {
    if (qid) {
      setShow(true);
    }
  }, [qid]);

  return (
    <div>
      <input
        placeholder="Search for Quizzes"
        id="wd-search-quiz"
        className="me-2 px-2"
        style={{ borderRadius: "4px", border: "1px solid #ccc", height: "38px" }}
      />
      <Button id="wd-add-quiz-group" variant="secondary me-1">
        + Group
      </Button>
      <Button
        id="wd-add-quiz"
        variant="danger me-1"
        onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/NEW`)}
      >
        + Quiz
      </Button>
      <QuizEditor
       
      />
    </div>
  );
}