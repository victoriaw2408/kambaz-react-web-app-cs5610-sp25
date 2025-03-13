import { FaTrash } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
import GreenCheckmark from "./GreenCheckmark";
import { Button } from "react-bootstrap";
export default function AssignmentControlButtons({ assignmentId, deleteAssignment, editAssignment }: {
    assignmentId: string; deleteAssignment: (assignmentId: string) => void;
    editAssignment: (assignmentId: string) => void }) {
     const { currentUser } = useSelector((state: any) => state.accountReducer);
         if (currentUser?.role !== "FACULTY") {
           return null; 
         }
  return (
    <div className="float-end">
      <FaPencil onClick={() => editAssignment(assignmentId)} className="text-primary me-3" />
      <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteAssignment(assignmentId)}/>
      <GreenCheckmark />
      <BsPlus className="fs-1" />
      <Button className="wd-rounded-corners-all-around wd-border-black wd-border-solid btn btn-outline-dark btn-light ms-2">
                        40% of Total
                    </Button>
      <IoEllipsisVertical className="fs-4" />
    </div> );}

    