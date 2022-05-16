function StudentAssignments(){
    return (
        <div>
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
                <textarea> Input answer here </textarea>
                <br />
                Question 2:
                <textarea> Input answer here </textarea>
                <br />
                <input type = "submit" value = "Submit Answers"></input>
            </form>
        </div>
    )
}

export default StudentAssignments