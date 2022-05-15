import './App.css';
import Signup from './components/signup';
import Login from './components/login';
import ForgotPassword from './components/forgotpassword'
import Dashboard from './components/dashboard';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='forgot_password' element={<ForgotPassword />} />
          <Route path='dashboard' element={<Dashboard />}/>
        </Routes>
      </div>
    </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Hello World
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
