import React from 'react'
import logo from '../images/mail-icon.png';

const About = () => {
    return (
        <div className="banner">
            <h4>Contact Us</h4>
            <p>For any inquiries please contact :</p>
            <a href="mailto:arvind.chez@gmail.com" >
                <img border="0" src={logo} width="100" height="60" alt="" />
            </a>
        </div>
    )
}

export default About
