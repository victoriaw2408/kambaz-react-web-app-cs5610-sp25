import { Form, FormControl, FormSelect } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addAssignment }
     from "./reducer";
     import { v4 as uuidv4 } from "uuid";
import SaveButton from "./SaveButton";
// {addAssignment}: {addAssignment:()=>void;}


export default function NewAssignmentEditor(
) {

     const { cid } = useParams();
     const dispatch = useDispatch();
     // const assignments = db.assignments;
     const [assignmentTitle, setAssignmentTitle] = useState("");
     const [assignmentDes, setAssignmentDes] = useState("");
     const [assignmentPoints, setAssignmentPoints] = useState("");
     const [dueDate, setDueDate] = useState("");
     const [from, setFrom] = useState("");
     const [until, setUntil] = useState("");
     const { assignments } = useSelector((state: any) => state.assignmentReducer);
     
        console.log("addAssignment:", addAssignment);

        const handleAddAssignment = () => {
          const newAssignment = {
            _id: uuidv4(), 
            title: assignmentTitle,
            course: cid,
            description: assignmentDes, 
            points: assignmentPoints, 
            dueDate: dueDate, 
            getAvailableFrom: from, 
            getAvailableUntil: until, 
          };
          //  if (assignments) {
               //      dispatch(updateAssignment(newAssignment));
               //    } else {
                    dispatch(addAssignment(newAssignment)); 
               //    }
          // dispatch(addAssignment(newAssignment));
        };

     return (
          <div>
               <div id="wd-assignments-editor" className="bring-over">
                    <h3>
                         <label htmlFor="wd-name">Assignment Name</label></h3>
                    <FormControl type="text" onChange={(e) => setAssignmentTitle(e.target.value)} value={assignmentTitle} placeholder={assignments?.title} /> <br />
                    <FormControl as="textarea" rows={14} placeholder={assignmentDes}  onChange={(e) => setAssignmentDes(e.target.value)}/>
                    <table>
                         <br />
                         <br /><tr><td valign="top" align="right" >
                              <label htmlFor="wd-points">Points</label></td>
                              <td><FormControl type="text" className="center-box" value={assignmentPoints} onChange={(e) => setAssignmentPoints(e.target.value)}/>
                              </td>
                         </tr><br /><tr>
                              <td align="right" valign="top"><label htmlFor="wd-group">Assignment Group</label>
                              </td>
                              

                              <td><FormSelect className="center-box" >
                                   <option selected>ASSIGNMENTS</option>
                                   <option value="1">One</option>
                                   <option value="2">Two</option>
                                   <option value="3">Three</option>
                              </FormSelect>
                              </td>
                         </tr>
                         <br />
                         <tr>
                              <td align="right" valign="top">
                                   <label htmlFor="wd-display-grade-as">Display Grade as</label>
                              </td>
                              <td><FormSelect className="center-box" >
                                   <option selected>Percentage</option>
                                   <option value="1">Letter</option>
                                   <option value="2">Number</option>
                              </FormSelect>
                              </td>
                         </tr>
                         <br />


                         <tr>
                              <td align="right" valign="top" >
                                   <label htmlFor="wd-submission-type" >Submission Type</label>
                              </td>
                              <div className="card move-card h-100">
                                   <div className="center-container"> <FormSelect className="small-dropdown">
                                        <option selected>Online</option>
                                        <option value="1">Paper</option>
                                        <option value="2">InPerson</option>
                                   </FormSelect></div>

                                   <br />
                                   <div className="center-box-next">
                                        <td align="left" valign="top">
                                             <label htmlFor="wd-text-entry">Online Entry Options</label><br /><br />

                                             <Form>
                                                  <Form.Check
                                                       type="checkbox"
                                                       label="Text Entry"
                                                       id="wd-text-entry"
                                                  /><br />
                                                  <Form.Check
                                                       type="checkbox"
                                                       label="Website URL"
                                                       id="wd-website-url"
                                                  /><br />
                                                  <Form.Check
                                                       type="checkbox"
                                                       label="Media Recordings"
                                                       id="wd-media-recordings"
                                                  /><br />
                                                  <Form.Check
                                                       type="checkbox"
                                                       label="Student Annotation"
                                                       id="wd-student-annotation"
                                                  /><br />
                                                  <Form.Check
                                                       type="checkbox"
                                                       label="File Uploads"
                                                       id="wd-file-upload"
                                                  /><br />
                                             </Form>
                                        </td>
                                   </div>


                              </div>

                         </tr>


                         <br />


                         <tr>
                              <td align="right" valign="top">
                                   <label htmlFor="wd-assign-to">Assign</label>
                              </td>
                         </tr>
                         <div className="card move-card-2 h-100"> <br />
                              <td className="center-box-next">
                                   <label htmlFor="wd-assign-to">Assign To</label><br />
                                   <td className="small-dropdown-2"><FormControl className="small-dropdown-2" type="text" value="Everyone" />
                                   </td>

                              </td>
                              <tr>
                                   {/* <td className="center-box-next"></td> */}
                                   <td className="center-box-next"><br />
                                        <label htmlFor="wd-due-date">Due</label><br />
                                        <div className="small-dropdown-2"><FormControl value={dueDate} className="small-dropdown-2" type="date" onChange={(e) => setDueDate(e.target.value)} id="wd-due-date" /></div>
                                        <br />
                                   </td>

                              </tr>
                              <tr>

                                   <td className="center-box-next">
                                        <label htmlFor="wd-available-from">Available from</label> <br />
                                        <div className="half-size"> <FormControl type="date" value={from} onChange={(e) => setFrom(e.target.value)} id="wd-available-from" /><br /> </div>


                                   </td >
                                   <td className="center-box-next">
                                        <label htmlFor="wd-available-until">Until</label> <br />
                                        <div className="half-size"> <FormControl type="date" value={until} onChange={(e) => setUntil(e.target.value)} id="wd-available-until" /><br /></div>

                                   </td>
                              </tr>

                         </div>


                    </table>

                    <hr />
                    <table width="100%" ><tr>
                         <td align="right" style={{ display: "flex-right", gap: "5px", justifyContent: "flex-end" }}>
                              <Link className="btn btn-lg btn-secondary" id="wd-add-module-btn" to={`/Kambaz/Courses/${cid}/Assignments`}>

                                   Cancel
                              </Link> &nbsp;
                             
                              <SaveButton addAssignment={handleAddAssignment} />
                         </td>
                    </tr></table>

               </div>

          </div>
     );
}

