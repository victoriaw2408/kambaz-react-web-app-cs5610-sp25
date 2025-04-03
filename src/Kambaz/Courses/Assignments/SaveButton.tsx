import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";


export default function SaveButton({ addAssignment }: {
    addAssignment: () => void
}) {
    // export default function AssignmentControls() {
    const { cid } = useParams();
    const navigate = useNavigate();
    const handleSave = () => {
        addAssignment(); // Pass the new assignment data
        navigate(`/Kambaz/Courses/${cid}/Assignments`);

    };
   
    // const createAssignmentForCourse = async () => {
    //     if (!cid) return;
    //     const newAssignment = {
    //         _id: uuidv4(),
    //         title: assignmentName,
    //         course: cid,
    //         description: description,
    //         points: points,
    //         dueDate: due,
    //         getAvailableFrom: from,
    //         getAvailableUntil: until,
    //         assignment: aid,
    //     };
    //     const assignment = await assignmentsClient.createAssignmentForCourse(cid, newAssignment);
    //     dispatch(addAssignment(assignment));
    // };


    // const saveAssignment = async (assignment: any) => {
    //     await assignmentsClient.updateAssignment(assignment);
    //     dispatch(updateAssignment(assignment));
    // };

    return (
        <div id="wd-assignment-modules-controls" className="text-nowrap">

            <Button className="btn btn-lg btn-danger" id="wd-add-module-btn"
                onClick={handleSave}>

                Save
            </Button>
            <Button onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments`)} variant="secondary" size="lg" className="me-1 float-end" id="wd-add-module-btn">
                Canceled
            </Button>
        </div>
    );
}

