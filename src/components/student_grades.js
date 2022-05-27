import { useEffect } from "react";
import { getGradesByStudent } from "../course_functions";
import Sidebar from "./sidebar";

function StudentGrades(){
    useEffect(() => {
        getGradesByStudent();
    });
    return (
        <div>
            <Sidebar />
            <h2> Grades </h2>
            <div id = "grades" style={{display:"flex",justifyContent:"center"}}></div>
        </div>
    )
}

export default StudentGrades