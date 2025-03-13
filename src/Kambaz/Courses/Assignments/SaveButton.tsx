import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";

export default function SaveButton({ addAssignment}: {
    addAssignment: () => void }) {
    // export default function AssignmentControls() {
     const { cid } = useParams();

   
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