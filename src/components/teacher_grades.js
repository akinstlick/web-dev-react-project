import { useEffect } from "react";
import { getAllStudentGrades } from "../course_functions";
import Sidebar from "./sidebar";

function TeacherGrades(){
    useEffect(() => {
        getAllStudentGrades();
    });
    return (
        <div>
            <Sidebar />
            <h2> Student Grades </h2>
            <div id = "allgrades" style={{display:"flex",justifyContent:"center"}}></div>
        </div>
    )
}

export default TeacherGrades