import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Fade from "react-reveal/Fade";
import { userActions } from '../actions/user';

function RegisterPage() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    });

    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(userActions.register(user));
    }

    return (
        <div>
            <Fade right cascade>
                <div>
                    <h3>Register</h3>
                </div>
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
                            <label>Password:</label>
                            <input
                                name="password"
                                type="password"
                                required
                                placeholder="Your password"
                                onChange={handleChange}
                            ></input>
                        </li>
                        <li>
                            <label>Phone Number:</label>
                            <input
                                name="phone"
                                type="text"
                                required
                                placeholder="Your phone number"
                                onChange={handleChange}
                            ></input>
                        </li>
                        <li>
                            <label>Address:</label>
                            <input
                                name="address"
                                type="text"
                                required
                                placeholder="Your address"
                                onChange={handleChange}
                            ></input>
                        </li>
                        <li>
                            <div>
                                <button type="submit">
                                    {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Register
                                </button>
                                <div>
                                    <p>Nevermind...?</p>
                                    <Link to="/login">Cancel</Link>
                                </div>
                            </div>
                        </li>
                    </ul>
                </form>
            </Fade>
        </div>
    );
}

export { RegisterPage };