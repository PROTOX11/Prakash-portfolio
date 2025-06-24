import React, { useEffect, useRef } from 'react';
import './page4.css';
import { handleEmailClick } from "../Connect";

function Page4() {
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    useEffect(() => {
        const leftEl = leftRef.current;
        const rightEl = rightRef.current;

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('slide-in-visible');
                    } else {
                        entry.target.classList.remove('slide-in-visible');
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (leftEl) observer.observe(leftEl);
        if (rightEl) observer.observe(rightEl);

        
        return () => {
            if (leftEl) observer.unobserve(leftEl);
            if (rightEl) observer.unobserve(rightEl);
        };
    }, []);

    const handleLinkClick = (e) => {
        e.preventDefault(); 
        handleEmailClick();
    };

    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "127d052a-0403-4746-a5a1-c0ab5ea44e85");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    return (
        <div className="page4-container" id="last_page">
            <h1 className="page4-title">Contact Me</h1>
            <p className="page4-subtitle">
                Got a question? Send me a message, and I'll get back to you soon.
            </p>

            <div className="contact-wrapper">
                <div
                    className="contact-form-section slide-in-left"
                    ref={leftRef}
                >
                    <h2 className="section-title">Get in Touch</h2>
                    <p className="section-subtitle">
                        Have something to discuss? Send me a message and let's talk.
                    </p>
                    <form
                        className="contact-form"
                        onSubmit={onSubmit}
                        method='POST'
                    >
                        <label htmlFor="name" className="sr-only">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your Name"
                            className="input-field"
                            required
                        />

                        <label htmlFor="email" className="sr-only">
                            Your Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your Email"
                            className="input-field"
                            required
                        />

                        <label htmlFor="message" className="sr-only">
                            Your Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Your Message"
                            className="textarea-field"
                            required
                        />

                        <button type="submit" className="send-button">
                            <span className="send-icon" aria-hidden="true">
                                ✈️
                            </span>{' '}
                            Send Message
                        </button>
                    </form>
                </div>

                <div className="connect-section slide-in-right" ref={rightRef}>
                    <h3 className="connect-title">Connect With Me</h3>
                    <ul className="connect-list">
                        <li className="connect-item">
                            <a
                                href="https://www.linkedin.com/in/prakash-kumar21/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="connect-link linkedin"
                            >
                                <span className="connect-icon" aria-hidden="true">
                                    in
                                </span>{' '}
                                Let's Connect on LinkedIn
                            </a>
                        </li>
                        <li className="connect-item" onClick={handleLinkClick} rel="noopener noreferrer">
                            <a
                                target="_blank"
                                className="connect-link instagram"
                            >
                                <span className="connect-icon" aria-hidden="true">
                                    💌
                                </span>{' '}
                                Email prakashkr2894@gmail.com
                            </a>
                        </li>
                        <li className="connect-item">
                            <a
                                href="https://github.com/PROTOX11"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="connect-link github"
                            >
                                <span className="connect-icon" aria-hidden="true">
                                    🐱
                                </span>{' '}
                                Github @PROTOX11
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Page4;