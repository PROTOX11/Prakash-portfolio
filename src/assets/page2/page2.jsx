import React, { useRef, useEffect } from 'react';
import './page2.css';

function Page2({ setActiveTab }) {
    const aboutMeRef = useRef(null);
    const paraRef = useRef(null);
    const btnsRef = useRef(null);
    const projectCardRef = useRef(null);
    const certCardRef = useRef(null);
    const expCardRef = useRef(null);
    const projectNumRef = useRef(null);
    const certNumRef = useRef(null);
    const expNumRef = useRef(null);

    
    const useRevealOnScroll = (ref) => {
        useEffect(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                        } else {
                            entry.target.classList.remove('visible');
                        }
                    });
                },
                { threshold: 0.1 }
            );

            if (ref.current) {
                observer.observe(ref.current);
            }

            return () => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            };
        }, [ref]);
    };

    
    const animateCounter = (element, endValue, duration) => {
        let start = 0;
        const stepTime = Math.round(duration / endValue);
        const timer = setInterval(() => {
            start += 1;
            element.textContent = start;
            if (start >= endValue) {
                clearInterval(timer);
                element.textContent = endValue;
            }
        }, stepTime);
    };

    
    useRevealOnScroll(aboutMeRef);
    useRevealOnScroll(paraRef);
    useRevealOnScroll(btnsRef);
    useRevealOnScroll(projectCardRef);
    useRevealOnScroll(certCardRef);
    useRevealOnScroll(expCardRef);

    
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const numElement = entry.target.querySelector('.number');
                        const endValue = parseInt(numElement.getAttribute('data-value'), 10);
                        animateCounter(numElement, endValue, 1000); 
                    }
                });
            },
            { threshold: 0.1 }
        );

        const refs = [projectCardRef, certCardRef, expCardRef];
        refs.forEach((ref) => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            refs.forEach((ref) => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, []);

    return (
        <>
            <div className="sec_page" id="aboutw">
                <span ref={aboutMeRef} className="about-me reveal">About me</span>
                <p ref={paraRef} className="reveal">
                    Hello, I'm Prakash Kumar — a Computer Science and Engineering student passionate about crafting scalable and efficient web and mobile applications. I thrive on learning new technologies, staying current with industry trends, and continuously sharpening my development skills. I'm actively seeking opportunities to grow, collaborate, and make a meaningful impact as a developer.
                </p>
                <br />
                <div ref={btnsRef} className="aboutwala reveal">
                    <button
                        className="animated-button"
                        onClick={() => (window.location.href = 'https://drive.google.com/file/d/1TSeh5_SQCHGTEQ745XSXIVGDOBzWC6TO/view?usp=drive_link')}
                    >
                        <div className="btn-cells">
                            <span></span><span></span><span></span><span></span><span></span>
                            <span></span><span></span><span></span><span></span><span></span>
                            <span></span><span></span><span></span><span></span><span></span>
                            <span></span><span></span><span></span><span></span><span></span>
                        </div>
                        <span className="btn-content">Download CV</span>
                    </button>
                    <button
                        className="animated-button"
                        onClick={() => {
                            const section = document.getElementById("portfolio-showcase");
                            if (section) {
                                section.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                    >
                        <div className="btn-cells">
                            <span></span><span></span><span></span><span></span><span></span>
                            <span></span><span></span><span></span><span></span><span></span>
                            <span></span><span></span><span></span><span></span><span></span>
                            <span></span><span></span><span></span><span></span><span></span>
                        </div>
                        <span className="btn-content">View Projects</span>
                    </button>
                </div>
            </div>
            <div className="grid">
                <div
                    ref={projectCardRef}
                    className="card card-projects reveal"
                    onClick={() => {
                        const section = document.getElementById("portfolio-showcase");
                        if (section) {
                            section.scrollIntoView({ behavior: "smooth" });
                        }
                    }}
                >
                    <div className="card-inner">
                        <div className="card-bg"></div>
                        <div className="header">
                            <div className="icon-container">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon"
                                >
                                    <polyline points="16 18 22 12 16 6"></polyline>
                                    <polyline points="8 6 2 12 8 18"></polyline>
                                </svg>
                            </div>
                            <span
                                className="number"
                                data-value="3"
                            >
                                0
                            </span>
                        </div>
                        <div>
                            <p
                                className="title"
                            >
                                Total Projects
                            </p>
                            <div className="footer">
                                <p
                                    className="description"
                                >
                                    Innovative web & mobile solutions crafted
                                </p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="arrow-icon"
                                >
                                    <path d="M7 7h10v10"></path>
                                    <path d="M7 17 17 7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    ref={certCardRef}
                    className="card card-certificates reveal"
                    onClick={() => {
                        setActiveTab('certificates');
                        setTimeout(() => {
                            const section = document.getElementById("certificates-section");
                            if (section) section.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                    }}
                >
                    <div className="card-inner">
                        <div className="card-bg"></div>
                        <div className="header">
                            <div className="icon-container">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon"
                                >
                                    <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                                    <circle cx="12" cy="8" r="6"></circle>
                                </svg>
                            </div>
                            <span
                                className="number"
                                data-value="4"
                            >
                                0
                            </span>
                        </div>
                        <div>
                            <p
                                className="title"
                            >
                                Certificates
                            </p>
                            <div className="footer">
                                <p
                                    className="description"
                                >
                                    Professional skills validated
                                </p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="arrow-icon"
                                >
                                    <path d="M7 7h10v10"></path>
                                    <path d="M7 17 17 7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    ref={expCardRef}
                    className="card card-experience reveal"
                >
                    <div className="card-inner">
                        <div className="card-bg"></div>
                        <div className="header">
                            <div className="icon-container">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                                    <path d="M2 12h20"></path>
                                </svg>
                            </div>
                            <span
                                className="number"
                                data-value="3"
                            >
                                0
                            </span>
                        </div>
                        <div>
                            <p
                                className="title"
                            >
                                Year of Experience
                            </p>
                            <div className="footer">
                                <p
                                    className="description"
                                >
                                    Continuous learning journey
                                </p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="arrow-icon"
                                >
                                    <path d="M7 7h10v10"></path>
                                    <path d="M7 17 17 7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page2;