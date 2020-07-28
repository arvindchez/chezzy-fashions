import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Fade from "react-reveal/Fade";
import { userActions } from '../../actions/user';
import Title from '../title/Title';

function ContactUs() {
    const [post, setPost] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });

    const dispatch = useDispatch();

    function handleChange(e) {
        const { name, value } = e.target;
        setPost(post => ({ ...post, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(userActions.contactUs(post));
    }

    return (
        <div>
            <Fade right cascade>
                <Title title={"Let's get in touch"} />
                <form onSubmit={handleSubmit}>
                    <ul className="register-form">
                        <li>
                            <label>First Name:</label>
                            <input
                                name="firstName"
                                type="text"
                                required
                                placeholder="Your first name"
                                onChange={handleChange}
                            ></input>
                        </li>
                        <li>
                            <label>Last Name:</label>
                            <input
                                name="lastName"
                                type="text"
                                required
                                placeholder="Your last name"
                                onChange={handleChange}
                            ></input>
                        </li>
                        <li>
                            <label>Email:</label>
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="Your email"
                                onChange={handleChange}
                            ></input>
                        </li>
                        <li>
                            <label>Subject:</label>
                            <input
                                name="subject"
                                type="text"
                                required
                                placeholder="Subject"
                                onChange={handleChange}
                            ></input>
                        </li>
                        <li>
                            <label>Message:</label>
                            <textarea maxlength="100" rows="4" cols="50"
                                name="message"
                                required
                                placeholder="Message..."
                                onChange={handleChange}
                            />
                        </li>
                        <li>
                            <div>
                                <button className="btn btn-sm" type="submit">
                                    Send
                                </button>
                            </div>
                        </li>
                    </ul>
                </form>
            </Fade>
        </div>
    );
}

export default ContactUs