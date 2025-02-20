import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { courses } from "../Database";
import {useParams } from "react-router";

export default function CourseNavigation() {
  const { pathname } = useLocation();
  const location = useLocation();
  
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const { cid } = useParams();

return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const path = `/Kambaz/Courses/${cid}/${link}`;
        const isActive = location.pathname === path;
        return (
          <Link
            key={link}
            to={path}
            id={`wd-course-${link.toLowerCase()}-link`}
            className={`list-group-item border border-0 ${isActive ? 'active' : 'text-danger'}`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}

