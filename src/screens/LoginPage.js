import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../actions/user';
import Slider from 'react-slick';
import { history } from '../helper/history';
import { alertActions } from '../actions/alert';

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

    const handleForgotPasswordSubmit = (e) => {
        e.preventDefault();

        if (!email && !password) {
            dispatch(alertActions.error('Please provide email and password'));
            return;
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!email && !password) {
            dispatch(alertActions.error('Please provide email and password'));
            return;
        }

        if (!email) {
            dispatch(alertActions.error('Please provide email'));
            return;
        }
        if (!password) {
            dispatch(alertActions.error('Please provice password'));
            return;
        }

        if (email && password) {
            dispatch(
                userActions.login(
                    email,
                    password,
                    props.location.state ?
                        props.location.state.from.pathname : undefined));
        }
    }

    var settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        autoplay: false,
        dots: false,
        infinite: false,
        draggable: false,
        swipeToSlide: false
    };

    function NextArrow(props) {
        const { onClick, currentSlide } = props;
        return (
            currentSlide === 0 && (
                <div className="slider-btn" onClick={onClick}>
                    <span className="next position-top right-0 slick-arrow">
                        Forgot Your Password?
                </span>
                </div>
            )
        );
    }

    function PrevArrow(props) {
        const { onClick, currentSlide } = props;
        return (
            currentSlide === 1 && (
                < div className="slider-btn" onClick={onClick} >
                    <span className="prev position-top slick-arrow">
                        Back to Login?
                </span>
                </div >
            )
        );
    }

    const redirectToRegister = () => {
        history.push({
            pathname: '/register'
        });
    }

    return (
        <div className="main row">
            <div className="col-main-wrap">
                <div className="account-login">
                    <div className="block block-login">
                        <div className="block-slider">
                            <ul className="slides" >
                                <Slider {...settings}>
                                    <li className="flex-active-slide" >
                                        <div className="block-title">
                                            <strong><span>Sign In</span></strong>
                                        </div>
                                        <div className="block-content">
                                            <form onSubmit={handleSubmit} method="post" id="login-form">
                                                <ul className="form-list">
                                                    <li>
                                                        <label htmlFor="email" className="required">Email Address</label>
                                                        <div className="input-box">
                                                            <input type="text" name="email" onChange={handleChange}
                                                                id="email" value={email}
                                                                className="input-text required-entry validate-email"
                                                                title="Email Address" />
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="pass" className="required">Password</label>
                                                        <div className="input-box">
                                                            <input type="password" name="password" onChange={handleChange}
                                                                value={password} className="input-text required-entry validate-password"
                                                                id="pass" title="Password" />
                                                        </div>
                                                    </li>
                                                </ul>
                                                <button type="submit" className="button" title="Login" name="send"
                                                    id="send2">
                                                    {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                                    <span><span>Login</span></span></button>
                                            </form>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="block-title">
                                            <strong><span>Forgot Your Password?</span></strong>
                                        </div>
                                        <div className="block-content">
                                            <form onSubmit={handleForgotPasswordSubmit}
                                                method="post" id="form-validate">
                                                <ul className="form-list">
                                                    <li>
                                                        <label htmlFor="email" className="required">Email Address</label>
                                                        <div className="input-box">
                                                            <input type="text" name="email" alt="email"
                                                                id="email_address" value={email} onChange={handleChange}
                                                                className="input-text required-entry validate-email"
                                                            />
                                                        </div>
                                                    </li>
                                                </ul>
                                                <button type="submit" className="button" title="Submit">
                                                    <span><span>Submit</span></span>
                                                </button>
                                            </form>
                                        </div>
                                    </li>
                                </Slider>
                            </ul>
                        </div>
                        <div className="new-users">
                            <button type="button" title="Register"
                                className="button invert"
                                onClick={redirectToRegister}><span>
                                    <span>Register</span></span></button>
                        </div>
                    </div>
                </div>

            </div>
        </div>);
}

export { LoginPage };