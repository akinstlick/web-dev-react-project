// Helper function to send a post request to the backend
async function sendPostRequest(url, data) {
    return new Promise(function(resolve,reject) {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", url, true);
        xhttp.onreadystatechange = function() {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                //console.log(xhttp.responseText);
                resolve(xhttp.responseText);
            }
        };
        xhttp.send(data);
    });
}
// *****************************************************************
// Courses Homepage
// *****************************************************************
function getStudentCourses(user_id) {
    const api = "http://localhost:5000/getStudentCourses";
    const data = JSON.stringify(
        { user_id : user_id
        });

    sendPostRequest(api,data).then(function(v){
        v = JSON.parse(JSON.parse(v));
        alert(v);
    })
}



// Announcements
function getAnnouncements(course_id) {
    const api = "http://localhost:5000/getAnnouncementsByCourse";
    const data = JSON.stringify(
        { course_id: course_id
        });
    
    sendPostRequest(api,data).then(function(v){
        v = JSON.parse(JSON.parse(v));
        alert(v);
        /*var userlist = [];
        for(var i = 0; i < v.length; i++){
            var user = v[i];
            var childdiv
            if(user['active'] == '0'){
                childdiv =  <div id={user['user_id']} key={user['user_id']}>
                                    <span>name: {user['user_name']}</span>
                                    <span> email: {user['email']}</span>
                                    <span> id: {user['university_id']}</span>
                                    <span> active: {user['active']}  </span>
                                    <button onClick={function() {approveUser(user['user_id'])}}>approve</button>
                                    <button onClick={function() {rejectUser(user['user_id'])}}>reject</button>
                                    <div className='coursedropdown'></div>
                                </div>
            } else {
                childdiv =  <div id={user['user_id']} key={user['user_id']}>
                                    <span>name: {user['user_name']}</span>
                                    <span> email: {user['email']}</span>
                                    <span> id: {user['university_id']}</span>
                                    <span> active: {user['active']}  </span>
                                    <button onClick={function() {rejectUser(user['user_id'])}}>deactivate</button>
                                    <div className='coursedropdown'></div>
                                </div>
            }
            userlist.push(childdiv)
        }
        const userroot = ReactDOM.createRoot(document.querySelector("#userlist"));
        const element = <div>{userlist}</div>;
        courseDropdown();
        userroot.render(element);
    });    */

    });
}
