import { FormControl, ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { GrNotes } from "react-icons/gr";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AssignmentControls from "./AssignmentControls";
import { addAssignment, deleteAssignment, updateAssignment, setAssignments } from "./reducer";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { v4 as uuidv4 } from "uuid";
import DeleteButton from "./DeleteButton";
import * as assignmentsClient from "./client";



export default function Assignments() {
    const { cid, aid } = useParams();


    // const assignments = db.assignments.filter((assignment) => assignment.course === cid);
    const [assignmentName, setAssignmentName] = useState("");
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const dispatch = useDispatch();
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

    useEffect(() => {
        console.log("Updated Assignments:", assignments);
    }, [assignments]);

    // const handleAddAssignment = () => {
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
    //     if (assignments) {
    //         dispatch(updateAssignment(newAssignment));
    //     } else {
    //         dispatch(addAssignment(newAssignment));
    //     }
    // };
    // const fetchAssignments = async () => {
    //     const assignments = await assignmentsClient.findAssignmentsForCourse(cid as string);
    //     dispatch(setAssignments(assignments));
    // };
    // useEffect(() => {
    //     fetchAssignments();
    // }, []);
    const fetchAssignments = async () => {
        const assignments = await assignmentsClient.findAssignmentsForCourse(cid!);
        dispatch(setAssignments(assignments));
    };
    useEffect(() => {
        fetchAssignments();
    }, [cid]);

  
     
    const createAssignmentForCourse = async () => {
        if (!cid) return;
        const existingAssignment = assignments.find((a: any) => a._id === aid);
        const newAssignment = {
            _id: uuidv4(),
            title: assignmentName,
            course: cid,
            description: description,
            points: points,
            dueDate: due,
            getAvailableFrom: from,
            getAvailableUntil: until,
            assignment: aid,
        };
            const assignment = await assignmentsClient.createAssignmentForCourse(cid, newAssignment);
            dispatch(updateAssignment(assignment));
        
        
    };

    const removeAssignment = async (assignmentId: string) => {
        await assignmentsClient.deleteAssignment(assignmentId);
        dispatch(deleteAssignment(assignmentId));
    };
    const saveAssignment = async (assignment: any) => {
        await assignmentsClient.updateAssignment(assignment);
        dispatch(updateAssignment(assignment));
      };
    

 const updateAssignmentHandler = async (assignment: any) => {
    await assignmentsClient.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };
 

    return (
        <div >
            <AssignmentControls />
            <div className="p-2.5 position-relative mb-4 d-flex gap-2 align-items-center">
                <IoIosSearch className="position-absolute top-50 translate-middle-y ms-3" />
                <FormControl type="search" placeholder="Search..." className="ps-5" />
            </div>
            <div id="wd-assignments" className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center gap-2">
                <BsGripVertical className="fs-3" />

                <span className="fw-bold">Assignments </span>
                <div className="ms-auto d-flex align-items-center">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        {!assignments.editing && assignments.name}
                        {assignments.editing && (
                            // <FormControl className="w-50 d-inline-block"
                            //     onChange={(e) =>
                            //         dispatch(
                            //             updateAssignment({ ...assignments, name: e.target.value })
                            //         )
                            //     }
                            //     onKeyDown={(e) => {
                            //         if (e.key === "Enter") {
                            //             saveAssignment({ ...assignments, editing: false });

                            //         }
                            //     }}
                            //     defaultValue={assignments.name} />
                            <FormControl className="w-50 d-inline-block"
                                onChange={(e) =>
                                    updateAssignmentHandler({ ...assignments, name: e.target.value })
                                    
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        updateAssignmentHandler({ ...assignments, editing: false });

                                    }
                                }}
                                defaultValue={assignments.name} />
                        )}

                        <AssignmentControlButtons assignmentId={assignments._id}
                            deleteAssignment={(assignmentId) => removeAssignment(assignmentId)}
                            // editAssignment={(assignmentId) => dispatch(editAssignment(assignmentId))
                                
                             />
                    </div>
                </div>
            </div>

            <ListGroup id="wd-assignments" className="list-group rounded-0">
                {assignments
                    .map((assignment: any) => (
                        <div className="wd-lessons rounded-0" key={assignment._id}>
                            <ListGroup.Item className="wd-lesson p-3 ps-1">
                                <BsGripVertical className="me-2 fs-3" />
                                <GrNotes className="me-2 fs-4" style={{ color: "green" }} />

                                <a
                                    href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                                    style={{ textDecoration: "none", color: "black" }}
                                    className="wd-assignment-link text-black link-underline-opacity-0"
                                    // onClick={saveAssignment}

                                >
                                    {assignment.title}
                                </a>
                                <LessonControlButtons />
                                <DeleteButton assignmentTitle={assignment._id} deleteAssignment={(assignmentId) => removeAssignment(assignmentId)}
                                />
                                <p className="wd-assignment-description ps-5">
                                    <span style={{ color: "red" }}>Multiple Modules </span> | <strong>Not available until</strong> {assignment.availableFrom} |
                                    <strong> Due</strong> {assignment.dueDate} | {assignment.points}pts
                                </p>
                            </ListGroup.Item>
                        </div>
                    ))}
            </ListGroup>

        </div>
    );
}
