import { FormControl, ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { GrNotes } from "react-icons/gr";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AssignmentControls from "./AssignmentControls";
import { addAssignment, deleteAssignment, editAssignment, updateAssignment } from "./reducer";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { v4 as uuidv4 } from "uuid";
import DeleteButton from "./DeleteButton";


export default function Assignments() {
    const { cid } = useParams();
    const { aid } = useParams();
    

// const assignments = db.assignments.filter((assignment) => assignment.course === cid);
const [assignmentName, setAssignmentName] = useState("");
const { assignments } = useSelector((state: any) => state.assignmentsReducer);
const dispatch = useDispatch();


const  [points, setPoints] = useState("");
const  [until, setUntil] = useState("");
const  [from, setFrom] = useState("");
const  [due, setDue] = useState("");
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

// console.log("addAssignment:", addAssignment);

useEffect(() => {
console.log("Updated Assignments:", assignments);
}, [assignments]);

const handleAddAssignment = () => {
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
if (assignments) {
      dispatch(updateAssignment(newAssignment));
    } else {
      dispatch(addAssignment(newAssignment)); 
    }

};
    return (
        <div >
            <AssignmentControls />
            <div className="p-2.5 position-relative mb-4 d-flex gap-2 align-items-center">
                <IoIosSearch className="position-absolute top-50 translate-middle-y ms-3" />
                <FormControl type="search" placeholder="Search..." className="ps-5" />

                {/* <Button variant="secondary" size="lg" className="me-1 d-flex align-items-center gap-1" id="wd-add-module-btn">
                    <FaPlus className="fs-6" />
                    Group
                </Button>
                <Button variant="danger" size="lg" className="me-1 d-flex align-items-center gap-1" id="wd-add-module-btn">
                    <FaPlus className="fs-6" />
                    Assignment
                </Button> */}
                {/* <ModulesControls setModuleName={setModuleName} moduleName={moduleName}
                                addModule={() => {
                                    dispatch(addModule({ name: moduleName, course: cid }));
                                    setModuleName("")
                                }} /> */}
            </div>
            <div id="wd-assignments" className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center gap-2">
                <BsGripVertical className="fs-3" />

                <span className="fw-bold">Assignments </span>
                <div className="ms-auto d-flex align-items-center">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        {!assignments.editing && assignments.name}
                        {assignments.editing && (
                            <FormControl className="w-50 d-inline-block"
                                onChange={(e) =>
                                    dispatch(
                                        updateAssignment({ ...assignments, name: e.target.value })
                                    )
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        dispatch(updateAssignment({ ...assignments, editing: false }));
                                    }
                                }}
                                defaultValue={assignments.name} />
                        )}

                        <AssignmentControlButtons assignmentId={assignments._id}
                            deleteAssignment={(assignmentId) => {
                                dispatch(deleteAssignment(assignmentId));
                            }}
                            editAssignment={(assignmentId) => dispatch(editAssignment(assignmentId))} />

                    </div>

                </div>
            </div>

            <ListGroup id="wd-assignments" className="list-group rounded-0">
                {assignments
                .filter((assignment: any) => assignment.course === cid)
                .map((assignment: any) => (
                    <div className="wd-lessons rounded-0" key={assignment._id}>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" />
                            <GrNotes className="me-2 fs-4" style={{ color: "green" }} />
                            {/* <a
                                href={`#/Kambaz/Courses/${cid}/Assignments/${assignment.title}`}
                                style={{ textDecorationLine: "none", color: "black" }}
                                className="wd-assignment-link text-black link-underline link-underline-opacity-0">
                                {assignment.title}
                            </a> */}
                            <a
                                href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                                style={{ textDecoration: "none", color: "black" }}
                                className="wd-assignment-link text-black link-underline-opacity-0"
                                onClick={handleAddAssignment}
                            >
                                {assignment.title}
                            
                            </a>
                           
                            <LessonControlButtons />

                            <DeleteButton assignmentTitle={assignment._id} deleteAssignment={() => {
                  dispatch(deleteAssignment(assignment._id))}}/>
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
// import { Button, FormControl, ListGroup, Modal } from "react-bootstrap";
// import { BsGripVertical } from "react-icons/bs";
// import { FaPlus } from "react-icons/fa";
// import { HiMagnifyingGlass } from "react-icons/hi2";
// import { LiaClipboardListSolid } from "react-icons/lia";
// import { IoEllipsisVertical } from "react-icons/io5";
// import { Link, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addAssignment, deleteAssignment, updateAssignment } from "./reducer";
// import { v4 as uuidv4 } from "uuid";
// import DeleteButton from "./DeleteButton";

// export default function Assignments() {
//   const { cid, aid } = useParams();
//      const [assignmentTitle, setAssignmentTitle] = useState("");
//      const [assignmentDes, setAssignmentDes] = useState("");
//      const [assignmentPoints, setAssignmentPoints] = useState("");
//      const [dueDate, setDueDate] = useState("");
//      const [from, setFrom] = useState("");
//      const [until, setUntil] = useState("");
//      const { assignments } = useSelector((state: any) => state.assignmentReducer);
//      useEffect(() => {
//       const assignment = assignments.find((a: any) => a.course === cid);
//       if (assignment) {
//         setAssignmentTitle(assignment.title);
//         setAssignmentDes(assignment.description);
//         setAssignmentPoints(assignment.points);
//         setDueDate(assignment.dueDate);
//         setFrom(assignment.getAvailableFrom);
//         setUntil(assignment.getAvailableUntil);
//       }
//     }, [assignments, cid]);

//     // console.log("addAssignment:", addAssignment);
  
//   const dispatch = useDispatch();
//   useEffect(() => {
//     console.log("Updated Assignments:", assignments);
//   }, [assignments]);

//   const handleAddAssignment = () => {
//     const newAssignment = {
//       _id: uuidv4(), 
//       title: assignmentTitle,
//       course: cid,
//       description: assignmentDes,
//       points: assignmentPoints, 
//       dueDate: dueDate, 
//       getAvailableFrom: from, 
//       getAvailableUntil: until,
//       assignment: aid,
//     };
//     if (assignments) {
//            dispatch(updateAssignment(newAssignment));
//          } else {
//            dispatch(addAssignment(newAssignment)); 
//          }
   
//   };

//   return (
    
//     <div >
//        {/* <SaveButton
//           addAssignment={handleAddAssignment} 
//         /> */}

//       <div id="wd-assignments" className="p-2.5 position-relative mb-4 d-flex gap-2 align-items-center">
//         <HiMagnifyingGlass
//           className="position-absolute top-50 translate-middle-y ms-3"
//         />
//         <FormControl
//           type="search"
//           placeholder="Search..."
//           className="ps-5"
//         />
//       <Link to={`/Kambaz/Courses/${cid}/Assignments/New`}style={{ textDecoration: "none" }}>
//         <Button variant="danger" size="lg" className="me-1 d-flex align-items-center gap-1" id="wd-add-module-btn">
//           <FaPlus className="fs-6" />
//           Assignment
//         </Button>
//       </Link>
      

//       </div>
//       <ListGroup className="rounded-0" id="wd-modules">
//         {/* <ListGroup.Item className="wd-module p-0 mb-5 fs-9 border-gray fs-5"> */}
//           <div className="wd-title p-3 ps-2 bg-secondary fs-5"> <BsGripVertical className="me-2" /> ASSIGNMENTS
//             <div className="float-end">
//               <FaPlus />
//               <IoEllipsisVertical className="fs-4" />
//             </div>
//           </div>
          
//           {assignments
//           .filter((assignment: any) => assignment.course === cid)
//           .map((assignment: any) => (
//             <li key={assignment._id} className="wd-module list-group-item mb-0 fs-6 border-gray">
//               <BsGripVertical className="fs-3 position-relative bring-down-first" />
//               <LiaClipboardListSolid className="me-3 text-success fs-2 position-relative bring-down" />
//               <div className="position-absolute make-assignment-move translate-middle w-75">

//                   <Link  onClick={handleAddAssignment}
//                     className="wd-assignment-link text-black link-underline link-underline-opacity-0" 
//                     to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
//                   >
//                     <br />
//                     <b>{assignment.title}</b>
//                   </Link>
                        
//                 <p>
//                   <text className="text-danger">Multiple Modules</text> | 
//                   <b> Not Available until </b> {assignment.getAvailableUntil} | 
//                   <b> Due </b> {assignment.dueDate} | 
//                   {assignment.points} pts
//                   <DeleteButton assignmentTitle={assignment._id} deleteAssignment={(assignmentTitle) => {
//                   dispatch(deleteAssignment(assignment._id))}}/>
//                 </p>
               
                
                   
//               </div>


//               <br /><br /><br/>
//             </li>
//           ))
//         }
      
//       </ListGroup>
      
//     </div>
//   );
// }
