import Sidebar from "./sidebar";


function Dashboard(){
    var accounttype = 1;
    switch(accounttype){
        case 1:
            return (
            <div>
                <Sidebar />
            </div>
        )
        case 2:
            return (
            <div>
                <Sidebar />
            </div>
        )
        case 3:
            return (
            <div>
                <Sidebar />
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