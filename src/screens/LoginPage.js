import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Fade from "react-reveal/Fade";

import { userActions } from '../actions/user';
import Title from '../components/title/Title';

function LoginPage(props) {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const { email, password } = inputs;
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
            <div class="account-login">
                <div class="block block-login">
                    <div class="block-slider">
                        <ul class="slides" >
                            <li class="flex-active-slide" >
                                <div class="block-title">
                                    <strong><span>Sign In</span></strong>
                                </div>
                                <div class="block-content">
                                    <form
                                        method="post" id="login-form">
                                        <input name="form_key" type="hidden" value="oUPrg1iHbSYKnQQE" />
                                        <ul class="form-list">
                                            <li>
                                                <label for="email" class="required">Email Address</label>
                                                <div class="input-box">
                                                    <input type="text" name="login[username]" value=""
                                                        id="email"
                                                        class="input-text required-entry validate-email"
                                                        title="Email Address" />
                                                </div>
                                            </li>
                                            <li>
                                                <label for="pass" class="required">Password</label>
                                                <div class="input-box">
                                                    <input type="password" name="login[password]"
                                                        class="input-text required-entry validate-password"
                                                        id="pass" title="Password" />
                                                </div>
                                            </li>
                                        </ul>



                                        <button type="submit" class="button" title="Login" name="send"
                                            id="send2"><span><span>Login</span></span></button>
                                        <a href="https://shopper.olegnax.com/customer/account/forgotpassword/"
                                            class="forgot-password"
                                            id="forgot-password">Forgot Your Password?</a>

                                    </form>
                                </div>
                            </li>
                            <li>
                                <div class="block-title">
                                    <strong><span>Forgot Your Password?</span></strong>
                                </div>
                                <div class="block-content">
                                    <form action="https://shopper.olegnax.com/customer/account/forgotpasswordpost/"
                                        method="post" id="form-validate">
                                        <ul class="form-list">
                                            <li>
                                                <label for="email" class="required">Email Address</label>
                                                <div class="input-box">
                                                    <input type="text" name="email" alt="email"
                                                        id="email_address" class="input-text required-entry validate-email"
                                                        value="" />
                                                </div>
                                            </li>
                                        </ul>
                                        <button type="submit" class="button" title="Submit"><span><span>Submit</span></span>
                                        </button>
                                        <a href="https://shopper.olegnax.com/customer/account/forgotpassword/"
                                            class="forgot-password" id="back-login">Back to Login?</a>
                                    </form>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="new-users">
                        <button type="button" title="Register"
                            class="button invert"
                            onclick="window.location='https://shopper.olegnax.com/customer/account/create/';"><span>
                                <span>Register</span></span></button>
                    </div>
                </div>
            </div>






            <Fade right cascade>
                <Title title={"Login"} />
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
                                <button className="btn btn-sm" type="submit">
                                    {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Login
                                </button>
                                <div>
                                    No account yet? <Link to="/register">Register</Link>
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