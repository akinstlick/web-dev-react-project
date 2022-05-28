import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getGradesByStudent } from "../course_functions";
import Sidebar from "./sidebar";

function StudentGrades(){
    let query = new URLSearchParams(useLocation().search);
    let id = query.get("id");
    let course_name = query.get("name");
    localStorage.setItem('course_id', id);
    localStorage.setItem('course_name', course_name);
    
    useEffect(() => {
        getGradesByStudent();
    });
    return (
        <div id="studentgrades">
            <Sidebar />
            <h2> Grades </h2>
            <div id = "grades" style={{display:"flex",justifyContent:"center"}}></div>
        </div>
    )
}

export default StudentGrades