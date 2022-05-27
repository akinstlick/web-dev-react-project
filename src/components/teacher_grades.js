import { useEffect } from "react";
import { getAllStudentGrades } from "../course_functions";
import Sidebar from "./sidebar";

function TeacherGrades(){
    useEffect(() => {
        getAllStudentGrades();
    });
    return (
        <div id="teachergrades">
            <Sidebar />
            <h2> Teacher Grades </h2>
            <div id = "allgrades" style={{display:"flex",justifyContent:"center"}}></div>
        </div>
    )
}

export default TeacherGrades