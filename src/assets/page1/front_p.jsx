import { useRef } from 'react';
import './Front_p.css';
import './circles.css';
import '../page1/middlepart/middlepart';
import starline from '../images/stars/starline.png';
import line from '../images/stars/line.png';
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { handleEmailClick } from "../Connect";

function Front_p() {
    const skillRefs = useRef([]);
    const handleLinkClick = (e) => {
        e.preventDefault();
        handleEmailClick();
    };

    const images = [
        { src: starline, rotation: 90 },
        { src: line, rotation: 120 },
        { src: starline, rotation: 60 },
        { src: line, rotation: 30 },
        { src: starline, rotation: 150 },
    ];

    return (
        <div>
            <h1>Prakash kumar</h1>
            <div className="front-p-container" style={{ position: 'relative', minHeight: '30vh' }}>
                <div className="circles">
                    <div className="bigCircles">
                        {Array.from({ length: 8 }).map((_, bigIndex) => (
                            <div key={bigIndex} className="bigDots">
                                {Array.from({ length: 12 }).map((_, dotIndex) => (
                                    <div key={dotIndex} className="dot"></div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="smallCircles">
                        {Array.from({ length: 8 }).map((_, smallIndex) => (
                            <div key={smallIndex} className="smallDots">
                                {Array.from({ length: 12 }).map((_, dotIndex) => (
                                    <div key={dotIndex} className="dot"></div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="star-container">
                    {images.map((item, index) => (
                        <img
                            key={index}
                            src={item.src}
                            alt="star animation"
                            className={`animated-star animated-star-${index + 1}`}
                            style={{ transform: `rotate(${item.rotation}deg)` }}
                        />
                    ))}
                </div>
                <div className='uparwala'>
                    <div className='front-ptop-circles-container' style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div className='front-ptop'>
                            <span className='t1'>Full Stack</span>
                            <span className='t2'>Developer</span>
                        </div>
                    </div>
                    <div className='skill_set'>
                        <span className='skill-item no-animation'>Spring</span>
                        <span className='skill-item no-animation'>Java</span>
                        <span className='skill-item no-animation'>MERN</span>
                        <span className='skill-item no-animation'>SQL</span>
                        <span className='skill-item'>Other Skill</span>
                    </div>
                    <div className='front-pro'>
                        <span className='t3' onClick={() => {
                            const section = document.getElementById("portfolio-showcase");
                            if (section) {
                                section.scrollIntoView({ behavior: "smooth" });
                            }
                        }}>Projects</span>
                        <span className='t4' onClick={() => {
                            const section = document.getElementById("last_page");
                            if (section) {
                                section.scrollIntoView({ behavior: "smooth" });
                            }
                        }}>Contact</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Front_p;