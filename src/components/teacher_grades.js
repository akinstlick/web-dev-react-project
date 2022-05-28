import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAllStudentGrades } from "../course_functions";
import Sidebar from "./sidebar";

function TeacherGrades(){
    let query = new URLSearchParams(useLocation().search);
    let id = query.get("id");
    let course_name = query.get("name");
    localStorage.setItem('course_id', id);
    localStorage.setItem('course_name', course_name);

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