import { Routes, Route, Navigate }
  from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ProtectedRoute from "./Account/ProtectedRoute";
import { useSelector } from "react-redux";
import Session from "../Account/Session";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import { setAssignments } from "./Courses/Assignments/reducer";



export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
    image: "/images/reactjs.jpg"
  });

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchCourses = async () => {
    try {
      const courses = await userClient.findMyCourses();
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  // const addNewCourse = async () => {
  //   const newCourse = await userClient.createCourse(course);
  //   setCourses([...courses, newCourse]);
  // };

  const addCourse = () => {
    const newCourse = { ...course, _id: uuidv4() };
    setCourses([...courses, newCourse]);

    courses.push({
      user: currentUser?._id,
      course: newCourse._id,
      _id: ""
    });
  };

  const deleteCourse = async (courseId: string) => {
    // const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };
  const fetchAssignments = async () => {
    try {
      const assignments = await userClient.findMyAssignments();
      setAssignments(assignments);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAssignments();
  }, [currentUser]);

  return (
    <Session>

      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route path="/Dashboard" element={<ProtectedRoute>
              <Dashboard
                courses={courses}
                course={course}
                setCourse={setCourse}
                addNewCourse={addCourse}
                deleteCourse={deleteCourse}
                updateCourse={updateCourse}

              />
            </ProtectedRoute>
            } />
            <Route path="/Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>} />
            <Route
              path="/Calendar"
              element={<h1>Calendar</h1>}
            />
            <Route
              path="/Inbox"
              element={<h1>Inbox</h1>}
            />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
