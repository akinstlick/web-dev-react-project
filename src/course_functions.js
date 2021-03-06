import * as ReactDOM from 'react-dom/client';

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
// *****************************************************************
// Courses Homepage
// *****************************************************************
// *****************************************************************
// helper function to set a course id in local storage
function setCourseID() {
    const course_id = document.querySelector("#course_id_value").value;
    const course_name = document.querySelector("#course_name_value").value;

    localStorage.setItem('course_id', course_id);
    localStorage.setItem('course_name', course_name);
    window.location.assign('teacherannouncements');
}

// helper function to render the course list
function renderCourses(api, data, html_element, account) {
    let getCourseRenders = async () => {
        const settings = {
            method: 'POST',
            credentials: 'same-origin',
            cache: 'no-cache',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        };
        try {
            const fetchResponse = await fetch(`${api}`, settings);
            let v = await fetchResponse.json();
            var courselist = [];
            for(var i = 0; i < v.length; i++){
                var course = v[i];
                var child;
                var course_id = course['course_id'];
                var course_name = course['course_name'];
                if (account == "teacher") {
                    child =  <li id={course_id} key={course_id}> {course['course_name']} 
                                <input type = "hidden" id = "course_id_value" value = {course_id}></input>
                                <input type = "hidden" id = "course_name_value" value = {course_name}></input>
                                <ul>
                                    <li> <a href = {"/teacherannouncements?id=" + course_id + "&name=" + course_name}> Announcements </a> </li>
                                    <li> <a href={"/teacherassignments?id="+ course_id + "&name=" + course_name}> Assignments </a> </li>
                                    <li> <a href={"/teachergrades?id=" + course_id + "&name=" + course_name}> Grades </a> </li>
                                </ul>
                            </li>
                } else {
                    child =  <li id={course_id} key={course_id}> {course['course_name']} 
                                <input type = "hidden" id = "course_id_value" value = {course_id}></input>
                                <input type = "hidden" id = "course_name_value" value = {course['course_name']}></input>
                                <ul>
                                    <li> <a href={"/studentannouncements?id=" + course_id + "&name=" + course_name}> Announcements </a> </li>
                                    <li> <a href={"/studentassignments?id=" + course_id + "&name=" + course_name}> Assignments </a> </li>
                                    <li> <a href={"/studentgrades?id=" + course_id + "&name=" + course_name}> Grades </a> </li>
                                </ul>
                            </li>
                }
                courselist.push(child);
            }
            console.log(courselist);
            const userroot = ReactDOM.createRoot(document.querySelector(html_element));
            const element = <div>{courselist}</div>;
            userroot.render(element);
        } catch (e) {
            return e;
        }    
    }
    getCourseRenders();
    
}
export function getStudentCourses(user_id) {
    const api = "http://localhost:5000/getStudentCourses";
    const data = JSON.stringify(
        { user_id : user_id
        }
    );
    renderCourses(api, data, "#studentcourses", "student");
}

export function getTeacherCourses(user_id) {
    const api = "http://localhost:5000/getTeacherCourses";
    const data = JSON.stringify (
        {
            user_id : user_id
        }
    );
    renderCourses(api, data, "#teachercourses", "teacher");
}

// *****************************************************************
// *****************************************************************
// Announcements
// *****************************************************************
// *****************************************************************

// render the announcements of the current course
export function getAnnouncements() {
    const api = "http://localhost:5000/getAnnouncementsByCourse";
    const course_id = localStorage.getItem('course_id');
    const course_name = localStorage.getItem('course_name');
    const data = JSON.stringify(
        { course_id: course_id
        });
    
    sendPostRequest(api,data).then(function(v){
        v = JSON.parse(v);
        console.log(v);
        var announcements = [];
        announcements.push(<h3>{course_name} Announcements </h3>);
        for(var i = 0; i < v.length; i++){
            var announcement = v[i];
            var child;
            child =  <li id={i} key={i}> {announcement['announcement']} </li>
            announcements.push(child);
        }
        const announcementroot = ReactDOM.createRoot(document.querySelector("#announcements"));
        const element = <div>{announcements}</div>;
        announcementroot.render(element);
    });    
}

export function createAnnouncement() {
    const api = "http://localhost:5000/addAnnouncement";
    const course_id = localStorage.getItem('course_id');
    let description = document.querySelector("#announcement_text").value;

    const data = JSON.stringify(
        { course_id: course_id,
          description: description
        }
    );

    sendPostRequest(api,data);
}

// *****************************************************************
// *****************************************************************
// Grades
// *****************************************************************
// *****************************************************************
export function getGradesByStudent() {
    const api = "http://localhost:5000/getStudentGrades";
    const course_id = localStorage.getItem('course_id');
    const user_id = localStorage.getItem('user_id');
    const course_name = localStorage.getItem('course_name');
    const data = JSON.stringify(
        { course_id: course_id,
          user_id : user_id
        }
    );

    sendPostRequest(api,data).then(function(v){
        v = JSON.parse(v);
        console.log(v);
        var assignments = [];
        assignments.push(<h3>{course_name} Grades</h3>);
        for(var i = 0; i < v.length; i++){
            var assignment = v[i];
            var name = assignment['assignment_name'];
            var grade = assignment['grade'];
            var points = assignment['points'];
            if(grade == -2) {
                grade = 'Grade: No Submission';
            } else if (grade == -1) {
                grade = 'Grade: Ungraded';
            } else {
                grade = 'Grade: ' + grade + '/' + points;
            }
            var child;
            child =  <div id={i} key={i}>
                        <span> {name} </span>
                        <br/>
                        <span> {grade}</span>  
                        <br/><br/> 
                     </div>
            assignments.push(child);
        }
        const graderoot = ReactDOM.createRoot(document.querySelector("#grades"));
        const element = <div>{assignments}</div>;
        graderoot.render(element);
    }); 
}

// get all the student grades for the teacher's grades display
export function getAllStudentGrades(){
    const api = "http://localhost:5000/getAllStudentsByCourse";
    const course_id = localStorage.getItem('course_id');
    const course_name = localStorage.getItem('course_name');
    let data = JSON.stringify(
        { course_id: course_id,
        }
    );
   
    let getStudents = async () => {
        const settings = {
            method: 'POST',
            credentials: 'same-origin',
            cache: 'no-cache',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        };
        try {
            const fetchResponse = await fetch(`${api}`, settings);
            const students = await fetchResponse.json();
            const studentdivs = [];
            studentdivs.push(<h3>{course_name} Grades</h3>);
            const numstudents = students.length
            // for every student in the course
            for (let i = 0; i < numstudents; i++) {
                let student = students[i];
                let user_id = student['user_id'];
                let name = student['user_name'];
                let studentdiv = [];
                var studentname = <div id={user_id} key={user_id}>
                                        <span> {name} </span>
                                    </div>
                studentdiv.push(studentname);

                // get the student's grades for each assignment
                const url = "http://localhost:5000/getStudentGrades";
                const user_data = JSON.stringify(
                    { 
                    course_id: course_id,
                    user_id : user_id
                    }
                );
                const nextResponse = await fetch(`${url}`, {
                    method: 'POST',
                    credentials: 'same-origin',
                    cache: 'no-cache',
                    mode: 'cors',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: user_data
                });
                const grades = await nextResponse.json();
                console.log(grades);
                for(let i = 0; i < grades.length; i++){
                    var assignment = grades[i];
                    var assignment_name = assignment['assignment_name'];
                    var grade = assignment['grade'];
                    var id = assignment['assignment_id'];
                    var points = assignment['points'];
                    var submission_text = assignment['submission_text'];

                    if(grade == -2) {
                        grade = 'Not Submitted';
                    }
                    var assignment_grade;
                    assignment_grade =  (<div id={(user_id, id)} key={(user_id, id)}>
                                            <span> {assignment_name}: {grade} </span>
                                            <br/>
                                        </div>)
                    if(grade == -1) {
                        assignment_grade =  (<div id={(user_id, id)} key={(user_id, id)}>
                                                <span> {assignment_name}: Ungraded </span>
                                                <button onClick={function () { document.getElementById("submit_grade").style.display = 'block'}}> Grade Assignment </button>
                                                <form id="submit_grade" style={{ display: 'none' }} onSubmit={function () {submitGrade(user_id)}}>
                                                    <input type = "hidden" id="assignment_id" value = {id} ></input>
                                                    {submission_text} <br/>
                                                    Grade (/{points}): <input type="number" id="points_earned" max={points}></input>
                                                    <input type="submit"></input>
                                                </form>
                                                <br/>
                                            </div>)
                    }
                    studentdiv.push(assignment_grade);
                }
                studentdivs.push(<div>{studentdiv}<br/></div>)
            }
            const graderoot = ReactDOM.createRoot(document.querySelector("#allgrades"));
            const element = <div>{studentdivs}</div>;
            graderoot.render(element);
            
        } catch (e) {
            return e;
        }    
    }
    getStudents();
}

// helper function to submit a grade to the database
function submitGrade(user_id) {
    var grade = document.querySelector('#points_earned').value;
    var assignment_id = document.querySelector('#assignment_id').value;

    const url = "http://localhost:5000/addGradeForSubmission";
    const data = JSON.stringify(
                { user_id: user_id,
                  assignment_id: assignment_id,
                  grade: grade
                });
    
    sendPostRequest(url,data);

}