import { useEffect } from "react";
import { getUserType } from "../admin_functions";
import Sidebar from "./sidebar";


function Dashboard(){
    useEffect(() => {
        getUserType();
    });
    var accounttype = localStorage.getItem('account_type');
    switch(accounttype){
        case "student":
            return (
            <div>
                <Sidebar />
                student
            </div>
        )
        case "teacher":
            return (
            <div>
                <Sidebar />
                teacher
            </div>
        )
        case "admin":
            return (
            <div>
                <Sidebar />
                admin
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