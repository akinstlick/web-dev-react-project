export function checkPassword(pword){
    if(pword.legth < 5){
        return false
    }
    var symbol = false;
    var number = false;
    for (var i = 0; i < pword.length; i++) {
        var c = pword.charCodeAt(i);
        if(c > 47 && c < 58){
            number = true;
        }
        if(c > 32 && c < 48){
            symbol = true;
        }
    }
    if(!(symbol && number)){
        return false;
    }
    return true;
}


export function loginFunc(){
    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;
    if(!checkPassword(password)){
        alert('error: password must be at least 5 characters, including 1 number and 1 special character');
        return false;
    } else {
        const url = "http://localhost:5000/checkUser";
        const data = JSON.stringify(
            { email: email,
              password: password
            });

        //WEIRD BUG: i have to enter a username/password twice because the first time it doesn't
        //seem to successfully register the xmlrequest/api call. no clue what's going on
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                let response = JSON.parse(xhttp.responseText);
                let user_id = response['user_id'];
                if (user_id == '0000') {
                    alert("user does not exist or password is incorrect");
                } else {
                    alert("success");
                    localStorage.setItem("user_id",user_id)
                    window.location.assign('dashboard');
                }
            }
        };
        xhttp.open("POST", url, true);
        xhttp.send(data);
    }
}

export function signupFunc(){
    var name = document.querySelector("#name").value;
    // TODO: check email is valid
    // TODO: if email already exists in database, route to forgot password
    var email = document.querySelector("#email").value;
    var id = document.querySelector("#id").value;
    var pass1 = document.querySelector("#password1").value;
    var pass2 = document.querySelector("#password2").value;
    var s_t = document.querySelectorAll('input[name="s_t"]:checked')[0]
    if(s_t != null){
        s_t = s_t.id;
    } else {
        alert('error: please select student or teacher');
        return false;
    }
    var q1 = "What was your first pet's name?";
    var q2 = "What is your mother's maiden name?";
    var q3 = "What are the last 4 digits of your social security?";
    var sq1 = document.querySelector('#sq1').value;
    var sq2 = document.querySelector('#sq2').value;
    var sq3 = document.querySelector('#sq3').value;
    if(pass1 !== pass2){
        alert('error: passwords must match');
        return false;
    }
    if(!checkPassword(pass1)){
        alert('error: password must be at least 5 characters, including 1 number and 1 special character');
        return false;
    }
    if(sq1 === "" || sq2 === "" || sq3 === "") {
        alert('error: must answer security questions');
        return false;
    }
    if(name === "" || email === ""){
        alert('error: please fill out name and email');
        return false;
    }
    if(id === null){
        alert('error: please enter id');
        return false;
    }

    addUser(name, email, id, pass1, s_t, q1, sq1, q2, sq2, q3, sq3);
    return true;
}

// addUser: sends a POST request to the backend to add a new user to the database
async function addUser(name, email, id, pwd, s_t, q1, sq1, q2, sq2, q3, sq3) {
    const data = JSON.stringify(
        { name: name, 
          email: email,
          university_id: id,
          password: pwd,
          account_type: s_t,
          q1: q1, 
          sq1: sq1,
          q2: q2,
          sq2: sq2,
          q3: q3,
          sq3: sq3
        });
    const url = "http://localhost:5000/addUser";
    const xhttp = new XMLHttpRequest();

    xhttp.open("POST", url, true);

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            alert(xhttp.responseText);
        }
    }
    xhttp.send(data);
}

function sendPostRequest(url, data) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
        }
    };
    xhttp.open("POST", url, true);
    xhttp.send(data);
    return xhttp.responseText;
}

// THIS IS A TEST FUNCTION TODO: remove at the end
async function testUser() {
    /*let url = 'http://localhost:5000/data'
    try {
        let res = await fetch(url);
        let data = await res.json();
        data = JSON.parse(data);
        alert(data);
        console.log(data);
        return data;
    } catch (error) {
        alert('error');
        console.log(error);
    }*/
    const api = "http://localhost:5000/data";
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", api, true);
    xhttp.onload = function() {
        let response = JSON.parse(xhttp.responseText);
        alert(response['Name']);
        console.log(response);
    }
    xhttp.send();
}

export function populateAccount(){
    var namediv = document.querySelector("#name");
    var emaildiv = document.querySelector("#email");
    var iddiv = document.querySelector("#student_id");
    var user_id = localStorage.getItem("user_id");
    console.log('populate account called! user_id: ' + user_id);
    var data = JSON.stringify(
        {
            user_id: user_id
        }
    );
    const api = "http://localhost:5000/getUserInfo";
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", api, true);
    xhttp.onload = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            let response = JSON.parse(xhttp.responseText);
            console.log(response);
            namediv.innerHTML = "Name: " + response['name'];
            emaildiv.innerHTML = "Email: " + response['email'];
            iddiv.innerHTML =  "Student ID: " + response['university_id'];
        }
    };
    xhttp.send(data);
    // get name/email/id from database and show them in the divs
}

export function editProfile(){
    var newname = document.querySelector('#name_field').value;
    var newemail = document.querySelector('#email_field').value;
    var newid = document.querySelector('#id_field').value;
    //update values in database - do them individually
    if(newname !== ""){
        //update
    }
    if(newemail !== ""){
        //update
    }
    if(newid !== ""){
        //update
    }
}

export function changePassword(){
    var pass1 = document.querySelector('#new_password').value;
    var pass2 = document.querySelector('#confirm_password').value;
    var sq1 = document.querySelector('#sq1').value;
    var sq2 = document.querySelector('#sq2').value;
    var sq3 = document.querySelector('#sq3').value;

    if(pass1 !== pass2){
        alert('error: passwords must match');
        return false;
    }
    if(!checkPassword(pass1)){
        alert('error: password must be at least 5 characters, including 1 number and 1 special character');
        return false;
    }
    //TODO: change database where password = old password
    // check the security question answers
    const url = "http://localhost:5000/changePassword";
    var user_id = localStorage.getItem("user_id");
    const data = JSON.stringify(
                { user_id: user_id,
                  sq1: sq1,
                  sq2: sq2,
                  sq3: sq3,
                  new_password: pass1
                });
    console.log('change password called');
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            let response = JSON.parse(xhttp.responseText)['result'];
            if (response == 'success') {
                alert("password successfully changed");
                //TODO: route to whatever comes next
            } else {
                alert("security questions are incorrect");
            }
        }
    };
    xhttp.send(data);

}

export function changeSecurityQuestions(){
    var pass = document.querySelector('#verify_password');
    var sq1 = document.querySelector('#change_sq1').value;
    var sq2 = document.querySelector('#change_sq2').value;
    var sq3 = document.querySelector('#change_sq3').value;
    //change in database
}