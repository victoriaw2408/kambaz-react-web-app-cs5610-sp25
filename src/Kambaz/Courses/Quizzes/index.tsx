import {
  Button,
  Dropdown,
  DropdownButton,
  FormControl,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import { BsCheckCircleFill, BsGripVertical, BsRocketTakeoff } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoEllipsisVertical } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as quizzesClient from "./client";
import {
  addQuiz,
  deleteQuiz,
  setQuizzes,
  updateQuiz,
  editQuiz,
} from "./reducer";

export default function Quizzes() {
  const { cid, uid } = useParams();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const [quizName, setQuizName] = useState("");
  const [creatingQuiz, setCreatingQuiz] = useState(false);
  const { currentUser } = useSelector((state: any) => state.accountReducer);


  useEffect(() => {
      const fetchQuizzes = async () => {
          const quizzes = await quizzesClient.findQuizzesForCourse(cid as string);
          dispatch(setQuizzes(quizzes));
      };
      fetchQuizzes();
  }, [cid]);

  const handleAddQuiz = async () => {
      if (!quizName.trim()) {
          alert("Please provide a quiz title.");
          return;
      }
      setCreatingQuiz(true);
      const newQuiz = {
          title: quizName,
          course: cid,
          description: "",
          type: "Graded Quiz",
          assignmentGroup: "Quizzes",
          points: 0,
          dueDate: "",
          availableFrom: "",
          availableUntil: "",
          published: false,
          questions: [],
      };

      try {
          const createdQuiz = await quizzesClient.createQuiz(newQuiz);
          dispatch(addQuiz(createdQuiz));
          setQuizName("");
      } catch (error) {
          console.error("Error creating quiz:", error);
          alert("Error creating quiz. Please try again later.");
      } finally {
          setCreatingQuiz(false);
      }
  };

  const handleDeleteQuiz = async (quizId: string) => {
      try {
          await quizzesClient.deleteQuiz(quizId);
          dispatch(deleteQuiz(quizId));
      } catch (error) {
          console.error("Error deleting quiz:", error);
          alert("Error deleting quiz. Please try again later.");
      }
  };

  const handleEditQuiz = (quizId: string) => {
      // Dispatch editQuiz to mark the quiz as being edited
      dispatch(editQuiz(quizId)); // This sets `editing: true` for the quiz
  };

  const handleUpdateQuiz = async (updatedQuiz: any) => {
      try {
          const savedQuiz = await quizzesClient.updateQuiz(updatedQuiz);
          dispatch(updateQuiz(savedQuiz));
      } catch (error) {
          console.error("Error updating quiz:", error);
          alert("Error updating quiz. Please try again later.");
      }
  };

  const getAvailabilityStatus = (quiz: any) => {
      const now = new Date();
      const from = new Date(quiz.availableFrom);
      const until = new Date(quiz.availableUntil);
      if (!quiz.availableFrom || !quiz.availableUntil) return "N/A";
      if (now < from) {
          return `Not available until ${from.toLocaleDateString()}`;
      } else if (now >= from && now <= until) {
          return "Available";
      } else {
          return "Closed";
      }
  };

  return (
      <div>
          {/* Top Bar */}
          <div className="p-2.5 position-relative mb-4 d-flex gap-2 align-items-center">
              <HiMagnifyingGlass className="position-absolute top-50 translate-middle-y ms-3" />
              <FormControl
                  type="search"
                  placeholder="Search for Quiz"
                  className="ps-5"
                  value={quizName}
                  onChange={(e) => setQuizName(e.target.value)}
              />
              {(currentUser.role === "ADMIN" || currentUser.role === "FACULTY") && (
                  <div>
                      <Button
                          variant="danger"
                          size="lg"
                          className="me-1 d-flex align-items-center gap-1"
                          onClick={handleAddQuiz}
                          disabled={creatingQuiz}
                      >
                          {creatingQuiz ? <Spinner animation="border" size="sm" /> : <FaPlus />}
                          Quiz
                      </Button>
                      <Button
                          variant="btn btn-secondary btn-lg"
                          size="lg"
                          className="me-1 d-flex align-items-center"
                      >
                          <IoEllipsisVertical className="fs-3" />
                      </Button>
                  </div>
              )}

          </div>

          <hr />
          <br />

          {/* Quiz List */}
          <ListGroup className="rounded-0" id="wd-modules">
              <div className="wd-title p-3 ps-2 bg-secondary fs-5">
                  <BsGripVertical className="me-2" />
                  Assignment Quizzes
                  <div className="float-end">
                      <FaPlus />
                      <IoEllipsisVertical className="fs-4" />
                  </div>
              </div>

              {quizzes
                  .filter((q: any) => q.course === cid)
                  .map((quiz: any) => (
                      <li
                          key={quiz._id}
                          className="wd-module list-group-item mb-0 fs-6 border-gray d-flex gap-3 align-items-start"
                      >
                          {/* Left icon */}
                          <BsRocketTakeoff className="text-success fs-2 mt-2" />

                          {/* Right content */}
                          <div className="flex-grow-1">
                              {(currentUser.role === "ADMIN" || currentUser.role === "FACULTY") && (
                              <Link
                                  className="wd-assignment-link text-black link-underline link-underline-opacity-0"
                                  to={`/Kambaz/courses/${cid}/quizzes/${quiz._id}`}
                              >
                                  <b>{quiz.title || "Untitled Quiz"}</b>
                              </Link>
                              )}

                               {currentUser.role === "STUDENT" && (
                              <Link
                                  className="wd-assignment-link text-black link-underline link-underline-opacity-0"
                                  to={`/Kambaz/courses/${cid}/Quizzes/${quiz._id}/StudentView`}
                              >
                                  <b>{quiz.title || "Untitled Quiz"}</b>
                              </Link>
                              )}

                              <p className="mb-1">
                                  {getAvailabilityStatus(quiz)} | <b>Due:</b> {quiz.dueDate || "N/A"} |{" "}
                                  {quiz.points || 0} pts | {quiz.questions?.length || 0} Questions
                              </p>

                              {/* Dropdown and publish status */}
                              {(currentUser.role === "ADMIN" || currentUser.role === "FACULTY") && (
                              <div className="d-flex align-items-center gap-3">
                                  <DropdownButton
                                      id="dropdown-basic-button"
                                      title={<IoEllipsisVertical className="fs-4" />}
                                      drop="end"
                                      className="mt-1"
                                      variant="light"
                                  >

                                      <Dropdown.Item
                                          as={Link}
                                          to={`/Kambaz/courses/${cid}/quizzes/${quiz._id}`}
                                          onClick={() => handleEditQuiz(quiz._id)}
                                      >
                                          Edit
                                      </Dropdown.Item>

                                      {quiz.editing && (
                                          <Dropdown.Item onClick={() => handleUpdateQuiz({ ...quiz, editing: false })}>
                                              Save
                                          </Dropdown.Item>
                                      )}

                                      <Dropdown.Item onClick={() => handleDeleteQuiz(quiz._id)}>
                                          Delete
                                      </Dropdown.Item>
                                  </DropdownButton>
                                 
                                  {quiz.published && <BsCheckCircleFill className="fs-4 text-success" />}
                              </div>
                              )}
                          </div>
                      </li>
                  ))}

          </ListGroup>
      </div>
  );
}