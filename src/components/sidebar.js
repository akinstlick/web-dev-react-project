

function Sidebar(){
    var accounttype = 1;
    switch(accounttype){
        case 1:
            return (
                <div id="navigation">
                    <a href="account">My Account</a><br/>
                    <a href="dashboard">Dashboard</a><br/>
                    <a href="courses">Courses</a><br/>
                    <a href="login">Logout</a>
                </div>
            )
        case 2:
            return (
                <div id="navigation">
                    <a href="account">My Account</a><br/>
                    <a href="dashboard">Dashboard</a><br/>
                    <a href="courses">Courses</a><br/>
                    <a href="login">Logout</a>
                </div>
            )
        case 3:
            return (
                <div id="navigation">
                    <a href="account">My Account</a><br/>
                    <a href="dashboard">Dashboard</a><br/>
                    <a href="courses">Courses</a><br/>
                    <a href="admin_settings">Settings</a><br/>
                    <a href="login">Logout</a>
                </div>
            )
        default:
            return (
                <div>
                    <h1>Error: Dashboard var not found</h1>
                </div>
            )
    }
}

export default Sidebar