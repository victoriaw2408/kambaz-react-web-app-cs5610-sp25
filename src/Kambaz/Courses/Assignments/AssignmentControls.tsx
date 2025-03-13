import { FaPlus } from "react-icons/fa6";
import { Button, Dropdown } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
// import NewAssignmentEditor from "./NewAssignmentEditor.tsx";
import { useState } from "react";
import GreenCheckmark from "../Modules/GreenCheckmark";
import ModuleEditor from "../Modules/ModuleEditor";
import { useParams } from "react-router";
import NewAssignmentEditor from "./NewAssignmentEditor";
export default function AssignmentControls() {
   
        const [show, setShow] = useState(false);
     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true); 
     const { cid } = useParams();

    return (
        <div id="wd-assignment-modules-controls" className="text-nowrap">
            <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment-btn"  onClick={handleShow}>  
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                
                 <a
                              href={`#/Kambaz/Courses/${cid}/Assignments/Editor`}
                              style={{ textDecorationLine: "none", color: "black" }}
                              className="wd-assignment-link  link-underline link-underline-opacity-0">
                             Assignment
                          </a>
               
            </Button>
            <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-group-btn">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Group
            </Button>
            {/* <div className="me-2 float-start" id="wd-search-bar">
                    <FaSearch className="position-relative me-4" style={{ left: "15px"}} />
                <input 
                type="text"
                placeholder="Search..."
                className="search-input"/>
                </div> */}
                {/* <NewAssignmentEditor show={show} handleClose={handleClose} dialogTitle="Add Assignment"
         assignmentName={assignmentName} setAssignmentName={setAssignmentName} addAssignment={addAssignment} /> */}
               
            </div>
    );
}
{/* <div id="wd-assignment-modules-controls" className="text-nowrap">
<Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment-btn"  onClick={handleShow}>  
    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
    Assignment
</Button>
<Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-group-btn">
    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
    Group
</Button>
<div className="me-2 float-start" id="wd-search-bar">
        <FaSearch className="position-relative me-4" style={{ left: "15px"}} />
    <input 
    type="text"
    placeholder="Search..."
    className="search-input"/>
    </div>
    <NewAssignmentEditor show={show} handleClose={handleClose} dialogTitle="Add Assignment"
assignmentName={assignmentName} setAssignmentName={setAssignmentName} addAssignment={addAssignment} />
</div> */}