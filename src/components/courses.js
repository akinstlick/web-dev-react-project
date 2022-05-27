import { useEffect } from "react";
import { createCourse, getUserType,AdminCourseList } from "../admin_functions";
import { getStudentCourses, getTeacherCourses} from "../course_functions";
import Sidebar from "./sidebar";


function Courses(){
    useEffect(() => {
        getUserType();
    });
    var accounttype = localStorage.getItem('account_type');
    var user_id = localStorage.getItem('user_id');
    switch(accounttype){
        case "student":
            getStudentCourses(user_id);
            return (
                <div id="courses">
                    <Sidebar />
                    <h1>Courses</h1>
                    <div id="studentcourses" style={{display:"flex",justifyContent:"center"}}>
                    </div>
                </div>
            )
            
        case 'teacher':
            getTeacherCourses(user_id);
            return (
                <div id="courses">
                    <Sidebar />
                    <h1>Courses</h1>
                    <div id="teachercourses" style={{display:"flex",justifyContent:"center"}}>
                    </div>
                </div>
            )
        case 'admin':
            return (
                <div id="courses">
                    <Sidebar />
                    <h2> All Courses </h2> 
                    <div id = "all_course_list" onLoad={AdminCourseList()}>
                    </div>
                    <input type = "button" value = "Add a course" onClick={function (){document.querySelector('#add_course').style.display = 'block'}}></input>
                    <br />
                    <form id = "add_course" style={{display:'none'}} onSubmit={function(){createCourse()}}>
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