import React from 'react'
import logo from '../images/mail-icon.png';

const About = () => {
    return (
        <div className="aboutus">
            <a href="mailto:arvind.chez@gmail.com" >
                <img src={logo} alt="mailto" />
            </a>
        </div>
    )
}

export default About
