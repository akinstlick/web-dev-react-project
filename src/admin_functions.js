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

export function AdminCourseList(){
    const api = "http://localhost:5000/getAllCourses";
    sendPostRequest(api,'').then(function(v){
        v = JSON.parse(JSON.parse(v));
        console.log(v);
        var courselist = [];
        for(var i = 0; i < v.length; i++){
            var coursename = v[i]['course_name'];
            console.log(coursename);
            courselist.push(<li key={i}>{coursename}</li>);
        }
        const listroot = ReactDOM.createRoot(document.querySelector("#all_course_list"));
        const element = <div>{courselist}</div>;
        listroot.render(element);
    });
}

export function UserList(){
    const api = "http://localhost:5000/getAllUsers";

    let getUsers = async () => {
        const settings = {
            method: 'POST',
            credentials: 'same-origin',
            cache: 'no-cache',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        try {
            const fetchResponse = await fetch(`${api}`, settings);
            var v = await fetchResponse.json();
            v = JSON.parse(v);
            var userlist = [];
            for(var i = 0; i < v.length; i++){
                var user = v[i];
                var childdiv
                if(user['active'] == '0'){
                    childdiv =  <div className='userDiv' id={user['user_id']} key={user['user_id']}>
                                        <input type = "hidden" id = "user_id_value" value = {user['user_id']}></input>
                                        <span>name: {user['user_name']}</span>
                                        <span> email: {user['email']}</span>
                                        <span> id: {user['university_id']}</span>
                                        <span> active: {user['active']}  </span>
                                        <button onClick={function() {approveUser()}}>approve</button>
                                        <button onClick={function() {rejectUser()}}>reject</button>
                                        <div className='coursedropdown'></div>
                                    </div>
                } else {
                    childdiv =  <div className='userDiv' id={user['user_id']} key={user['user_id']}>
                                        <input type = "hidden" id = "deactive_user_id_value" value = {user['user_id']}></input>
                                        <span>name: {user['user_name']}</span>
                                        <span> email: {user['email']}</span>
                                        <span> id: {user['university_id']}</span>
                                        <span> active: {user['active']}  </span>
                                        <button onClick={function() {rejectUser()}}>deactivate</button>
                                        <div className='coursedropdown'></div>
                                    </div>
                }
                userlist.push(childdiv)
            }
            const userroot = ReactDOM.createRoot(document.querySelector("#userlist"));
            const element = <div>{userlist}</div>;
            courseDropdown();
            userroot.render(element);
        } catch (e) {
            alert(e);
            return e;
        }    
    }
    getUsers();

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
    var user_id = Number(div.getAttribute('id'));
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

function approveUser(){
    let userid = document.querySelector("#user_id_value").value;
    const api = "http://localhost:5000/approveUser";
    var data = JSON.stringify(
        {
            user_id: userid
        }
    );
    sendPostRequest(api,data);
}

function rejectUser(){
    let userid = document.querySelector("#deactive_user_id_value").value;
    const api = "http://localhost:5000/deactivateUser";
    var data = JSON.stringify(
        {
            user_id: userid
        }
    );
    sendPostRequest(api,data);
}

export function TeacherSelector(){
    const api = "http://localhost:5000/getAllTeachers";
    sendPostRequest(api,'').then(function(v){
        v = JSON.parse(JSON.parse(v));
        console.log(v);
        console.log('got all teachers')
        var options = [];
        for(var i = 0; i < v.length; i++){
            var teacher = v[i];
            options.push(<option key={-1} value={''}></option>)
            var teachername = teacher['user_name'];
            options.push(<option key={i} value={teacher['user_id']}>{teachername}</option>)
        }
        var root = ReactDOM.createRoot(document.querySelector('#teacherselector'))
        root.render(<select id='teacher'>{options}</select>)
    })
}


export function createCourse(){
    //call addcourse and then addusertoclass
    //addcourse: name, description, capacity
    //addusertoclass: userid, course name
    var coursename = document.querySelector("#course_name").value
    var coursedescription = document.querySelector("#desc").value
    var capacity = Number(document.querySelector("#capacity").value)
    var teacher = Number(document.querySelector("#teacher").value)
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
    let apiCall1 = async () => {
        sendPostRequest(addcourseapi,addcoursedata);
    }
    let apiCall2 = async () => {
        await apiCall1();
        sendPostRequest(adduserapi, adduserdata);
    }
    apiCall2();

}


export function searchBar(){
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    searchBarByString(input);
}

export function searchBarByString(s){
    let x = document.getElementsByClassName('userDiv');
      
    for (var i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(s)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="block";                 
        }
    }
}