import { changePassword } from "../functions";

function ForgotPassword() {  

  return (
    <div id="forgotpassworddiv">
        <h1>Password Reset</h1>
        <div id="sqdiv">
            <form id="securityquestions">
                <p>Security Question 1: What was your first pet's name?</p>
                <input type="text" id="sq1" placeholder="answer"></input>
                <p>Security Question 2: What is your mother's maiden name?</p>
                <input type="text" id="sq2" placeholder="answer"></input>
                <p>Security Question 3: What are the last 4 digits of your social security?</p>
                <input type="text" id="sq3" placeholder="answer"></input> <br/>
                <p>Input New Password</p>
                <input type="password" id="password1" placeholder="new password"></input> <br/>
                <input type="password" id="password2" placeholder="confirm password"></input> <br/>
                <input type="submit" onClick={changePassword}></input>
            </form>
        </div>
    </div>
  );
}

export default ForgotPassword;
