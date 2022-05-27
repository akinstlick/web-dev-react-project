import * as ReactDOM from 'react-dom/client';

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
    var usertype = localStorage.getItem('account_type')
    if(usertype == 'admin'){
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
    };
}

export function populateAdminCourses(){

}

export function UserList(){
    const api = "http://localhost:5000/getAllUsers";
    sendPostRequest(api,'').then(function(v){
        v = JSON.parse(JSON.parse(v));
        var userlist = [];
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
    });
}

export function courseDropdown(){
    const api = "http://localhost:5000/getAllCourses";
    sendPostRequest(api,'').then(function(v){
        v = JSON.parse(JSON.parse(v));
        console.log('got all courses')
        console.log(v);
        var options = [];
        for(var i = 0; i < v.length; i++){
            var coursename = v[i]['course_name'];
            options.push(<option key={i} value={coursename}>{coursename}</option>)
        }
        var divs = document.querySelectorAll('.coursedropdown');
        divs.forEach(div => {
            var root = ReactDOM.createRoot(div);
            root.render(
                <form className='courseform' onSubmit={function(){addUserToCourse(div.parentElement)}}>
                    Add to course <br/>
                    <select className='courses'>
                        <option>        </option>
                        {options}
                    </select>
                    <input className='submitbtn' type={'submit'}></input>
                </form>
            )
        });
    });
}

function addUserToCourse(div){
    var user_id = div.getAttribute('id');
    var course_name = div.querySelector('#courses').value;
    const api = "http://localhost:5000/addUserToClass";
    var data = JSON.stringify(
        {
            user_id: user_id,
            course_name: course_name
        }
    );
    sendPostRequest(api,data);
}

function approveUser(userid){
    const api = "http://localhost:5000/approveUser";
    var data = JSON.stringify(
        {
            user_id: userid
        }
    );
    sendPostRequest(api,data);
}

function rejectUser(userid){
    const api = "http://localhost:5000/deactivateUser";
    var data = JSON.stringify(
        {
            user_id: userid
        }
    );
    sendPostRequest(api,data);
}


export function createCourse(){
    //call addcourse and then addusertoclass
    //addcourse: name, description, capacity
    //addusertoclass: userid, course name
    var coursename = document.querySelector("#course_name").value
    var coursedescription = document.querySelector("#desc").value
    var capacity = document.querySelector("#capacity").value
    var teacher = document.querySelector("#teacher").value
    const addcourseapi = "http://localhost:5000/addCourse";
    var addcoursedata = JSON.stringify(
        {
            course_name: coursename,
            description: coursedescription,
            capacity: capacity
        }
    );
    const adduserapi = "http://localhost:5000/addUserToClass";
    var adduserdata = JSON.stringify(
        {
            user_id: teacher,
            course_name: coursename
        }
    );
    sendPostRequest(addcourseapi,addcoursedata);
    sendPostRequest(adduserapi,adduserdata);
}