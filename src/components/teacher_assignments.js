function TeacherAssignments(){
    return (
        <div>
            <h2> Assignments </h2>
            <div id = "all_assignment_list">
                <ul>
                    <li> Assignment 1 </li>
                    <li> Assignment 2 </li>
                    <li> Assignment 3 </li> 
                </ul>
            </div>
            <form id = "create_assignment">
                Name: <input type = "text" id = "assignment_name"></input>
                <br />
                Number of Points: <input type = "number" id = "assignment_points"></input>
                <br />
                Assignment Description
                <br />
                <textarea id = "assignment_description" rows = "4" cols = "60"> Enter announcement text here</textarea>
                <br />
                <input type = "submit" value = "Create assignment"></input>
            </form>
        </div>
    )
}

export default TeacherAssignments