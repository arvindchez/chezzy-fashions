import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../actions/user';
import Slider from 'react-slick';
import { alertActions } from '../actions/alert';

function LoginPage(props) {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    let registerSlider = useRef();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

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
        initialSlide: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        autoplay: false,
        dots: false,
        infinite: false,
        draggable: false,
        swipeToSlide: false,
        adaptiveHeight: true
    };

    const gotoRegister = () => {
        registerSlider.current.slickPrev();
    }

    const gotoSignIn = () => {
        registerSlider.current.slickNext();
    }

    function NextArrow(props) {
        const { onClick, currentSlide } = props;
        return (
            currentSlide === 1 && (
                <>
                    <div className="slider-btn" onClick={onClick}>
                        <span className="next position-top-account-login right-0 slick-arrow">
                            Forgot Your Password?
                    </span>
                    </div>
                    <div className="slider-btn" onClick={gotoRegister}>
                        <span className="register position-top right-0 slick-arrow">
                            <div className="new-users">
                                <button type="button" title="Register"
                                    className="button invert">
                                    <span><span>Register</span></span></button>
                            </div>
                        </span>
                    </div>
                </>
            )
        );
    }

    function PrevArrow(props) {
        const { onClick, currentSlide } = props;
        return (
            currentSlide === 2 && (
                < div className="slider-btn" onClick={onClick} >
                    <span className="prev position-top-forgot-pwd slick-arrow">
                        Back to Login?
                </span>
                </div >
            )
        );
    }

    return (
        <div className="main row">
            <div className="col-main-wrap">
                <div className="account-login">
                    <div className="block block-login">
                        <div className="block-slider">
                            <ul className="slides" >
                                <Slider ref={registerSlider}  {...settings}>
                                    <li >
                                        <div className="customer-account-create">
                                            <div class="block-title">
                                                <strong><span>Register</span></strong>
                                            </div>
                                            <div className="block-content">
                                                <ul class="form-list">
                                                    <li>
                                                        <label for="firstname" class="required"><em>*</em>First Name</label>
                                                        <div class="input-box">
                                                            <input type="text" id="firstname" name="firstname" value="" title="First Name" maxlength="255" class="input-text required-entry" />
                                                        </div>

                                                        <label for="middlename">Middle Name/Initial</label>
                                                        <div class="input-box">
                                                            <input type="text" id="middlename" name="middlename" value="" title="Middle Name/Initial" class="input-text" />
                                                        </div>

                                                        <label for="lastname" class="required"><em>*</em>Last Name</label>
                                                        <div class="input-box">
                                                            <input type="text" id="lastname" name="lastname" value="" title="Last Name" maxlength="255"
                                                                class="input-text required-entry" />
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <label for="email_address" class="required"><em>*</em>Email Address</label>
                                                        <div class="input-box">
                                                            <input type="text" name="email" id="email_address" value=""
                                                                title="Email Address" class="input-text validate-email required-entry" />
                                                        </div>
                                                    </li>
                                                    <li class="control">
                                                        <div class="input-box">
                                                            <input type="checkbox" name="is_subscribed" title="Sign Up for Newsletter"
                                                                value="1" id="is_subscribed" class="checkbox" />
                                                        </div>
                                                        <label for="is_subscribed">Sign Up for Newsletter</label>
                                                    </li>
                                                </ul>
                                                <h2 class="legend">Login Information</h2>
                                                <ul class="form-list">
                                                    <li class="fields">
                                                        <div class="field">
                                                            <label for="password" class="required"><em>*</em>Password                                </label>

                                                            <div class="input-box">
                                                                <input type="password" name="password" id="password"
                                                                    title="Password"
                                                                    class="input-text required-entry validate-password" />
                                                            </div>
                                                        </div>
                                                        <div class="field">
                                                            <label for="confirmation" class="required"><em>*</em>Confirm Password</label>

                                                            <div class="input-box">
                                                                <input type="password" name="confirmation"
                                                                    title="Confirm Password" id="confirmation"
                                                                    class="input-text required-entry validate-cpassword" />
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <div class="buttons-set">
                                                    <p class="required">* Required Fields</p>
                                                    <button
                                                        onClick={gotoSignIn}
                                                        type="button" title="Back" class="button invert">
                                                        <span><span>← Back</span></span>
                                                    </button>
                                                    <button type="submit" title="Submit" class="button">
                                                        <span><span>Submit</span></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li >
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

                    </div>
                </div>

            </div>
        </div >);
}

export { LoginPage };