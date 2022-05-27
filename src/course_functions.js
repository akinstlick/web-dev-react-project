// Announcements
function getAnnouncements(course_id) {
    const url = "http://localhost:5000/getAnnouncementsByCourse";
    const data = JSON.stringify(
        { course_id: course_id
        });
    
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            let response = JSON.parse(xhttp.responseText);
            print(response);
        };
    };
    xhttp.open("POST", url, true);
    xhttp.send(data);
}