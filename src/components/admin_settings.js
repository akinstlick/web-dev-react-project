import { useEffect } from "react"
import { getAllUsers, searchBar, searchBarByString, UserList } from "../admin_functions"
import Sidebar from "./sidebar"

function AdminSettings(){
    useEffect(() => {
        UserList();
    });
    return (
        <div id="adminsettings">
            <h1>Admin Settings</h1>
            <Sidebar />
            <div id="searchdiv">
                <h3>Search      </h3> <br/>
                <input id="searchbar" type="search" onChange={function(){searchBar()}}></input>
                <button onClick={function(){searchBarByString('active: 0')}}>Filter by active=0</button>
                <button onClick={function(){searchBarByString('active: 1')}}>Filter by active=1</button>
                <button onClick={function(){searchBarByString('')}}>Remove Filters</button>
            </div>
            <div id="userlist" style={{display:"flex",justifyContent:"center"}}>
            </div>
        </div>
    )
}

export default AdminSettings