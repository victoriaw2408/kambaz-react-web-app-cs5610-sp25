import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/unnamed.jpg" width={200} />
            <div>
              <h5> ASTRO1001  </h5>
              <p className="wd-dashboard-course-title">
                Astronomy  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/Recipe_chocolate_layer_cake-1000x1000.jpg" width={200} />
            <div>
              <h5> BAKE2000  </h5>
              <p className="wd-dashboard-course-title">
                Cake Baking  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/images.jpg" width={200} />
            <div>
              <h5> CY3000  </h5>
              <p className="wd-dashboard-course-title">
                Cybersecurity Specialist  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/download.jpg" width={200} />
            <div>
              <h5> ART1003  </h5>
              <p className="wd-dashboard-course-title">
                Art Branding  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/download.png" width={200} />
            <div>
              <h5> MATH3000  </h5>
              <p className="wd-dashboard-course-title">
                Linear Algebra </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/download-1.jpg" width={200} />
            <div>
              <h5> ARCH2025  </h5>
              <p className="wd-dashboard-course-title">
                Skyscraper Architecture  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
       
      </div>
    </div>
);}
