import { getassignments } from "../assignments_functions"

function StudentAssignments(){
    return (
        <div onLoad={getassignments()}>
            <h2> Assignments </h2>
            <div id = "assignment_list">
                <ul>
                    <li> Assignment 1 </li>
                    <li> Assignment 2 </li>
                    <li>Assignment 3 </li> 
                </ul>
            </div>
            <form id = "submit_assignment">
                <h3> Assignment 2 </h3> 
                Question 1:
                <input type={'text'} placeholder={'answer the question'}></input>
                <br />
                Question 2:
                <input type={'text'} placeholder={'answer the question'}></input>
                <br />
                <input type = "submit" value = "Submit Answers"></input>
            </form>
        </div>
    )
}

export default StudentAssignments