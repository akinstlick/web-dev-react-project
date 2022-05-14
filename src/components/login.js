import { loginFunc } from "../functions";

function Login() {  

  return (
    <div id="logindiv">
        <h1>Canvas</h1>
        <h2>Log In</h2>
        <form id="login">
            <input type="text" id="username" placeholder="username"></input><br/>
            <input type="password" id="password" placeholder="password"></input><br/>
            <a href="./forgot_password">Forgot Password?</a><br/>
            <input type="submit" onClick={loginFunc}></input>
        </form>
        <a href="./signup">Don't have an account? Sign Up</a>
    </div>
  );
}

export default Login;
