import Sidebar from "./sidebar";
import { useLocation } from "react-router-dom";
import { AssignmentList, createAssignment } from "../assignments_functions";

function TeacherAssignments(){
    let query = new URLSearchParams(useLocation().search);
    let id = query.get("id");
    let course_name = query.get("name");
    localStorage.setItem('course_id', id);
    localStorage.setItem('course_name', course_name);
    
    return (
        <div id="teacherassignments">
            <h2> Assignments </h2>
            <Sidebar />
            <div id="assignmentlist" onLoad={AssignmentList()}></div>
            <button onClick={function(){document.querySelector('#create_assignment').style.display = 'block'}}>Create Assignment</button>
            <form id = "create_assignment" style={{display:'none'}} onSubmit={function(){createAssignment()}}>
                Name: <input type = "text" id = "assignment_name"></input>
                <br />
                Number of Points: <input type = "number" id = "assignment_points"></input>
                <br />
                Assignment Description
                <br />
                <textarea id = "assignment_description" rows = "4" cols = "60" placeholder={"Enter assignment description here"}></textarea>
                <br />
                Due Date: <input id="duedate" type={'date'} />
                <br/>
                <input type = "submit" value = "Create assignment"></input>
            </form>
        </div>
    )
}

export default TeacherAssignments