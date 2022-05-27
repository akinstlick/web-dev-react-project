import { useEffect } from "react";
import { getAnnouncements } from "../course_functions";
import Sidebar from "./sidebar";


function StudentAnnouncements(){
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