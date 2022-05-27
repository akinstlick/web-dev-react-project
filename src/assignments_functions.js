import { useEffect, useState } from 'react';
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


export function Getassignments(){
    useEffect(() => {
        console.log("useEffect [] at App.js level called");
        sendPostRequest(api,data).then(function(v){
            v = JSON.parse(JSON.parse(v));
            console.log(v);
            var tmpassignments = [];
            for(var i = 0; i < v.length; i++){
                var assignment = v[i]
                if(assignment['course_id'] == course_id){
                    var li = <li key={i}>
                                {assignment['assignment_name']}
                                <button onClick={() => populateAssignmentSubmission(assignment['assignment_name'],
                                                                                         assignment['description'],
                                                                                         assignment['due_date'],
                                                                                         assignment['points'],
                                                                                         assignment['assignment_id'])}>
                                    Complete
                                </button>
                            </li>
                    tmpassignments.push(li)
                }
                setassignmentlist(tmpassignments)
            }
        });
      }, []);    
    var user_id = localStorage.getItem('user_id');
    const [assignmentlist, setassignmentlist] = useState([]);
    var course_id = '1';
    const api = "http://localhost:5000/getAllStudentAssignments";
    //getAllStudentAssignments
    var data = JSON.stringify(
        {
            user_id: user_id
        }
    );
    return assignmentlist
}
//github id: hegdetejas


export function populateAssignmentSubmission(name,desc,due,points,id){
    document.querySelector('#submit_assignment').style.display = 'block';
    document.querySelector('#assignment_label').innerHTML = name;
    document.querySelector('#assignment_description').innerHTML = desc;
    document.querySelector('#due_date_points').innerHTML = "due: " + due + ", points: " + points;
    document.querySelector('#submit_button').addEventListener('click',() => submit_assignment(id));
}

export function submit_assignment(assignment_id){
    const api = "http://localhost:5000/submitAssignment";
    var submission = document.querySelector('#submission').value;
    var user_id = localStorage.getItem('user_id');
    var data = JSON.stringify(
        {
            user_id: user_id,
            assignment_id: assignment_id,
            submission: submission
        }
    );
    sendPostRequest(api,data);
}


export function createAssignment(){
    const api = "http://localhost:5000/addAssignment";
    var course_id = localStorage.getItem('course_id');
    var name = document.querySelector('#assignment_name').value;
    var points = document.querySelector('#assignment_points').value;
    var description = document.querySelector('#assignment_description').value;
    var date = document.querySelector('#duedate').value;
    var data = JSON.stringify(
        {
            course_id: course_id,
            name: name,
            points: points,
            description: description,
            due_date: date
        }
    );
    sendPostRequest(api,data);
}

export function AssignmentList(){
    var user_id = localStorage.getItem('user_id');
    const api = "http://localhost:5000/getAllTeacherAssignments";
    var data = JSON.stringify(
        {
            user_id: user_id
        }
    );
    sendPostRequest(api,data).then(function(v){
        var assignments = []
        v = JSON.parse(JSON.parse(v));
        for(var i = 0; i < v.length; i++){
            var assignment = v[i]
            var li = <li key={i}>{assignment['assignment_name']}</li>
            assignments.push(li);
        }
        const listroot = ReactDOM.createRoot(document.querySelector("#assignmentlist"));
        const element = <div>All Assignments: {assignments}</div>;
        listroot.render(element);
    });
}


export function pastAssignmentList(){
    var date = new Date().toISOString().split('T')[0];
    var user_id = localStorage.getItem('user_id');
    const api = "http://localhost:5000/getAllTeacherAssignments";
    var data = JSON.stringify(
        {
            user_id: user_id
        }
    );
    sendPostRequest(api,data).then(function(v){
        var assignments = []
        v = JSON.parse(JSON.parse(v));
        for(var i = 0; i < v.length; i++){
            var assignment = v[i]
            if(assignment['due_date'] < date){
                var li = <li key={i}>{assignment['assignment_name']} - {assignment['course_name']} - {assignment['points']} - {assignment['due_date']}</li>
                assignments.push(li);
            }
        }
        const listroot = ReactDOM.createRoot(document.querySelector("#teacherdashboard"));
        const element = <div><h1>Past Due Assignments</h1> {assignments}</div>;
        listroot.render(element);
    });
}