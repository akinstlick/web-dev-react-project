

function Sidebar(accounttype){
    accounttype = 1;
    switch(accounttype){
        case 1:
            return (
                <div id="navigation">
                    <a href="myaccount.html">My Account</a><br/>
                    <a href="student_dashboard.html">Dashboard</a><br/>
                    <a href="student_teacher_courses.html">Courses</a><br/>
                    <a href="login.html">Logout</a>
                </div>
            )
        case 2:
            return (
                <div id="navigation">
                    <a href="myaccount.html">My Account</a><br/>
                    <a href="teacher_dashboard.html">Dashboard</a><br/>
                    <a href="student_teacher_courses.html">Courses</a><br/>
                    <a href="login.html">Logout</a>
                </div>
            )
        case 3:
            return (
                <div id="navigation">
                    <a href="myaccount.html">My Account</a><br/>
                    <a href="admin_dashboard.html">Dashboard</a><br/>
                    <a href="courses.html">Courses</a><br/>
                    <a href="admin_settings.html">Settings</a><br/>
                    <a href="login.html">Logout</a>
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