import Sidebar from "./sidebar";
import { AssignmentList, createAssignment } from "../assignments_functions";

function TeacherAssignments(){
    return (
        <div>
            <h2> Assignments </h2>
            <Sidebar />
            <AssignmentList />
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