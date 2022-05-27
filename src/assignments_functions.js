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
    var course_id = '1';
    const api = "http://localhost:5000/getAllStudentAssignments";
    //getAllStudentAssignments
    var data = JSON.stringify(
        {
            user_id: user_id
        }
    );
    sendPostRequest(api,data).then(function(v){
        var assignmentlist = []
        v = JSON.parse(JSON.parse(v));
        console.log(v);
        for(var i = 0; i < v.length; i++){
            var assignment = v[i]
            if(assignment['course_id'] == course_id){
                var li = <li key={i}>
                            {assignment['assignment_name']}
                            <button onClick={function(){populateAssignmentSubmission(assignment['assignment_name'],
                                                                                     assignment['description'],
                                                                                     assignment['due_date'],
                                                                                     assignment['points'],
                                                                                     assignment['assignment_id'])}}>
                                Complete
                            </button>
                        </li>
                assignmentlist.push(li)
            }
        }
        const listroot = ReactDOM.createRoot(document.querySelector("#assignment_list"));
        const element = <ul>{assignmentlist}</ul>;
        listroot.render(element);
    });
}

export function populateAssignmentSubmission(name,desc,due,points,id){
    document.querySelector('#submit_assignment').style.display = 'block';
    document.querySelector('#assignment_label').innerHTML = name;
    document.querySelector('#assignment_description').innerHTML = desc;
    document.querySelector('#due_date_points').innerHTML = "due: " + due + ", points: " + points;
    document.querySelector('#submit_button').addEventListener('click',function(){
        submit_assignment(id);
    })
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
    
}