import { Button, Card, Col, Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { updateAssignment } from "./reducer";
import { useEffect, useState } from "react";
import SaveButton from "./SaveButton";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  // const assignments = db.assignments;
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  
  
  const  [assignmentName, setAssignmentName] = useState("");
  const  [points, setPoints] = useState("");
  const  [until, setUntil] = useState("");
  const  [from, setFrom] = useState("");
  const  [due, setDue] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const handleAddAssignment = () => {
    const newAssignment = {
      _id: aid || uuidv4(), 
      title: assignmentName,
      course: cid,
      description: description, // Fix here
      points: points, 
      dueDate: due, 
      getAvailableFrom: from, 
      getAvailableUntil: until, 
      assignment: aid,
   };   
    dispatch(updateAssignment(newAssignment));
   
  };

  
  // Find the assignment based on the ID from the URL
const selectedAssignment = assignments.find((a: any) => a._id === aid);

  // Populate state when assignment is selected
  useEffect(() => {
      if (selectedAssignment) {
          setAssignmentName(selectedAssignment.title || "");
          setDescription(selectedAssignment.description || "");
          setPoints(selectedAssignment.points || "");
          setDue(selectedAssignment.dueDate || "");
          setFrom(selectedAssignment.getAvailableFrom || "");
          setUntil(selectedAssignment.getAvailableUntil || "");
      }
  }, [assignments, aid]);
  

  return (
    <div>
      <ul id="wd-assignments-editor" className="list-group rounded-0">
            <div>
              <FormGroup className="mb-3" controlId="wd-name">
                <FormLabel>Assignment Name</FormLabel>
                <FormControl type="text" onChange={(e) => setAssignmentName(e.target.value)}  value={assignmentName} placeholder={assignments?.title} />

                 <FormControl as="textarea" rows={6} placeholder={description} onChange={(e) =>  setDescription(e.target.value)}   />
              </FormGroup>
             
              <br />
              <Form.Group as={Row} className="mb-3" controlId="wd-points" align="right" valign="top" >
                <Form.Label column sm={2}>
                  Points
                </Form.Label>
                <Col sm={10}>
                 <FormControl type="text" onChange={(e) =>  setPoints(e.target.value)} value={points} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="wd-group" align="right" valign="top" >
                <Form.Label column sm={2}>
                  Assignment Group
                </Form.Label>
                <Col sm={10}>
                  <FormSelect>
                    <option selected>ASSIGNMENTS</option>
                    <option value="homework">HOMEWORK</option>
                    <option value="essay">ESSAY</option>
                    <option value="exam">EXAM</option>
                  </FormSelect>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="wd-display-grade-as" align="right" valign="top" >
                <Form.Label column sm={2}>
                  Display Grade as
                </Form.Label>
                <Col sm={10}>
                  <FormSelect>
                    <option selected>Percentage</option>
                  </FormSelect>
                </Col>
              </Form.Group>
              <FormGroup className="mb-3" controlId="wd-submission-type">
                <Form.Group as={Row} className="mb-3" align="right" valign="top" >
                  <Form.Label column sm={2}>
                    Submission Type
                  </Form.Label>
                  <Col sm={10}>
                    <Card className="mb-4">
                      <Card.Body>
                        <FormSelect>
                          <option selected>Online</option>
                          <option value="on-paper">On Paper</option>
                          <option value="extool">External Tool</option>
                        </FormSelect>
                        <br />
                        <FormGroup as={Row} className="wd-text-entry" align="left" >
                          <Col sm={10}>

                            <FormLabel> <strong>Online Entry Options</strong></FormLabel>
                            <FormCheck type="checkbox" label="Text Entry" />
                            <FormCheck type="checkbox" label="Website URL" />
                            <FormCheck type="checkbox" label="Media Recordings" />
                            <FormCheck type="checkbox" label="Student Annotation" />
                            <FormCheck type="checkbox" label="File Uploads" />
                          </Col>
                        </FormGroup>

                      </Card.Body>
                    </Card>
                  </Col>
                </Form.Group>
              </FormGroup>

              <FormGroup className="mb-3" controlId="wd-submission-type">
                <Form.Group as={Row} className="mb-3" align="right" valign="top" >
                  <Form.Label column sm={2}>
                    Assign
                  </Form.Label>
                  <Col sm={10}>
                    <Card className="mb-4">
                      <Card.Body>
                        <FormGroup as={Row} className="wd-submission-type" align="left" >
                          <Col sm={15}>

                            <FormLabel><strong>Assign To</strong></FormLabel>
                            <FormControl type="text" value="Everyone" /> <br />
                            <FormLabel><strong>Due</strong></FormLabel>
                            {/* <FormControl type="text" /> */}
                            <FormControl  value={due}  type="date" onChange={(e) =>  setDue(e.target.value)} />
                            <br />
                            <Row>
                              <Col sm={6}>
                                <FormLabel><strong>Available From</strong></FormLabel>
                                <FormControl type="date" onChange={(e) =>  setFrom(e.target.value)} value={from} placeholder={assignments?.getAvailableFrom}/>

                              </Col>
                              <FormGroup>

                              <Col sm={6}>
                                <FormLabel><strong>Until</strong></FormLabel>
                                <FormControl type="date" onChange={(e) =>  setUntil(e.target.value)} value={until} />

                              </Col>
                              </FormGroup>

                            </Row>
                          </Col>

                        </FormGroup>

                      </Card.Body>
                    </Card>
                  </Col>
                </Form.Group>
              </FormGroup>



              <hr></hr>
              {/* <a
                href={`#/Kambaz/Courses/${cid}/Assignments/`}
                style={{ textDecorationLine: "none", color: "black" }}
                className="wd-assignment-link text-black link-underline link-underline-opacity-0"> */}
                 <SaveButton addAssignment={handleAddAssignment} /> 


               {/* </a> */}
               {/* <a 
      href={`#/Kambaz/Courses/${cid}/Assignments/`} 
      style={{ textDecorationLine: "none", color: "black" }}
      className="wd-assignment-link text-black link-underline link-underline-opacity-0">
    <Button variant="danger" size="lg" className="me-1 float-end" id="wd-collapse-all">
      Save
    </Button></a> */}
               <a 
      href={`#/Kambaz/Courses/${cid}/Assignments/`} 
      style={{ textDecorationLine: "none", color: "black" }}
      className="wd-assignment-link text-black link-underline link-underline-opacity-0">
    <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-view-progress">
      Cancel
    </Button></a>


            </div>
      </ul>
    </div>
  );
}
// import { Button, Form, FormControl, FormSelect } from "react-bootstrap";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import * as db from "../../Databases";
// import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
// import { updateAssignment, addAssignment }
//      from "./reducer";
//      import { v4 as uuidv4 } from "uuid";
// import SaveButton from "./SaveButton";
// // {addAssignment}: {addAssignment:()=>void;}


// export default function AddAssignmentEditor(
// ) {

//      const { cid, aid } = useParams();
//      const dispatch = useDispatch();
//      // const assignments = db.assignments;
//      const [assignmentTitle, setAssignmentTitle] = useState("");
//      const [assignmentDes, setAssignmentDes] = useState("");
//      const [assignmentPoints, setAssignmentPoints] = useState("");
//      const [dueDate, setDueDate] = useState("");
//      const [from, setFrom] = useState("");
//      const [until, setUntil] = useState("");
//      const { assignments } = useSelector((state: any) => state.assignmentReducer);
//      const navigate = useNavigate();
     
//         console.log("addAssignment:", addAssignment);

//         const handleAddAssignment = () => {
//           const newAssignment = {
//             _id: uuidv4(), 
//             title: assignmentTitle,
//             course: cid,
//             description: assignmentDes, 
//             points: assignmentPoints, 
//             dueDate: dueDate, 
//             getAvailableFrom: from, 
//             getAvailableUntil: until, 
//           };
//           //  if (assignments) {
//                //      dispatch(updateAssignment(newAssignment));
//                //    } else {
//                     dispatch(addAssignment(newAssignment)); 
//                //    }
//           // dispatch(addAssignment(newAssignment));
//         };

//      return (
//           <div>
//                <div id="wd-assignments-editor" className="bring-over">
//                     <h3>
//                          <label htmlFor="wd-name">Assignment Name</label></h3>
//                     <FormControl type="text" onChange={(e) => setAssignmentTitle(e.target.value)} value={assignmentTitle} placeholder={assignments?.title} /> <br />
//                     <FormControl as="textarea" rows={14} placeholder={assignmentDes}  onChange={(e) => setAssignmentDes(e.target.value)}/>
//                     <table>
//                          <br />
//                          <br /><tr><td valign="top" align="right" >
//                               <label htmlFor="wd-points">Points</label></td>
//                               <td><FormControl type="text" className="center-box" value={assignmentPoints} onChange={(e) => setAssignmentPoints(e.target.value)}/>
//                               </td>
//                          </tr><br /><tr>
//                               <td align="right" valign="top"><label htmlFor="wd-group">Assignment Group</label>
//                               </td>
                              

//                               <td><FormSelect className="center-box" >
//                                    <option selected>ASSIGNMENTS</option>
//                                    <option value="1">One</option>
//                                    <option value="2">Two</option>
//                                    <option value="3">Three</option>
//                               </FormSelect>
//                               </td>
//                          </tr>
//                          <br />
//                          <tr>
//                               <td align="right" valign="top">
//                                    <label htmlFor="wd-display-grade-as">Display Grade as</label>
//                               </td>
//                               <td><FormSelect className="center-box" >
//                                    <option selected>Percentage</option>
//                                    <option value="1">Letter</option>
//                                    <option value="2">Number</option>
//                               </FormSelect>
//                               </td>
//                          </tr>
//                          <br />


//                          <tr>
//                               <td align="right" valign="top" >
//                                    <label htmlFor="wd-submission-type" >Submission Type</label>
//                               </td>
//                               <div className="card move-card h-100">
//                                    <div className="center-container"> <FormSelect className="small-dropdown">
//                                         <option selected>Online</option>
//                                         <option value="1">Paper</option>
//                                         <option value="2">InPerson</option>
//                                    </FormSelect></div>

//                                    <br />
//                                    <div className="center-box-next">
//                                         <td align="left" valign="top">
//                                              <label htmlFor="wd-text-entry">Online Entry Options</label><br /><br />

//                                              <Form>
//                                                   <Form.Check
//                                                        type="checkbox"
//                                                        label="Text Entry"
//                                                        id="wd-text-entry"
//                                                   /><br />
//                                                   <Form.Check
//                                                        type="checkbox"
//                                                        label="Website URL"
//                                                        id="wd-website-url"
//                                                   /><br />
//                                                   <Form.Check
//                                                        type="checkbox"
//                                                        label="Media Recordings"
//                                                        id="wd-media-recordings"
//                                                   /><br />
//                                                   <Form.Check
//                                                        type="checkbox"
//                                                        label="Student Annotation"
//                                                        id="wd-student-annotation"
//                                                   /><br />
//                                                   <Form.Check
//                                                        type="checkbox"
//                                                        label="File Uploads"
//                                                        id="wd-file-upload"
//                                                   /><br />
//                                              </Form>
//                                         </td>
//                                    </div>


//                               </div>

//                          </tr>


//                          <br />


//                          <tr>
//                               <td align="right" valign="top">
//                                    <label htmlFor="wd-assign-to">Assign</label>
//                               </td>
//                          </tr>
//                          <div className="card move-card-2 h-100"> <br />
//                               <td className="center-box-next">
//                                    <label htmlFor="wd-assign-to">Assign To</label><br />
//                                    <td className="small-dropdown-2"><FormControl className="small-dropdown-2" type="text" value="Everyone" />
//                                    </td>

//                               </td>
//                               <tr>
//                                    {/* <td className="center-box-next"></td> */}
//                                    <td className="center-box-next"><br />
//                                         <label htmlFor="wd-due-date">Due</label><br />
//                                         <div className="small-dropdown-2"><FormControl value={dueDate} className="small-dropdown-2" type="date" onChange={(e) => setDueDate(e.target.value)} id="wd-due-date" /></div>
//                                         <br />
//                                    </td>

//                               </tr>
//                               <tr>

//                                    <td className="center-box-next">
//                                         <label htmlFor="wd-available-from">Available from</label> <br />
//                                         <div className="half-size"> <FormControl type="date" value={from} onChange={(e) => setFrom(e.target.value)} id="wd-available-from" /><br /> </div>


//                                    </td >
//                                    <td className="center-box-next">
//                                         <label htmlFor="wd-available-until">Until</label> <br />
//                                         <div className="half-size"> <FormControl type="date" value={until} onChange={(e) => setUntil(e.target.value)} id="wd-available-until" /><br /></div>

//                                    </td>
//                               </tr>

//                          </div>


//                     </table>

//                     <hr />
//                     <table width="100%" ><tr>
//                          <td align="right" style={{ display: "flex-right", gap: "5px", justifyContent: "flex-end" }}>
//                               <Link className="btn btn-lg btn-secondary" id="wd-add-module-btn" to={`/Kambaz/Courses/${cid}/Assignments`}>

//                                    Cancel
//                               </Link> &nbsp;
                             
//                               <SaveButton addAssignment={handleAddAssignment} />
//                          </td>
//                     </tr></table>

//                </div>

//           </div>
//      );
// }
