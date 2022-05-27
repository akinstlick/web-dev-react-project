import { getassignments } from "../assignments_functions"
import Sidebar from "./sidebar";

function StudentAssignments(){
    return (
        <div onLoad={getassignments()}>
            <Sidebar />
            <h2> Assignments </h2>
            <div id = "assignment_list">
            </div>
            <form id = "submit_assignment" style={{display:'none'}}>
                <h3 id="assignment_label"></h3>
                <div id="assignment_description"></div>
                <div id="due_date_points"></div>
                <h3>Submission</h3>
                <textarea id="submission" type={'text'} /> <br />
                <input id="submit_button" type={'submit'} />
            </form>
        </div>
    )
}

export default StudentAssignments