import { useRef } from 'react';
import './Front_p.css';
import starline from '../images/stars/starline.png';
import line from '../images/stars/line.png';

function Front_p() {
    const skillRefs = useRef([]);

    // Define images with their rotation degrees
    const images = [
        { src: starline, rotation: 90 },
        { src: line, rotation: 120 },
        { src: starline, rotation: 60 },
        { src: line, rotation: 30 },
        { src: starline, rotation: 150 },
    ];

    return (
        <>
            <div className="star-container">
                {images.map((item, index) => (
                    <img
                        key={index}
                        src={item.src}
                        alt="star animation"
                        className={`animated-star animated-star-${index + 1}`}
                        style={{ transform: `rotate(${item.rotation}deg)` }} // Apply rotation inline
                    />
                ))}
            </div>
            <div className='front-ptop'>
                <span className='t1'>Full Stack</span>
                <span className='t2'>Developer</span>
            </div>
            <div className='skill_set'>
                <span className='skill-item no-animation'>Spring</span>
                <span className='skill-item no-animation'>Java</span>
                <span className='skill-item no-animation'>MERN</span>
                <span className='skill-item no-animation'>SQL</span>
                <span className='skill-item'>Other Skill</span>
            </div>
            <div className='front-pro'>
                <span className='t3'>Projects</span>
                <span className='t4'>Contact</span>
            </div>
        </>
    );
}

export default Front_p;