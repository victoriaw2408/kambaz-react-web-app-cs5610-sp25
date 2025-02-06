import { Button, FormControl, ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import LessonControlButtons from "../Modules/LessonControlButtons";
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import { GrNotes } from "react-icons/gr";
import { IoEllipsisVertical } from "react-icons/io5";


export default function Assignments() {
    return (

        <div id="wd-assignments" >
            <div id="wd-assignments" className="p-2.5 position-relative mb-4 d-flex gap-2 align-items-center"
            ><IoIosSearch
                    className="position-absolute top-50 translate-middle-y ms-3 "
                />
                <FormControl
                    type="search"
                    placeholder="Search..."
                    className="ps-5"
                />

                <Button variant="secondary" size="lg" className="me-1 d-flex align-items-center gap-1" id="wd-add-module-btn">
                    <FaPlus className="fs-6" />
                    Group
                </Button>
                <Button variant="danger" size="lg" className="me-1 d-flex align-items-center gap-1" id="wd-add-module-btn">
                    <FaPlus className="fs-6" />
                    Assignment
                </Button></div>

            <ListGroup className="rounded-0" id="wd-modules">
                <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2" />  ASSIGNMENTS
                        <div className="float-end">
                            <IoEllipsisVertical className="fs-4" />
                        </div>
                        <ModuleControlButtons />

                        <Button className="wd-rounded-corners-all-around float-end wd-border-black wd-border-solid btn btn-outline-dark btn btn-light">
                            40% of Total
                        </Button>
                    </div>

                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" /> <GrNotes className="me-2 fs-4" style={{ color: "green" }} />
                            <a href="#/Kambaz/Courses/1234/Assignments/123" style={{ textDecorationLine: "none", color: "black" }}
                                className="wd-assignment-link" >
                                A1 </a>
                            <LessonControlButtons />
                            <p className="wd-assignment-description ps-5">
                                <span style={{ color: "red" }}>Multiple Modules </span> | <strong>Not available until</strong> May 6 at 12:00am |
                                <strong> Due</strong> May 13 at 11:59pm | 100pts
                            </p>
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> <GrNotes className="me-2 fs-4" style={{ color: "green" }} />
                        <a href="#/Kambaz/Courses/1234/Assignments/123" style={{ textDecorationLine: "none", color: "black" }}
                            className="wd-assignment-link" >
                            A2 </a>
                        <LessonControlButtons />
                        <p className="wd-assignment-description ps-5">
                            <span style={{ color: "red" }}>Multiple Modules </span> | <strong>Not available until</strong> May 6 at 12:00am |
                            <strong> Due</strong> May 20 at 11:59pm | 100pts
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> <GrNotes className="me-2 fs-4" style={{ color: "green" }} />
                        <a href="#/Kambaz/Courses/1234/Assignments/123" style={{ textDecorationLine: "none", color: "black" }}
                            className="wd-assignment-link" >
                            A3 </a>
                        <LessonControlButtons />
                        <p className="wd-assignment-description ps-5">
                            <span style={{ color: "red" }}>Multiple Modules </span> | <strong>Not available until</strong>  May 20 at 12:00am |
                            <strong> Due</strong> May 27 at 11:59pm | 100pts
                        </p>
                    </ListGroup.Item>
                </ListGroup.Item>
            </ListGroup>
        </div >
    );
}
