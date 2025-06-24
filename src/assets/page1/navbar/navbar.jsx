import React, { useEffect, useRef } from 'react';
import './navbar.css';

function Navbar({ setActiveTab }) {
    const navbarRef = useRef(null);

    useEffect(() => {
        const navbar = navbarRef.current;
        if (!navbar) return;


        const scrollTimeout = setTimeout(() => {

            navbar.scrollTo({
                left: navbar.scrollWidth - navbar.clientWidth,
                behavior: 'smooth',
            });


            setTimeout(() => {
                navbar.scrollTo({
                    left: 0,
                    behavior: 'smooth',
                });
            }, 1500);
        }, 3500);


        return () => clearTimeout(scrollTimeout);
    }, []);

    return (
        <div>
            <div className="navbar-container" ref={navbarRef}>
                <a
                    className="navbar-link"
                    onClick={() => {
                        const section = document.getElementById("aboutw");
                        if (section) {
                            section.scrollIntoView({ behavior: "smooth" });
                        }
                    }}
                >
                    About
                </a>
                <a
                    className="navbar-link"
                    onClick={() => {
                        const section = document.getElementById("portfolio-showcase");
                        if (section) {
                            section.scrollIntoView({ behavior: "smooth" });
                        }
                    }}
                >
                    Project
                </a>
                <a
                    className="navbar-link"
                    onClick={() => {
                        setActiveTab('techstack');
                        setTimeout(() => {
                            const section = document.getElementById("techstack-section");
                            if (section) section.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                    }}
                >
                    Skills
                </a>
                <a
                    className="navbar-link"
                    onClick={() => {
                        const section = document.getElementById("last_page");
                        if (section) {
                            section.scrollIntoView({ behavior: "smooth" });
                        }
                    }}
                >
                    Contact
                </a>
            </div>
        </div>
    );
}

export default Navbar;