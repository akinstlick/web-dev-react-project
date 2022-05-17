
function Account(){
    var accounttype = 1;
    switch(accounttype){
        case 1:
            return (
                <div id="account">
                    <div id = "personal_info">
                        <h2> Account Information </h2> 
                        <span id = "name"> Name: Jane </span>
                        <br /> <br />
                        <span id = "email"> Email: jane@example.com </span>
                        <br /> <br />
                        <span id = "student_id"> Student ID: 123456789 </span>
                    </div>
                    <div id="change_account" style={{display: 'none'}}>
                        Name <input type = "text" id = "name_field"></input><br/>
                        Email <input type = "text" id = "email_field"></input><br/>
                        ID <input type = "text" id = "id_field"></input><br/>
                    </div>
                    <input type = "button" value = "Edit Profile" onClick={function(){document.getElementById("change_account").style.display = 'block'}}></input>
                    <br /> 
                    <br />
                    <input type = "button" value = "Change Password" onClick={function(){document.getElementById("change_password").style.display = 'block'}}></input>
                    <br /> <br />
                    <form id = "change_password" style={{display:'none'}}>
                        Current Password: <input type = "text" id = "curr_password"></input>
                        <br /> <br />
                        New Password: <input type = "text" id = "new_password"></input>
                        <br /> <br />
                        Confirm Password: <input type = "text" id = "confirm_password"></input>
                        <br /> <br />
                        <input type = "submit"></input>
                    </form>
                    <br /> <br />
                    <div id = "security_questions">
                        <span> The security questions are: </span>
                        <ol>
                            <li> What is the name of your first pet? </li>
                            <li> What town were you born in? </li>
                            <li> What is your mom's maiden name? </li>
                        </ol>
                    </div>
                    <div id="security_question_answers">
                        <span>Change Security Question Answers</span>
                        <form id="change_answers">
                            Enter your password: <input type = "password" id = "verify_password"></input>
                            <br /> <br />
                            Security Question 1: <input type="text" id="change_sq1"></input>
                            <br /> <br />
                            Security Question 2: <input type="text" id="change_sq2"></input>
                            <br /> <br />
                            Security Question 3: <input type="text" id="change_sq3"></input>
                            <br /> <br />
                            <input type="submit"></input>
                        </form>
                    </div>
                </div>
            )
        case 2:
            return (
                <div>
                    <p>not done yet</p>
                </div>
            )
        case 3:
            return (
                <div>
                    <p>not done yet</p>
                </div>
            )
        default:
            return (
                <div>
                    <p>Error: Account not found</p>
                </div>
            )
    }
}

export default Account