

function Sidebar(){
    var accounttype = 1;
    switch(accounttype){
        case 1:
            return (
                <div id="navigation">
                    <a href="account"><i class="glyphicon glyphicon-user"></i> My Account</a><br/>
                    <a href="dashboard"><i class="glyphicon glyphicon-dashboard"></i> Dashboard</a><br/>
                    <a href="courses"><i class="glyphicon glyphicon-list-alt"></i> Courses</a><br/>
                    <a href="login"><i class="glyphicon glyphicon-log-out"></i> Logout</a>
                </div>
            )
        case 2:
            return (
                <div id="navigation">
                    <a href="account"><i class="glyphicon glyphicon-user"></i> My Account</a><br/>
                    <a href="dashboard"><i class="glyphicon glyphicon-dashboard"></i> Dashboard</a><br/>
                    <a href="courses"><i class="glyphicon glyphicon-list-alt"></i> Courses</a><br/>
                    <a href="login"><i class="glyphicon glyphicon-log-out"></i> Logout</a>
                </div>
            )
        case 3:
            return (
                <div id="navigation">
                    <a href="account"><i class="glyphicon glyphicon-user"></i> My Account</a><br/>
                    <a href="dashboard"><i class="glyphicon glyphicon-dashboard"></i> Dashboard</a><br/>
                    <a href="courses"><i class="glyphicon glyphicon-list-alt"></i> Courses</a><br/>
                    <a href="admin_settings"><i class="glyphicon glyphicon-cog"></i> Settings</a><br/>
                    <a href="login"><i class="glyphicon glyphicon-log-out"></i> Logout</a>
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