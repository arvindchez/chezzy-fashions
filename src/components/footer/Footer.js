/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const Footer = () => {
    return (
        <div className="main-footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h4>Contact Us</h4>
                        <p>214 Main, Street</p>
                        <p>Chennai, India</p>
                        <p>+91 - 3491271144</p>
                        <a href="mailto:arvind.chez@gmail.com"> <p>arvind.chez@gmail.com</p> </a>
                    </div>
                    <div className="col-md-3">
                        <h4>Quick Links</h4>
                        <p><a href="/">Home</a></p>
                        <p><a href="/product">Gallery</a></p>
                        <p><a href="/contactus">Contact Us</a></p>
                        <p><a href="#">About Us</a></p>
                    </div>
                    <div className="col-md-3">
                        <h4>Social Media</h4>
                        <div className="social-media">
                            <ul className="list-unstyled">
                                <li><a href="https://www.facebook.com"><i className="fab fa-facebook"></i></a></li>
                                <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="https://www.instagram.com"><i className="fab fa-instagram"></i></a></li>
                                <li><a href="#"><i className="fab fa-google-plus-g"></i></a></li>
                                <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 subscribe">
                        <h4>Subscribe Our News Letter</h4>
                        <input type="text" name="subscribe" placeholder="Enter your email" />
                        <span className="next position-top right-0 slick-arrow">
                            <i className="fas fa-chevron-right fa-2x"></i>
                        </span>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p className="text-xs-center text-center">
                        &copy;{new Date().getFullYear()} Chezzy e-Shop - All Rights Reserved
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer
