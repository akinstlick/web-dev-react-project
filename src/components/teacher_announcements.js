import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAnnouncements, createAnnouncement } from "../course_functions";
import Sidebar from "./sidebar";

function TeacherAnnouncements(){
    let query = new URLSearchParams(useLocation().search);
    let id = query.get("id");
    let course_name = query.get("name");
    localStorage.setItem('course_id', id);
    localStorage.setItem('course_name', course_name);

    useEffect(() => {
        getAnnouncements();
    });
    return (
        <div id="teacherannouncements">
            <Sidebar />
            <h2> Announcements </h2>
            <div id = "announcements" style={{display:"flex",justifyContent:"center"}}></div>
            <button onClick={function(){document.querySelector("#create_announcement").style.display = 'block'}}>New Announcement</button>
            <form id = "create_announcement" style={{display:'none'}}>
                Description:
                <br />
                <textarea id = "announcement_text" rows = "4" cols = "60" placeholder = "Enter announcement description here"></textarea>
                <br />
                <input type = "submit" value = "Post!" onClick = {function(){createAnnouncement()}}></input>
            </form>
        </div>
    )
}

export default TeacherAnnouncements