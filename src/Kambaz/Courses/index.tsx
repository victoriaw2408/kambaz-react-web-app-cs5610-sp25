import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments"
import AssignmentEditor from "./Assignments/Editor";
import { Navigate, Route, Routes , useParams, useLocation} from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import Zoom from "./Zoom";
import Quizzes from "./Quizzes";
import Piazza from "./Piazza";
import { useEffect, useState } from "react";
import * as client from "../Courses/client"; // Adjust this path according to your structure


export default function Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);
    const { pathname } = useLocation();
    const [users, setUsers] = useState<any[]>([]); // State to hold users
    useEffect(() => {
        const fetchUsersForCourse = async () => {
          if (!cid) return;
          try {
            const usersData = await client.findUsersForCourse(cid);  // Fetch users using the course ID
            setUsers(usersData);
          } catch (error) {
            console.error("Failed to fetch users:", error);
          }
        };
    
        fetchUsersForCourse();
      }, [cid]);
 
    
    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} &gt; {pathname.split("/")[4]}


                </h2> 
                <hr />
            <div className="d-flex">
                <div className="d-none d-md-block">

                    <CourseNavigation />
                </div>
                <div className="flex-fill" >
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="People" element={<PeopleTable users={users} />} />
                        <Route path="Quizzes" element={<Quizzes />} /> 
                        <Route path="Zoom" element={<Zoom />} /> 
                        <Route path="Piazza" element={<Piazza />} />
                    </Routes>
                </div></div>

        </div>
    );
}

