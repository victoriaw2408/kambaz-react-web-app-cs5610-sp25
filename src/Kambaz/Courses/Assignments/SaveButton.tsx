import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { addAssignment, updateAssignment } from "./reducer";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import * as assignmentsClient from "./client";

export default function SaveButton({ addAssignment }: {
    addAssignment: () => void
}) {
    // export default function AssignmentControls() {
    const { cid, aid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSave = () => {
        addAssignment(); // Pass the new assignment data
        navigate(`/Kambaz/Courses/${cid}/Assignments`);

    };
    const [assignmentName, setAssignmentName] = useState("");
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const [points, setPoints] = useState("");
    const [until, setUntil] = useState("");
    const [from, setFrom] = useState("");
    const [due, setDue] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        const assignment = assignments.find((a: any) => a.course === cid);
        if (assignment) {
            setAssignmentName(assignment.title);
            setDescription(assignment.description);
            setPoints(assignment.points);
            setDue(assignment.dueDate);
            setFrom(assignment.getAvailableFrom);
            setUntil(assignment.getAvailableUntil);
        }
    }, [assignments, cid]);

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

