import "./dashboard.css";

function dashboard() {
    return (
        <div className="dashboard">
        <h1>Dashboard</h1>
        <a className="overview" href="overview.html">
            <i className="fas fa-chart-pie fa-fw"></i>
            <span>Overview</span>
        </a>
        <a className="village-management" href="village-management.html">
            <i className="fas fa-cogs fa-fw"></i>
            <span>Village Management</span>
        </a>
        <a className="chat" href="chat.html">
            <i className="fas fa-comments fa-fw"></i>
            <span>Chat</span>
        </a>
        <a className="gallery" href="gallery.html">
            <i className="fas fa-images fa-fw"></i>
            <span>Gallery</span>
        </a>
     </div>
    );
}


export default dashboard;