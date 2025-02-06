import { FaPlus } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
export default function AssignmentControls() {
    return (
        <div id="wd-assignment-modules-controls" className="text-nowrap">
            <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment-btn">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Assignment
            </Button>
            <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-group-btn">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Group
            </Button>
            <div className="me-2 float-start" id="wd-search-bar">
                    <FaSearch className="position-relative me-4" style={{ left: "15px"}} />
                <input 
                type="text"
                placeholder="Search..."
                className="search-input"/>
                </div>
            </div>
    );
}