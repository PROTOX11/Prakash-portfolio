import "./middlepart.css"
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Front_p() {
    return (
        <>
        <div className="social-btns-container">
            <a className="social-btn github" href="https://github.com/" target="_blank" rel="noopener noreferrer">
                <FaGithub className="icon" />
            </a>
            <a className="social-btn linkedin" href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="icon" />
            </a>
            <a className="social-btn gmail" href="mailto:your.email@gmail.com">
                <FaEnvelope className="icon" />
            </a>
        </div>
        </>
    );
}

export default Front_p;