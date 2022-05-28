import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAnnouncements } from "../course_functions";
import Sidebar from "./sidebar";


function StudentAnnouncements(){
    let query = new URLSearchParams(useLocation().search);
    let id = query.get("id");
    let course_name = query.get("name");
    localStorage.setItem('course_id', id);
    localStorage.setItem('course_name', course_name);

    useEffect(() => {
        getAnnouncements();
    });
    return (
        <div id="studentannouncements">
            <Sidebar />
            <h2> Announcements </h2>
            <div id = "announcements" style={{display:"flex",justifyContent:"center"}}>
            </div>
        </div>
    )
}

export default StudentAnnouncements