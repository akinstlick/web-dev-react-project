import { getassignments } from "../assignments_functions"
import { useLocation } from "react-router-dom";
import Sidebar from "./sidebar";

function StudentAssignments(){
    let query = new URLSearchParams(useLocation().search);
    let id = query.get("id");
    let course_name = query.get("name");
    localStorage.setItem('course_id', id);
    localStorage.setItem('course_name', course_name);

    return (
        <div id="assignments" onLoad={getassignments()}>
            <Sidebar />
            <h2> Assignments </h2>
            <div id = "assignment_list">
            </div>

        </div>
    )
}

export default StudentAssignments