import { Link } from "react-router-dom";
import {Form } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <Form.Control id="wd-username"
  placeholder="username"
  className="mb-2" />
  <Form.Control id="wd-password"
  placeholder="123"
  className="mb-2"/>

<Form.Control id="wd-firstname"
  placeholder="Alice"
  className="mb-2"/>
 <Form.Control id="wd-lastname"
  placeholder="Wonderland"
  className="mb-2"/>
   <Form.Control id="wd-lastname"
  placeholder="Wonderland"
  className="mb-2"/>
   <Form.Control id="wd-dob"
  placeholder="2000-01-01"
  className="mb-2"/>
   <Form.Control id="wd-role"
  placeholder="alice@wonderland"
  className="mb-2"/> 
  <Form.Select>id="wd-role"
   <option selected>Faculty</option>
  className="mb-2"</Form.Select> <br/>
  <Link id="wd-signout-btn"
            to="/Kambaz/Account/Profile"
            className="btn btn-danger w-100 mb-2">
            Sign out </Link>
   
    </div>
);}


