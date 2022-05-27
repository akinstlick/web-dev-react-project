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

export function getassignments(){    
    var user_id = localStorage.getItem('user_id');
    var course_id = localStorage.getItem('course_id');
    var course_name = localStorage.getItem('course_name');
    const api = "http://localhost:5000/getAllStudentAssignments";
    //getAllStudentAssignments
    var data = JSON.stringify(
        {
            user_id: user_id
        }
    );
    let getAssignments = async () => {
        var assignmentlist = [];
        assignmentlist.push(<h3>{course_name} Assignments</h3>);

        const response = await fetch(`${api}`, {
            method: 'POST',
            credentials: 'same-origin',
            cache: 'no-cache',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        });
        let v = await response.json();
        v = JSON.parse(v);

        var nextData = JSON.stringify(
            {
                user_id: user_id,
                course_id: course_id
            }
        );
        const nextResponse = await fetch("http://localhost:5000/getSubmissionsByStudent", {
            method: 'POST',
            credentials: 'same-origin',
            cache: 'no-cache',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: nextData
        }   
        )
        var submissions = await nextResponse.json();
        console.log(submissions)
        var id_values = []
        for (var i=0; i < submissions.length; i++) {
            id_values.push(submissions[i]['assignment_id']);
        }
        console.log(id_values);

        for(var i = 0; i < v.length; i++){
            var assignment = v[i]
            if(assignment['course_id'] == course_id){
                var assignment_id = assignment['assignment_id'];
                var assignment_name = assignment['assignment_name'];
                var desc = assignment['assignment_dec'];
                var points = assignment['points'];
                var due_date = assignment['due_date'];
                var unique_id = "submit_assignment_form_" + assignment_id;
                if (id_values.includes(assignment_id)) {
                    var li = <li key={i} id={assignment['assignment_id']} assignmentname={assignment['assignment_name']} desc={assignment['description']} due={assignment['due_date']} points={assignment['points']}>
                                {assignment_name} <br/>
                                Submitted
                            </li>
                } else {
                    var li = <li key={i} id={assignment['assignment_id']} assignmentname={assignment['assignment_name']} desc={assignment['description']} due={assignment['due_date']} points={assignment['points']}>
                                {assignment_name} 
                                <form id={unique_id} onSubmit={function () {submit_assignment()}}>
                                    <input type = "hidden" id="assignment_id" value = {assignment_id} ></input>
                                    <h4> Submit {assignment_name}: </h4>
                                    <span>{desc} </span>
                                    <span> due: {due_date} </span>
                                    <span> points: {points} </span> <br/>
                                    <textarea id = "submission_text" rows = "4" cols = "60" placeholder = "Enter assignment here"></textarea>
                                    <br/>
                                    <input type="submit"></input>
                                </form>
                            </li>
                }
                assignmentlist.push(li);
            }
        }
        console.log(assignmentlist);
        const assignmentroot = ReactDOM.createRoot(document.querySelector("#assignment_list"));
        const element = <div>{assignmentlist}</div>;
        assignmentroot.render(element);
    }
    getAssignments();
}

/*function showAssignment() {
    document.querySelector('#submit_assignment').style.display = 'block';
    alert(document.querySelector('#assignment_label_value').value);
    document.querySelector('#assignment_label').innerHTML = document.querySelector('#assignment_label_value').value;
    document.querySelector('#assignment_description').innerHTML = assignment['description'];
    document.querySelector('#due_date_points').innerHTML = "due: " + assignment['due_date'] + ", points: " + assignment['points'];
    document.querySelector('#submit_button').addEventListener('click',() => submit_assignment(assignment['assignment_id']));
}*/
//github id: hegdetejas


export function submit_assignment(){
    const api = "http://localhost:5000/submitAssignment";
    var submission = document.querySelector('#submission').value;
    var assignment_id = document.querySelector('#assignment_id');
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
    const course_name = localStorage.getItem('course_name');
    const api = "http://localhost:5000/getAllTeacherAssignments";
    var data = JSON.stringify(
        {
            user_id: user_id
        }
    );
    sendPostRequest(api,data).then(function(v){
        var assignments = []
        assignments.push(<h3>{course_name} Assignments</h3>);
        v = JSON.parse(JSON.parse(v));
        for(var i = 0; i < v.length; i++){
            var assignment = v[i]
            var li = <li key={i}>{assignment['assignment_name']}</li>
            assignments.push(li);
        }
        const listroot = ReactDOM.createRoot(document.querySelector("#assignmentlist"));
        const element = <div>{assignments}</div>;
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

export function nextAssignmentList(){
    var date = new Date(new Date().getTime() + (3*24*60*60*1000));
    var user_id = localStorage.getItem('user_id');
    const api = "http://localhost:5000/getAllStudentAssignments";
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
            console.log(assignment);
            var duedate = new Date(assignment['due_date'])
            console.log(date);
            if(duedate < date){
                var li = <li key={i}>{assignment['assignment_name']} - {assignment['course_name']} - {assignment['points']} - {assignment['due_date']}</li>
                assignments.push(li);
            }
        }
        const listroot = ReactDOM.createRoot(document.querySelector("#todoassignments"));
        const element = <div><h1>To-Do Assignments</h1> {assignments}</div>;
        listroot.render(element);
    });
}

export function upcomingAssignmentList(){
    var date = new Date(new Date().getTime() + (3*24*60*60*1000));
    var user_id = localStorage.getItem('user_id');
    const api = "http://localhost:5000/getAllStudentAssignments";
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
            console.log(assignment);
            var duedate = new Date(assignment['due_date'])
            console.log(date);
            if(duedate > date){
                var li = <li key={i}>{assignment['assignment_name']} - {assignment['course_name']} - {assignment['points']} - {assignment['due_date']}</li>
                assignments.push(li);
            }
        }
        const listroot = ReactDOM.createRoot(document.querySelector("#upcomingassignments"));
        const element = <div><h1>Upcoming Assignments</h1> {assignments}</div>;
        listroot.render(element);
    });
}

export function pastStudentAssignmentList(){
    var date = new Date(new Date().getTime() - (1*24*60*60*1000));
    var user_id = localStorage.getItem('user_id');
    const api = "http://localhost:5000/getAllStudentAssignments";
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
            console.log(assignment);
            var duedate = new Date(assignment['due_date'])
            console.log(date);
            if(duedate < date){
                var li = <li key={i}>{assignment['assignment_name']} - {assignment['course_name']} - {assignment['points']} - {assignment['due_date']}</li>
                assignments.push(li);
            }
        }
        const listroot = ReactDOM.createRoot(document.querySelector("#pastassignments"));
        const element = <div><h1>Past Assignments</h1> {assignments}</div>;
        listroot.render(element);
    });
}