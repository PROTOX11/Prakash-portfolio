import "./page2.css";
import { useRevealOnScroll } from "../page2/useRevealOnScroll"

function page2({ setActiveTab }) {
    const aboutMeRef = useRevealOnScroll();
    const paraRef = useRevealOnScroll();
    const btnsRef = useRevealOnScroll();

    return (
        <>
            <div className="sec_page" id="aboutw">
                <span ref={aboutMeRef} className="about-me reveal">About me</span>
                <p ref={paraRef} className="reveal" >Hello, I'm Prakash Kumar — a Computer Science and Engineering student passionate about crafting scalable and efficient web and mobile applications. I thrive on learning new technologies, staying current with industry trends, and continuously sharpening my development skills. I'm actively seeking opportunities to grow, collaborate, and make a meaningful impact as a developer.</p>
                <br></br>
                <div ref={btnsRef} className="aboutwala">
                    <button className="animated-button" onClick={() => (window.location.href = 'https://drive.google.com/file/d/1cJrBD3UB3exmQGcG6REGQ-Ih2oYtgbd4/view?usp=drive_link')} >
                        <div className="btn-cells" >
                            <span></span><span></span><span></span><span></span><span></span>
                            <span></span><span></span><span></span><span></span><span></span>
                            <span></span><span></span><span></span><span></span><span></span>
                            <span></span><span></span><span></span><span></span><span></span>
                        </div>
                        <span className="btn-content">Download CV</span>
                    </button>
                    <button className="animated-button" onClick={() => {
                        const section = document.getElementById("portfolio-showcase");
                        if (section) {
                            section.scrollIntoView({ behavior: "smooth" });
                        }
                    }}>
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
                <div data-aos="fade-right" data-aos-duration="1300" className="card" onClick={() => {
                    const section = document.getElementById("portfolio-showcase");
                    if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                    }
                }}>
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
                                data-aos="fade-up-left"
                                data-aos-duration="1500"
                                data-aos-anchor-placement="top-bottom"
                            >
                                3
                            </span>
                        </div>
                        <div>
                            <p
                                className="title"
                                data-aos="fade-up"
                                data-aos-duration="800"
                                data-aos-anchor-placement="top-bottom"
                            >
                                Total Projects
                            </p>
                            <div className="footer">
                                <p
                                    className="description"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-anchor-placement="top-bottom"
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

                <div data-aos="fade-up" data-aos-duration="1300" className="card" onClick={() => {
                    setActiveTab('certificates');
                    setTimeout(() => {
                        const section = document.getElementById("certificates-section");
                        if (section) section.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                }}>
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
                                data-aos="fade-up-left"
                                data-aos-duration="1500"
                                data-aos-anchor-placement="top-bottom"
                            >
                                4
                            </span>
                        </div>
                        <div>
                            <p
                                className="title"
                                data-aos="fade-up"
                                data-aos-duration="800"
                                data-aos-anchor-placement="top-bottom"
                            >
                                Certificates
                            </p>
                            <div className="footer">
                                <p
                                    className="description"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-anchor-placement="top-bottom"
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

                <div data-aos="fade-left" data-aos-duration="1300" className="card">
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
                                data-aos="fade-up-left"
                                data-aos-duration="1500"
                                data-aos-anchor-placement="top-bottom"
                            >
                                1
                            </span>
                        </div>
                        <div>
                            <p
                                className="title"
                                data-aos="fade-up"
                                data-aos-duration="800"
                                data-aos-anchor-placement="top-bottom"
                            >
                                Years of Experience
                            </p>
                            <div className="footer">
                                <p
                                    className="description"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-anchor-placement="top-bottom"
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

export default page2;