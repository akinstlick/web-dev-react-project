
function Account(){
    var accounttype = 1;
    switch(accounttype){
        case 1:
            return (
                <div>
                    <div id = "personal_info">
                        <h2> Account Information </h2> 
                        <span id = "name"> Name: Jane </span>
                        <input type = "text" id = "name_field"></input>
                        <br />
                        <span id = "email"> Email: jane@example.com </span>
                        <input type = "text" id = "email_field"> </input>
                        <br />
                        <span id = "student_id"> Student ID: 123456789 </span>
                        <input type = "text" id = "id_field"> </input>
                    </div>
                    <input type = "button" value = "Edit Profile"></input>
                    <br /> 
                    <br />
                    <input type = "button" value = "Change Password"></input>
                    <form id = "change_password">
                        Current Password: <input type = "text" id = "curr_password"></input>
                        <br />
                        New Password: <input type = "text" id = "new_password"></input>
                        <br />
                        Confirm Password: <input type = "text" id = "confirm_password"></input>
                        <input type = "submit"></input>
                    </form>
                    <br />
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
                            Enter your password: <input type = "text" id = "verify_password"></input>
                            <br />
                            Security Question 1: <input type="text" id="change_sq1"></input>
                            <br />
                            Security Question 2: <input type="text" id="change_sq2"></input>
                            <br />
                            Security Question 3: <input type="text" id="change_sq3"></input>
                            <br />
                            <input type="submit"></input>
                        </form>
                    </div>
                </div>
            )
        case 2:
            return (
                <div>

                </div>
            )
        case 3:
            return (
                <div>

                </div>
            )
        default:
            return (
                <div>
                    <p1>Error: Account not found</p1>
                </div>
            )
    }
}

export default Account