

function Sidebar(){
    var accounttype = 1;
    switch(accounttype){
        case 1:
            return (
                <div id="navigation">
                    <a href="account"><i className="glyphicon glyphicon-user"></i> My Account</a><br/>
                    <a href="dashboard"><i className="glyphicon glyphicon-dashboard"></i> Dashboard</a><br/>
                    <a href="courses"><i className="glyphicon glyphicon-list-alt"></i> Courses</a><br/>
                    <a href="/"><i className="glyphicon glyphicon-log-out"></i> Logout</a>
                </div>
            )
        case 2:
            return (
                <div id="navigation">
                    <a href="account"><i className="glyphicon glyphicon-user"></i> My Account</a><br/>
                    <a href="dashboard"><i className="glyphicon glyphicon-dashboard"></i> Dashboard</a><br/>
                    <a href="courses"><i className="glyphicon glyphicon-list-alt"></i> Courses</a><br/>
                    <a href="/"><i className="glyphicon glyphicon-log-out"></i> Logout</a>
                </div>
            )
        case 3:
            return (
                <div id="navigation">
                    <a href="account"><i className="glyphicon glyphicon-user"></i> My Account</a><br/>
                    <a href="dashboard"><i className="glyphicon glyphicon-dashboard"></i> Dashboard</a><br/>
                    <a href="courses"><i className="glyphicon glyphicon-list-alt"></i> Courses</a><br/>
                    <a href="admin_settings"><i className="glyphicon glyphicon-cog"></i> Settings</a><br/>
                    <a href="/"><i className="glyphicon glyphicon-log-out"></i> Logout</a>
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