export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <h3> <label htmlFor="wd-name">Assignment Name</label> </h3>
      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <br />

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group </label>
          </td>
          <select id="wd-group">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
          </select>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as </label> </td>

          <select id="wd-display-grade-as">
            <option value="PERCENTAGE">Percentage</option>
          </select>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type </label></td>
          <td>
            <select id="wd-submission-type">
              <td align="right" valign="top"></td>
              <option value="ONLINE">Online</option>
            </select>
          </td>
        </tr>
        <br />
        <tr></tr>

        <td align="right" valign="top">
          <label>Online Entry Options</label>
        </td>
        <td>
          <input type="checkbox" name="assignment" id="wd-text-entry" />
          <label htmlFor="wd-text-entry">Text Entry</label><br />

          <input type="checkbox" name="assignment" id="wd-website-url" />
          <label htmlFor="wd-website-url">Website URL</label><br />

          <input type="checkbox" name="assignment" id="wd-media-recordings" />
          <label htmlFor="wd-media-recordings">Media Recordings</label><br />

          <input type="checkbox" name="assignment" id="wd-student-annotation" />
          <label htmlFor="wd-student-annotation">Student Annotation</label><br />

          <input type="checkbox" name="assignment" id="wd-file-upload" />
          <label htmlFor="wd-file-upload">File Uploads</label>
        </td>
        <br />
        
        <tr>
          <td align="right" valign="top">

            <label htmlFor="wd-assign-to">Assign </label></td>
          <label htmlFor="wd-assign-to">Assign to</label><br />
          <input
            value="Everyone"
            id="wd-assign-to" /> </tr><br />

        <tr>
          <td align="right" valign="top"></td>
          <label htmlFor="wd-due-date"> Due </label><br />
          <input type="date"
            value="2024-05-06"
            id="wd-due-date" /> </tr><br />

        <tr>
          <td align="right" valign="top"></td>
          <label htmlFor="wd-available-from"> Available From&nbsp;&nbsp; &nbsp;&nbsp;</label>
          <label htmlFor="wd-available-until"> Until </label><br />
          <input type="date"
            value="2024-05-06"
            id="wd-available-from" />
          &nbsp;
          <input type="date"
            value="2024-05-20"
            id="wd-available-until" />
        </tr>
        <td align="right" valign="top"></td>
      </table>
      <hr></hr>
      <table>
        <td align="right" valign="top">
          <button type="button">
            Cancel
          </button>
          <button type="button">
            Save
          </button>
        </td>
      </table>

    </div>
  );
}

