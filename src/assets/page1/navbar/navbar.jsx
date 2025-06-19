import './navbar.css';

function Navbar({ setActiveTab }) {
    return (
        <div>
            <div className="navbar-container">
                <a className="navbar-link" onClick={() => {
                    const section = document.getElementById("aboutw");
                    if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                    }
                }}>About</a>
                <a className="navbar-link" onClick={() => {
                    const section = document.getElementById("portfolio-showcase");
                    if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                    }
                }}>Project</a>
                <a className="navbar-link" onClick={() => {
                    setActiveTab('techstack');
                    setTimeout(() => {
                        const section = document.getElementById("techstack-section");
                        if (section) section.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                }}>Skills</a>
                <a className="navbar-link" onClick={() => {
                    const section = document.getElementById("last_page");
                    if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                    }
                }}>Contact</a>
            </div>
        </div>
    );
}

export default Navbar;