import { signupFunc } from "../account_functions";

function Signup(){


    return (
        <div>
        <h1>Canvas</h1>
            <div id="signupdiv">
                <h2>Sign Up</h2>
                <form id="signup">
                    <input type="text" id="name" placeholder="name"></input> <br/>
                    <input type="email" id="email" placeholder="email"></input><br/>
                    <input type="number" id="id" placeholder="id"></input><br/>
                    <input type="password" id="password1" placeholder="password"></input> <br/>
                    <input type="password" id="password2" placeholder="confirm password"></input> <br/>
                    <p>Account Type?</p>
                    <input type="radio" name="s_t" id="student"></input>
                    <label for="student">Student</label>
                    <input type="radio" name="s_t" id="teacher"></input>
                    <label for="teacher">Teacher</label><br/>
                    <p>Security Question 1: What was your first pet's name?</p>
                    <input type="text" id="sq1" placeholder="answer"></input>
                    <p>Security Question 2: What is your mother's maiden name?</p>
                    <input type="text" id="sq2" placeholder="answer"></input>
                    <p>Security Question 3: What are the last 4 digits of your social security?</p>
                    <input type="text" id="sq3" placeholder="answer"></input> <br />
                    <input type="submit" onClick={signupFunc}></input>
                </form>
            </div>
        </div>
      );
}

export default Signup