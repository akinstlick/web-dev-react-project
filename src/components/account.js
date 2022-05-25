import { useEffect } from "react";
import { changePassword, populateAccount } from "../account_functions";
import Sidebar from "./sidebar"

function Account() {
    useEffect(() => {
        console.log('here');
        populateAccount();
    });

    return (
        <div id="account">
            <Sidebar />
            <div id="personal_info">
                <h2> Account Information </h2>
                <span id="name"></span>
                <br /> <br />
                <span id="email"></span>
                <br /> <br />
                <span id="student_id"></span>
            </div>
            <div id="change_account" style={{ display: 'none' }}>
                Name <input type="text" id="name_field"></input><br />
                Email <input type="text" id="email_field"></input><br />
                ID <input type="text" id="id_field"></input><br />
                    <input type="submit"></input> <br />
            </div>
            <input type="button" value="Edit Profile" onClick={function () { document.getElementById("change_account").style.display = 'block' }}></input>
            <br />
            <br />
            <div id="security_questions">
                <span> The security questions are: </span>
                <ol>
                    <li> What is the name of your first pet? </li>
                    <li> What is your mom's maiden name? </li>
                    <li> What are the last 4 digits of your social security? </li>
                </ol>
            </div>
            <input type="button" value="Change Password" onClick={function () { document.getElementById("change_password").style.display = 'block' }}></input>
            <form id="change_password" style={{ display: 'none' }} onSubmit={changePassword}>
                New Password: <input type="password" id="new_password"></input>
                <br /> <br />
                Confirm Password: <input type="password" id="confirm_password"></input>
                <br /> <br />
                Security Answer 1: <input type="text" id="sq1"></input>
                <br /> <br />
                Security Answer 2: <input type="text" id="sq2"></input>
                <br /> <br />
                Security Answer 3: <input type="text" id="sq3"></input>
                <br /> <br />
                <input type="submit"></input>
            </form>
            <br /> <br />
            <div id="security_question_answers">
                <span>Change Security Question Answers</span>
                <form id="change_answers">
                    Enter your password: <input type="password" id="verify_password"></input>
                    <br /> <br />
                    Security Answer 1: <input type="text" id="change_sq1"></input>
                    <br /> <br />
                    Security Answer 2: <input type="text" id="change_sq2"></input>
                    <br /> <br />
                    Security Answer 3: <input type="text" id="change_sq3"></input>
                    <br /> <br />
                    <input type="submit"></input>
                </form>
            </div>
        </div>
    )
}

export default Account