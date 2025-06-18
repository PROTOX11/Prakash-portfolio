import './navbar.css';

function Navbar() {
    return (
        <div>
            <div className="navbar-container">
                <a className="navbar-link" href="#">About</a>
                <a className="navbar-link" href="#">Project</a>
                <a className="navbar-link" href="#">Skills</a>
                <a className="navbar-link" href="#">Contact</a>
            </div>
        </div>
    );
}

export default Navbar;