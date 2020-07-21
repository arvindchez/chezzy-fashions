import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Fade from "react-reveal/Fade";

import { userActions } from '../actions/user';

function LoginPage(props) {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const { email, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (email && password) {
            dispatch(
                userActions.login(
                    email,
                    password,
                    props.location.state ?
                        props.location.state.from.pathname : undefined));
        }
    }

    return (
        <div>
            <Fade right cascade>
                <form onSubmit={handleSubmit}>
                    <ul className="login-form">
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
                            <div>
                                <button type="submit">
                                    {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Login
                                </button>
                                <div>
                                    <p>No account yet?</p>
                                    <Link to="/register">Register</Link>
                                </div>
                            </div>
                        </li>
                    </ul>
                </form>
            </Fade>
        </div>
    );
}

export { LoginPage };