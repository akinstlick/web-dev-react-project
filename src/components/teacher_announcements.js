import { useEffect } from "react";
import { getAnnouncements, createAnnouncement } from "../course_functions";
import Sidebar from "./sidebar";

function TeacherAnnouncements(){
    useEffect(() => {
        getAnnouncements();
    });
    return (
        <div>
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