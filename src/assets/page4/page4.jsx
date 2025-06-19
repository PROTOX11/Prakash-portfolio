import React from 'react';
import './page4.css';

function Page4() {
    return (
        <div className="page4-container">
            <h1 className="page4-title">Contact Me</h1>
            <p className="page4-subtitle">Got a question? Send me a message, and I'll get back to you soon.</p>

            <div className="contact-wrapper">
                <div className="contact-form-section">
                    <h2 className="section-title">Get in Touch</h2>
                    <p className="section-subtitle">Have something to discuss? Send me a message and let's talk.</p>
                    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="name" className="sr-only">Your Name</label>
                        <input type="text" id="name" name="name" placeholder="Your Name" className="input-field" required />

                        <label htmlFor="email" className="sr-only">Your Email</label>
                        <input type="email" id="email" name="email" placeholder="Your Email" className="input-field" required />

                        <label htmlFor="message" className="sr-only">Your Message</label>
                        <textarea id="message" name="message" placeholder="Your Message" className="textarea-field" required />

                        <button type="submit" className="send-button">
                            <span className="send-icon" aria-hidden="true">✈️</span> Send Message
                        </button>
                    </form>
                </div>

                <div className="connect-section">
                    <h3 className="connect-title">Connect With Me</h3>
                    <ul className="connect-list">
                        <li className="connect-item">
                            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="connect-link linkedin">
                                <span className="connect-icon" aria-hidden="true">in</span> Let's Connect on LinkedIn
                            </a>
                        </li>
                        <li className="connect-item">
                            <a href="https://instagram.com/alright.abhi" target="_blank" rel="noopener noreferrer" className="connect-link instagram">
                                <span className="connect-icon" aria-hidden="true">📷</span> Instagram @alright.abhi
                            </a>
                        </li>
                        <li className="connect-item">
                            <a href="https://github.com/AbhishekGanvir" target="_blank" rel="noopener noreferrer" className="connect-link github">
                                <span className="connect-icon" aria-hidden="true">🐱</span> Github @AbhishekGanvir
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Page4;
