import { FaPlus } from "react-icons/fa6";
import { Button } from "react-bootstrap";

// import NewAssignmentEditor from "./NewAssignmentEditor.tsx";
import { useState } from "react";

import { useParams } from "react-router";
export default function AssignmentControls() {

    const [, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const { cid } = useParams();
    

    return (
        <div id="wd-assignment-modules-controls" className="text-nowrap">
            <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment-btn" onClick={handleShow}>
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />

                <a
                    href={`#/Kambaz/Courses/${cid}/Assignments/Editor`}
                    style={{ textDecorationLine: "none", color: "black" }}
                    className="wd-assignment-link  link-underline link-underline-opacity-0">
                    Assignment
                </a>

            </Button>
            <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-group-btn">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} 
                />
                Group
            </Button>


        </div>
    );
}
