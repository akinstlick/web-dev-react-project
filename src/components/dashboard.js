import { useEffect } from "react";
import { getUserType, populateAdminDash } from "../admin_functions";
import Sidebar from "./sidebar";
import { pastAssignmentList } from "../assignments_functions";


function Dashboard(){
    useEffect(() => {
        getUserType();
        populateAdminDash();
    });
    var accounttype = localStorage.getItem('account_type');
    switch(accounttype){
        case "student":
            return (
            <div id="dashboard">
                <Sidebar />
                student
            </div>
        )
        case "teacher":
            return (
            <div id="dashboard">
                <Sidebar />
                <div id="teacherdashboard" onLoad={pastAssignmentList()}></div>
            </div>
        )
        case "admin":
            return (
            <div id="dashboard">
                <Sidebar />
                <div id="admindashboard">
                    <div id="numstudents"></div>
                    <div id="numcourses"></div>
                    <div id="numteachers"></div>
                </div>
            </div>
        )
        default:
            return (
                <div>
                    <h1>Error: Dashboard not found</h1>
                </div>
            )
    }
}

export default Dashboard