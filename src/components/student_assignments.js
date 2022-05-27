import { getassignments } from "../assignments_functions"
import Sidebar from "./sidebar";

function StudentAssignments(){
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