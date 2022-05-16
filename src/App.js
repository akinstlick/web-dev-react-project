import './App.css';
import Signup from './components/signup';
import Login from './components/login';
import ForgotPassword from './components/forgotpassword'
import Dashboard from './components/dashboard';
import Courses from './components/courses';
import Account from './components/account';
import StudentGrades from './components/student_grades';
import TeacherGrades from './components/teacher_grades';
import StudentAnnouncements from './components/student_announcements';
import TeacherAnnouncements from './components/teacher_announcements';
import StudentAssignments from './components/student_assignments';
import TeacherAssignments from './components/teacher_assignments';
import AdminSettings from './components/admin_settings';
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
          <Route path='courses' element={<Courses />}/>
          <Route path='account' element={<Account />}/>
          <Route path='studentgrades' element={<StudentGrades />}/>
          <Route path='teachergrades' element={<TeacherGrades />}/>
          <Route path='studentassignments' element={<StudentAssignments />}/>
          <Route path='teacherassignments' element={<TeacherAssignments />}/>
          <Route path='studentannouncements' element={<StudentAnnouncements />}/>
          <Route path='teacherannouncements' element={<TeacherAnnouncements />}/>
          <Route path='adminsettings' element={<AdminSettings />}/>
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
