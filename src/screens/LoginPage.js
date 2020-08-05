import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../actions/user';
import Slider from 'react-slick';
import SimpleReactValidator from 'simple-react-validator';
import useForceUpdate from 'use-force-update';

const LoginPage = (props) => {
    const [inputs, setInputs] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        lEmail: '',
        lPassword: '',
        fEmail: '',
        news: false
    });

    let registerSlider = useRef();
    const forceUpdate = useForceUpdate();
    const [validator, setValidator] = useState(new SimpleReactValidator());
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    const {
        firstName,
        middleName,
        lastName,
        email,
        password,
        confirmPassword,
        lEmail,
        lPassword,
        fEmail,
        news
    } = inputs;

    const handleChange = (e) => {
        let { name, value, checked } = e.target;
        if (e.target.type === 'checkbox') {
            value = checked ? true : false;
        }

        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const clearInputs = () => {
        setInputs({
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            lEmail: '',
            lPassword: '',
            fEmail: '',
            news: false
        });
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if (validator.fieldValid('First Name') &&
            validator.fieldValid('Last Name') &&
            validator.fieldValid('Middle Name/Initial') &&
            validator.fieldValid('Email') &&
            validator.fieldValid('Password') &&
            validator.fieldValid('Confirm Password')) {

            console.log(inputs)
            dispatch(userActions.register(inputs));
        } else {
            validator.showMessages();
            forceUpdate();
        }
    }

    const handleForgotPasswordSubmit = (e) => {
        e.preventDefault();

        if (validator.fieldValid('email')) {
            dispatch(userActions.forgotPassword(fEmail));
        } else {
            validator.showMessages();
            forceUpdate();
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validator.fieldValid('Login Email') && validator.fieldValid('Login Password')) {
            dispatch(
                userActions.login(
                    lEmail,
                    lPassword,
                    props.location.state ?
                        props.location.state.from.pathname : undefined));
        } else {
            validator.showMessages();
            forceUpdate();
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
        clearInputs();
        registerSlider.current.slickPrev();
    }

    const gotoSignIn = () => {
        clearInputs();
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
                                            <div className="block-title">
                                                <strong><span>Register</span></strong>
                                            </div>
                                            <div className="block-content">
                                                <form onSubmit={handleRegister} method="post" id="register-form">
                                                    <ul className="form-list">
                                                        <li>
                                                            <label htmlFor="firstname" className="required"><em>*</em>First Name</label>
                                                            <div className="input-box">
                                                                <input type="text" name="firstName" value={firstName} onChange={handleChange}
                                                                    title="First Name" className="input-text" />
                                                                {validator.message('First Name', firstName, 'required|alpha|max:50', { className: 'text-danger' })}
                                                            </div>

                                                            <label htmlFor="middlename">Middle Name/Initial</label>
                                                            <div className="input-box">
                                                                <input type="text" onChange={handleChange} name="middleName" value={middleName}
                                                                    title="Middle Name/Initial" className="input-text" />
                                                                {validator.message('Middle Name/Initial', middleName, 'alpha|max:50', { className: 'text-danger' })}
                                                            </div>

                                                            <label htmlFor="lastname" className="required"><em>*</em>Last Name</label>
                                                            <div className="input-box">
                                                                <input type="text" name="lastName"
                                                                    onChange={handleChange} value={lastName} title="Last Name"
                                                                    className="input-text" />
                                                                {validator.message('Last Name', lastName, 'required|alpha|max:50', { className: 'text-danger' })}
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <label htmlFor="email" className="required"><em>*</em>Email Address</label>
                                                            <div className="input-box">
                                                                <input type="email" name="email" value={email} onChange={handleChange}
                                                                    title="Email Address" className="input-text" />
                                                                {validator.message('Email', email, 'required|email', { className: 'text-danger' })}
                                                            </div>
                                                        </li>
                                                        <li className="control">
                                                            <div className="input-box">
                                                                <input type="checkbox" name="news" title="Sign Up for Newsletter"
                                                                    checked={news}
                                                                    onChange={handleChange}
                                                                    id="news" className="checkbox" />
                                                                <label htmlFor="news">Sign Up for Newsletter</label>
                                                            </div>

                                                        </li>
                                                    </ul>
                                                    <h2 className="legend">Login Information</h2>
                                                    <ul className="form-list">
                                                        <li className="fields">
                                                            <div className="field">
                                                                <label htmlFor="password" className="required"><em>*</em>Password</label>
                                                                <div className="input-box">
                                                                    <input type="password" name="password" onChange={handleChange}
                                                                        title="Password" value={password}
                                                                        className="input-text" />
                                                                    {validator.message('Password', password, 'required',
                                                                        { className: 'text-danger' })}
                                                                </div>
                                                            </div>
                                                            <div className="field">
                                                                <label htmlFor="confirmation" className="required"><em>*</em>Confirm Password</label>
                                                                <div className="input-box">
                                                                    <input type="password" name="confirmPassword" onChange={handleChange}
                                                                        title="Confirm Password" value={confirmPassword}
                                                                        className="input-text" />
                                                                    {validator.message('Confirm Password', confirmPassword, 'required',
                                                                        { className: 'text-danger' })}
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <div className="buttons-set">
                                                        <p className="required">* Required Fields</p>
                                                        <button
                                                            onClick={gotoSignIn}
                                                            type="button" title="Back" className="button invert">
                                                            <span><span>← Back</span></span>
                                                        </button>
                                                        <button type="submit" title="Submit" className="button">
                                                            {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                                            <span><span>Submit</span></span>
                                                        </button>
                                                    </div>
                                                </form>
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
                                                        <label htmlFor="lEmail" className="required">Email Address</label>
                                                        <div className="input-box">
                                                            <input type="email" name="lEmail" onChange={handleChange}
                                                                id="lEmail" value={lEmail}
                                                                className="input-text"
                                                                title="Email Address" />
                                                            {validator.message('Login Email', lEmail, 'required|email', { className: 'text-danger' })}
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="lPassword" className="required">Password</label>
                                                        <div className="input-box">
                                                            <input type="password" name="lPassword" onChange={handleChange}
                                                                value={lPassword} className="input-text"
                                                                id="lPassword" title="Password" />
                                                            {validator.message('Login Password', lPassword, 'required',
                                                                { className: 'text-danger' })}
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
                                                        <label htmlFor="fEmail" className="required">Email Address</label>
                                                        <div className="input-box">
                                                            <input type="email" name="fEmail" alt="fEmail"
                                                                id="fEmail" value={fEmail} onChange={handleChange}
                                                                className="input-text" />
                                                            {validator.message('email', fEmail, 'required|email', { className: 'text-danger' })}
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