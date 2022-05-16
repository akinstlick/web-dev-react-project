function TeacherAnnouncements(){
    return (
        <div>
            <h2> Announcements </h2>
            <div id = "view_announcements">
                <ul>
                    <li> 
                        <h3> Homework 1 Released </h3>
                        The first homework has been posted on Canvas.
                    </li>
                    <li>
                        <h3> Homework 2 Released </h3>
                        The second assignment is now available on Gradescope.
                    </li>
                </ul>
            </div>
            <form id = "create_announcement">
                Title: <input type = "text" id = "announcement_title"></input>
                <br />
                Announcement:
                <br />
                <textarea id = "announcement_text" rows = "4" cols = "60"> Enter announcement text here</textarea>
                <br />
                <input type = "submit" value = "Create announcement"></input>
            </form>
        </div>
    )
}

export default TeacherAnnouncements