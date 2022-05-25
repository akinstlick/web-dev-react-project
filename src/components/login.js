import { loginFunc } from "../account_functions";

function Login() {  

  return (
    <div id="logindiv">
        <h1 style={{color: 'red'}}>Canvas</h1>
        <h2>Log In</h2>
        <form id="login">
            <input type="text" id="email" placeholder="email"></input><br/><br/>
            <input type="password" id="password" placeholder="password"></input><br/><br/>
            <input type="submit" onClick={loginFunc}></input><br/><br/>
            <a href="./forgot_password">Forgot Password?</a><br/>
        </form>
        <a href="signup">Don't have an account? Sign Up</a>
    </div>
  );
}

export default Login;
