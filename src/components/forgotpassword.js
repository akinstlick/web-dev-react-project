import { changePassword } from "../account_functions";

function ForgotPassword() {  

  return (
    <div id="forgotpassworddiv">
        <h1>Password Reset</h1>
        <div id="sqdiv">
            <form id="securityquestions">
                <p>Email</p>
                <input type="text" id="email" placeholder="email" required></input>
                <p>Security Question 1: What was your first pet's name?</p>
                <input type="text" id="sq1" placeholder="answer" required></input>
                <p>Security Question 2: What is your mother's maiden name?</p>
                <input type="text" id="sq2" placeholder="answer" required></input>
                <p>Security Question 3: What are the last 4 digits of your social security?</p>
                <input type="text" id="sq3" placeholder="answer" required></input> <br/>
                <p>Input New Password</p>
                <input type="password" id="new_password" placeholder="new password" required></input> <br/>
                <input type="password" id="confirm_password" placeholder="confirm password" required></input> <br/>
                <input type="submit" onClick={changePassword}></input>
            </form>
        </div>
    </div>
  );
}

export default ForgotPassword;
