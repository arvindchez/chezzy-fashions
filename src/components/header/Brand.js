/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from "../../actions/user"

const Brand = () => {

    const loggedIn = useSelector(state => state.authentication.loggedIn);

    const dispatch = useDispatch();

    const logout = () => {
        dispatch(userActions.logout());
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-sm-12 col-12">
                    <div className="btn-group">
                        <button className="btn border dropdown-toggle my-md-4 my-2 text-white" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">USD</button>
                        <div className="dropdown-menu">
                            <a href="#" className="dropdown-item">ERU - Euro</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-12 text-center">
                    <a href="/" className="px-2">
                        <h2 className="my-md-3 site-title text-white">Chezzy e-Store</h2>
                    </a>
                </div>
                <div className="col-md-4 col-12 text-right">
                    <p className="my-md-4 header-links">
                        {
                            loggedIn ? (
                                <a onClick={logout} href="#:">Logout</a>
                            ) : (
                                    <a href="/login" className="px-2">Sign In</a>
                                )
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Brand
