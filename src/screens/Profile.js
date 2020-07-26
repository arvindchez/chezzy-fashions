import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Fade from "react-reveal/Fade";
import { userActions } from '../actions/user';

function Profile() {
    const currentUser = useSelector(state => state.authentication.user);
    const [user, setUser] = useState(currentUser);

    const dispatch = useDispatch();

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(userActions.update(user));
    }

    return (
        <div>
            <Fade right cascade>
                <form onSubmit={handleSubmit}>
                    <ul className="register-form">
                        <li>
                            <label>First Name:</label>
                            <input
                                name="firstName"
                                value={user.firstName}
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
                                value={user.lastName}
                                required
                                placeholder="Your last name"
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
                                value={user.phone}
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
                                value={user.address}
                                required
                                placeholder="Your address"
                                onChange={handleChange}
                            ></input>
                        </li>
                        <li>
                            <div>
                                <button type="submit">
                                    Update
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

export default Profile
