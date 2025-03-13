import { Form, Link } from "react-router-dom";
import { Row, Col, Button, Card, FormControl } from "react-bootstrap";
import * as db from "./Database";
import { useSelector, useDispatch } from "react-redux";

export default function Dashboard({
      courses,
      course,
      setCourse,
      addNewCourse,
      deleteCourse,
      updateCourse,
    }: {
      courses: {
        image: string | undefined; _id: string; name: string; description: string 
    }[];
      course: { _id: string; name: string; description: string };
      setCourse: (course: { _id: string; name: string; description: string }) => void;
      addNewCourse: (course: { _id: string; name: string; description: string }) => void;
      deleteCourse: (courseId: string) => void;
      updateCourse: (course: { _id: string; name: string; description: string }) => void;
    })
   {
    const { enrollments } = db;
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    // const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
    // const [showAllCourses, setShowAllCourses] = React.useState(false);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h5>New Course
      <button className="btn btn-primary float-end"
                id="wd-add-new-course-click"
                onClick={() => addNewCourse(course)}>
                Add
              </button>
              <button className="btn btn-warning float-end me-2"
                onClick={() => updateCourse(course)} id="wd-update-course-click">
                Update
              </button>
      </h5>
      <br />
      <FormControl value={course.name} className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })} />
      <FormControl as="textarea" value={course.description} rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value })} />

      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses
           .filter((course) =>
            enrollments.some(
              (enrollment) =>
                enrollment.user === currentUser._id &&
                enrollment.course === course._id
               ))      
          .map((course) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link to={`/Kambaz/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <Card.Img src={course.image} variant="top" width="100%" height={160} />
                  <Card.Body className="card-body">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name} </Card.Title>
                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description} </Card.Text>
                    <Button variant="primary"> Go </Button>


                    <button onClick={(event) => {
                      event.preventDefault();
                      deleteCourse(course._id);
                    }} className="btn btn-danger float-end"
                      id="wd-delete-course-click">
                      Delete
                    </button>


                    <button id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                      className="btn btn-warning me-2 float-end" >
                      Edit
                    </button>

                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>);
}

