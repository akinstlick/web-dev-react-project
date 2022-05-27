import { useEffect } from "react";
import { getAnnouncements } from "../course_functions";


function StudentAnnouncements(){
    useEffect(() => {
        getAnnouncements();
    });
    return (
        <div>
            <h2> Announcements </h2>
            <div id = "announcements" style={{display:"flex",justifyContent:"center"}}>
            </div>
        </div>
    )
}

export default StudentAnnouncements