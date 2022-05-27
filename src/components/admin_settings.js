import { useEffect } from "react"
import { getAllUsers, UserList } from "../admin_functions"
import Sidebar from "./sidebar"

function AdminSettings(){
    useEffect(() => {
        UserList();
    });
    return (
        <div id="adminsettings">
            <h1>Admin Settings</h1>
            <Sidebar />
            <div id="searchbar">
                <input type="search"></input>
            </div>
            <div id="userlist" style={{display:"flex",justifyContent:"center"}}>
            </div>
        </div>
    )
}

export default AdminSettings