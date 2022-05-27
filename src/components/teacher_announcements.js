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
            <form id = "create_announcement">
                Description:
                <br />
                <textarea id = "announcement_text" rows = "4" cols = "60" value = "Enter announcement description here"></textarea>
                <br />
                <input type = "submit" defaultValue = "Create announcement" onClick = {function(){createAnnouncement()}}></input>
            </form>
        </div>
    )
}

export default TeacherAnnouncements