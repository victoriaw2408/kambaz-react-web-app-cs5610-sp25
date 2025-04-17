import { Button, Card, Col, FormControl, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { addEnrollment, deleteEnrollment } from "./Courses/enrollmentReducer";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrolling,
  setEnrolling,
  updateEnrollment,
}: {
  courses: {
    enrolled: any;
    image: string | undefined;
    _id: string;
    name: string;
    description: string;
  }[];
  course: { _id: string; name: string; description: string; };
  setCourse: (course: { _id: string; name: string; description: string }) => void;
  addNewCourse: (course: { _id: string; name: string; description: string }) => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: (course: { _id: string; name: string; description: string }) => void;
  enrolling: boolean; setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void
}) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const [showAllCourses, setShowAllCourses] = React.useState(false);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard
        <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
          {enrolling ? "My Courses" : "All Courses"}
        </button>

      </h1>

      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      {currentUser?.role === "FACULTY" && (
        <div>
          <h5>
            New Course
            <button className="btn btn-primary float-end" id="wd-add-new-course-click" onClick={() => addNewCourse(course)}>
              Add
            </button>
            <button className="btn btn-warning float-end me-2" id="wd-update-course-click" onClick={() => updateCourse(course)}>
              Update
            </button>
          </h5>
          <br />

          <FormControl value={course.name} className="mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value })} placeholder="Course Name" />
          <FormControl as="textarea" value={course.description} rows={3} onChange={(e) => setCourse({ ...course, description: e.target.value })} placeholder="Course Description" />
          <hr />

          <Row xs={1} md={5} className="g-4">
            {courses
              .map((course) => (
                <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                  <Card>
                    <Link to={`/Kambaz/Courses/${course._id}/Home`} className="wd-dashboard-course-link text-decoration-none text-dark">
                    <Card.Img
                      src="/images/reactjs.jpg"
                      variant="top"
                      width="100%"
                      height={160}
                    />
                      <Card.Body className="card-body">
                        <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                          {enrolling && (

                            <button onClick={(event) => {
                              event.preventDefault();
                              updateEnrollment(course._id, !course.enrolled);
                            }}
                              className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`} >
                              {course.enrolled ? "Unenroll" : "Enroll"}
                            </button>

                          )}
                          {course.name}</Card.Title>
                        <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>{course.description}</Card.Text>
                        <Button variant="primary">Go</Button>
                        <button onClick={(e) => { e.preventDefault(); deleteCourse(course._id); }} className="btn btn-danger float-end" id="wd-delete-course-click">Delete</button>
                        <button id="wd-edit-course-click" onClick={(e) => { e.preventDefault(); setCourse(course); }} className="btn btn-warning me-2 float-end">Edit</button>
                      </Card.Body>
                    </Link>
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      )}

      {currentUser && ["STUDENT", "TA", "ADMIN"].includes(currentUser.role) && (
        <>
          <Button variant="btn btn-primary" onClick={() => setShowAllCourses(!showAllCourses)} className="float-end">
            {showAllCourses ? "Show My Enrollments" : "Show All Courses"}
          </Button>
          <div id="wd-dashboard-courses">
            <Row xs={1} md={5} className="g-4">
              {courses
                // .filter((course) => showAllCourses || enrollments.some((e: { user: string; course: string }) => e.user === currentUser._id && e.course === course._id))
                .map((course) => (
                  <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                    <Card>
                      <Link to={`/Kambaz/Courses/${course._id}/Home`} className="wd-dashboard-course-link text-decoration-none text-dark">
                      <Card.Img
                      src="/images/reactjs.jpg"
                      variant="top"
                      width="100%"
                      height={160}
                    />
                        <Card.Body className="card-body">
                          <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">

                            {course.name}</Card.Title>
                          <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>{course.description}</Card.Text>
                          <Button variant="primary">Go</Button>

                          {course.enrolled ? (

                            <Button variant="danger" onClick={(event) => {
                              event.preventDefault();
                              updateEnrollment(course._id, false);
                            }} className="float-end">
                              Unenroll
                            </Button>
                          ) : (
                            <Button variant="success" onClick={(event) => {
                              event.preventDefault();
                              updateEnrollment(course._id, true);
                            }} className="float-end">
                              Enroll
                            </Button>
                          )

                          }

                          {currentUser.role === "ADMIN" && (
                            <>
                              <Button variant="danger" onClick={(e) => { e.preventDefault(); deleteCourse(course._id); }} className="float-end">Delete</Button>
                              <Button variant="warning" onClick={(e) => { e.preventDefault(); setCourse(course); }} className="float-end me-2">Edit</Button>
                            </>
                          )}
                        </Card.Body>
                      </Link>
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
        </>
      )}
    </div>
  );
}
