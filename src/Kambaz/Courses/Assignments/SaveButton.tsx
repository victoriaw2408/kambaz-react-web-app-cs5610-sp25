import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";

export default function SaveButton({ addAssignment}: {
    addAssignment: () => void }) {
    // export default function AssignmentControls() {
        const [show, setShow] = useState(false);
     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true); 
     const { cid } = useParams();

     const[assignmentName, setAssignmentName] = useState("");
  const  [points] = useState("");
  const  [until] = useState("");
  const  [from] = useState("");
  const  [due] = useState("");
  const  [description] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
 

    addAssignment(); // Pass the new assignment data
    navigate(`/Kambaz/Courses/${cid}/Assignments`); 

   };

    return (
        <div id="wd-assignment-modules-controls" className="text-nowrap">
            
            <Button className="btn btn-lg btn-danger" id="wd-add-module-btn" 
                             onClick={handleSave}>

                                   Save
                              </Button>
               
            </div>
    );
}