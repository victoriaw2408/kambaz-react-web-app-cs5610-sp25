import { Button, Card, Col, Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { addAssignment } from "./reducer";
import { useEffect, useState } from "react";
import SaveButton from "./SaveButton";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  // const assignments = db.assignments;
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const [assignmentName, setAssignmentName] = useState("");
  const [points, setPoints] = useState("");
  const [until, setUntil] = useState("");
  const [from, setFrom] = useState("");
  const [due, setDue] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  // const handleAddAssignment = () => {
  //   const newAssignment = {
  //     _id: aid || uuidv4(),
  //     title: assignmentName,
  //     course: cid,
  //     description: description, // Fix here
  //     points: points,
  //     dueDate: due,
  //     getAvailableFrom: from,
  //     getAvailableUntil: until,
  //     assignment: aid,
  //   };
  //   dispatch(updateAssignment(newAssignment));

  // };


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

  const createAssignmentForCourse = async () => {
    if (!cid) return;
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
    dispatch(addAssignment(assignment));
  };

  return (
    <div>
      <ul id="wd-assignments-editor" className="list-group rounded-0">
        <div>
          <FormGroup className="mb-3" controlId="wd-name">
            <FormLabel>Assignment Name</FormLabel>
            <FormControl type="text" value={assignmentName} onChange={(e) => setAssignmentName(e.target.value)}  placeholder={assignments?.title} />

            <FormControl as="textarea" rows={6} placeholder={description} onChange={(e) => setDescription(e.target.value)} />
          </FormGroup>

          <br />
          <Form.Group as={Row} className="mb-3" controlId="wd-points" align="right" valign="top" >
            <Form.Label column sm={2}>
              Points
            </Form.Label>
            <Col sm={10}>
              <FormControl type="text" value={points} onChange={(e) => setPoints(e.target.value)}  />
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
                        <FormControl value={due} type="date" onChange={(e) => setDue(e.target.value)} />
                        <br />
                        <Row>
                          <Col sm={6}>
                            <FormLabel><strong>Available From</strong></FormLabel>
                            <FormControl type="date"  value={from} onChange={(e) => setFrom(e.target.value)} placeholder={assignments?.getAvailableFrom} />

                          </Col>
                          <FormGroup>

                            <Col sm={6}>
                              <FormLabel><strong>Until</strong></FormLabel>
                              <FormControl type="date" value={until} onChange={(e) => setUntil(e.target.value)}  />

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
          <SaveButton addAssignment={createAssignmentForCourse} />

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
