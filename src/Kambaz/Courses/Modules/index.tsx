import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";
import * as db from "../../Database";

const Modules = () => {
    const { cid } = useParams();
    const modules = db.modules;
    return (
        <div>
            <ModulesControls /><br /><br /><br /><br />
            <ul id="wd-modules" className="list-group rounded-0">
                {modules
                    .filter((module: any) => module.course === cid)
                    .map((module: any, idx: number) => (
                        <li
                            className="wd-module list-group-item p-0 mb-5 fs-5 border-gray"
                            key={module._id}
                        >
                            <div className="wd-title p-3 ps-2 bg-secondary">
                                <BsGripVertical className="me-2 fs-3" />
                                <span className="fw-bold">Module {idx + 1}: </span>{module.name}
                                <ModuleControlButtons />
                            </div>
                            {module.lessons && (
                                <ul className="wd-lessons list-group rounded-0">
                                    {module.lessons.map((lesson: any) => (
                                        <li
                                            className="wd-lesson list-group-item p-3 ps-1"
                                            key={lesson._id}
                                        >
                                            <BsGripVertical className="me-2 fs-3" />
                                            {lesson.name}
                                            <LessonControlButtons />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    )
                    )}
            </ul>
        </div>
    );
};

export default Modules;

//   return (
//     <div id="wd-modules" >
//           <ModulesControls /><br /><br /><br />
//     <h2 id="wd-title">({modules.length})</h2> <hr />
//         <ul id="wd-modules" className="list-group rounded-0">
//       {modules
//         .filter((module: any) => module.course === cid)
//         .map((module: any) => (
//         <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
//           <div className="wd-title p-3 ps-2 bg-secondary">
//             <BsGripVertical className="me-2 fs-3" /> {module.name} <ModuleControlButtons />
//           </div>
//           {module.lessons && (
//             <ul className="wd-lessons list-group rounded-0">
//               {module.lessons.map((lesson: any) => (
//                 <li className="wd-lesson list-group-item p-3 ps-1">
//                   <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
//                 </li>
//               ))}</ul>)}</li>))}</ul></div>
//               ////
//               );}

//   return (
//     <div id="wd-dashboard">
//       <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
//       <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
//       <div id="wd-dashboard-courses">
//         <Row xs={1} md={5} className="g-4">
//           {courses.map((course) => (
//             <Col className="wd-dashboard-course" style={{ width: "300px" }}>
//               <Card>
//                 <Link to={`/Kambaz/Courses/${course._id}/Home`}
//                       className="wd-dashboard-course-link text-decoration-none text-dark" >
//                   <Card.Img src={course.image} variant="top" width="100%" height={160} />
//                   <Card.Body className="card-body">
//                     <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
//                       {course.name} </Card.Title>
//                     <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
//                       {course.description} </Card.Text>
//                     <Button variant="primary"> Go </Button>
//                   </Card.Body>
//                 </Link>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </div>
//     </div>);}

{/* <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" /> Week 1

                        <div className="float-end">
                            <IoEllipsisVertical className="fs-4" />
                        </div>

                        <ModuleControlButtons />  <div className="float-end">
                            <GreenCheckmark /></div>

                    </div>
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" />LEARNING OBJECTIVES <LessonControlButtons />
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" />Introduction to the course <LessonControlButtons />
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" />
                            Learn what is Web Development <LessonControlButtons /></ListGroup.Item>
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
            <ListGroup className="rounded-0" id="wd-modules">
                <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" /> Week 2

                        <div className="float-end">
                            <IoEllipsisVertical className="fs-4" />
                        </div>

                        <ModuleControlButtons />  <div className="float-end">
                            <GreenCheckmark /></div>


                    </div>
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" />LEARNING OBJECTIVES <LessonControlButtons />
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" />Learn how to create user interfaces with HTML<LessonControlButtons />
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" />
                            Deploy the assignment to Netlify <LessonControlButtons /></ListGroup.Item>
                    </ListGroup> */}
