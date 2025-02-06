import { Button, Card, Col, Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <FormGroup className="mb-3" controlId="wd-name">
        <FormLabel>Assignment Name</FormLabel>
        <FormControl type="text" value="A1 - ENV + HTML" />
      </FormGroup>
      <div className="form-control" id="wd-description">
        <p>The assignment is <text className="text-danger">available online</text></p>
        <p>Submit a link to the landing page of your Web application running on Netlify.</p>
        <p>The landing page should include the following:</p>
        <ul>
          <li>Your full name and section</li>
          <li>Links to each of the lab assignments</li>
          <li>Link to the Kanbas application</li>
          <li>Links to all relevant source code repositories</li>
        </ul>
        <p>The Kanbas application should include a link to navigate back to the landing page.</p>
      </div>

      <br />
      <Form.Group as={Row} className="mb-3" controlId="wd-points" align="right" valign="top" >
        <Form.Label column sm={2}>
          Points
        </Form.Label>
        <Col sm={10}>
          <Form.Control value={100} />
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
                    <FormControl type="date" /> <br />
                    <Row>
                      <Col sm={6}>
                        <FormLabel><strong>Available From</strong></FormLabel>
                        <FormControl type="date" />
                      </Col>
                      <Col sm={6}>
                        <FormLabel><strong>Until</strong></FormLabel>
                        <FormControl type="date" />
                      </Col>
                    </Row>
                  </Col>

                </FormGroup>

              </Card.Body>
            </Card>
          </Col>
        </Form.Group>
      </FormGroup>



      <hr></hr>
      <Button variant="danger" size="lg" className="me-1 float-end" id="wd-collapse-all">
        Save
      </Button>
      <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-view-progress">
        Cancel
      </Button>


    </div>
  );
}

