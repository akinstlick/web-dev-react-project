import { useEffect } from "react";
import { getUserType } from "../admin_functions";
import { getStudentCourses } from "../course_functions.js"
import Sidebar from "./sidebar";


function Courses(){
    useEffect(() => {
        getUserType();
    });
    var accounttype = localStorage.getItem('account_type');
    switch(accounttype){
        case "student":
            useEffect(() => {
                getStudentCourses();
            });
            /*return (
                <div id="courses">
                    <Sidebar />
                    <h2> Your Courses </h2>
                    <div id = "course_list">
                        <ul>
                            <li> CHEM101 </li>
                            <li> MATH101 </li> 
                            <li> ENGL101 </li>
                        </ul>
                    </div>
                    <div id = "course_nav_menu">
                        <ul>
                            <a href = "studentannouncements"><li> Announcements </li></a>
                            <a href = "studentassignments"><li> Assignments </li></a>
                            <a href = "studentgrades"><li> Grades </li></a>
                        </ul>
                    </div>
                </div>
            )*/
        case 'teacher':
            return (
                <div id="courses">
                    <Sidebar />
                    <h2> Your Courses </h2>
                    <div id = "course_list">
                        <ul>
                            <li> CHEM101 </li>
                            <li> MATH101 </li> 
                            <li> ENGL101 </li>
                        </ul>
                    </div>
                    <div id = "course_nav_menu">
                        <ul>
                            <a href = "teacherannouncements"><li> Announcements </li></a>
                            <a href = "teacherassignments"><li> Assignments </li></a>
                            <a href = "teachergrades"><li> Grades </li></a>
                        </ul>
                    </div>
                </div>
            )
        case 'admin':
            return (
                <div id="courses">
                    <Sidebar />
                    <h2> All Courses </h2> 
                    <div id = "all_course_list">
                        <ul>
                            <li> ECON101 </li>
                            <li> MATH101 </li> 
                            <li> CMSC101 </li>
                            <li> CHEM101 </li> 
                            <li> ENGL101 </li>
                        </ul>
                    </div>
                    <input type = "button" value = "Add a course" onClick={function (){document.querySelector('#add_course').style.display = 'block'}}></input>
                    <br />
                    <form id = "add_course" style={{display:'none'}}>
                        <label htmlFor = "course_name"> Course Name: </label>
                        <input type={'text'} id = "course_name"></input><br />
                        <label htmlFor = "desc"> Description: </label>
                        <input type = {'text'} id = "desc"></input><br />
                        <label htmlFor = "capacity"> Capacity: </label>
                        <input type = {'text'} id = "capacity"></input><br />
                        <label htmlFor = "teacher"> Assigned Teacher: </label>
                        <select id = "teacher">
                            <option value = "Dr. A"> Dr. A</option>
                            <option value = "Professor B"> Professor B </option>
                        </select>
                        <br />
                        <input type = "submit"></input>
                    </form>
                </div>
            )
        default:
            return (
                <div>
                    <h1>Error: Courses var not found</h1>
                </div>
            )
    }
}

export default Courses