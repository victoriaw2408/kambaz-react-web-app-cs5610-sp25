import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls"
import { ListGroup } from "react-bootstrap"
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
export default function Modules() {
    return (
        <div>
            <ModulesControls /><br /><br /><br />
            <ListGroup className="rounded-0" id="wd-modules">
                <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
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
                    </ListGroup>
                </ListGroup.Item>

            </ListGroup>
        </div >
    );
}
