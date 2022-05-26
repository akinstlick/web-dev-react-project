import * as ReactDOM from 'react-dom';

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

export function getUserType() {
    var user_id = localStorage.getItem('user_id');
    const api = "http://localhost:5000/userType";
    var data = JSON.stringify(
        {
            user_id: user_id
        }
    );
    sendPostRequest(api,data).then(function(v){
        v = JSON.parse(v);
        var accounttype = v['account_type'];
        localStorage.setItem('account_type',accounttype);
    });
}

export function populateAdminDash(){
    var numstudents = document.querySelector('#numstudents');
    var numcourses = document.querySelector('#numcourses');
    var numteachers = document.querySelector('#numteachers');
    const api = "http://localhost:5000/getAdminSummary";
    sendPostRequest(api,'').then(function(v){
        v = JSON.parse(v);
        numstudents.innerHTML = "Number of Students: " + v['num_students'];
        numcourses.innerHTML = "Number of Courses: " + v['num_courses'];
        numteachers.innerHTML = "Number of Teachers: " + v['num_teachers'];
    });   
}

export function UserList(){
    const api = "http://localhost:5000/getAllUsers";
    sendPostRequest(api,'').then(function(v){
        v = JSON.parse(JSON.parse(v));
        var userlist = [];
        for(var i = 0; i < v.length; i++){
            var user = v[i];
            var childdiv = <div key={user['user_id']}>
                <span>name: {user['user_name']}</span>
                <span> email: {user['email']}</span>
                <span> id: {user['university_id']}</span>
                <span> active: {user['active']}</span>
            </div>
            userlist.push(childdiv)
        }
        const userroot = ReactDOM.createRoot(document.querySelector("#userlist"));
        const element = <div>{userlist}</div>;
        userroot.render(element);
    });
}
