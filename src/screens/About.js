import React from 'react'
import logo from '../images/mail-icon.png';

const About = () => {
    return (
        <div className="aboutus">
            <a href="mailto:noemi.vida93@gmail.com" >
                <img src={logo} alt="mailto" />
            </a>
        </div>
    )
}

export default About
