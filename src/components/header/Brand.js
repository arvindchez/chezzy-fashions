/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const Brand = () => {
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
                    <h2 className="my-md-3 site-title text-white">Chezzy Store</h2>
                </div>
                <div className="col-md-4 col-12 text-right">
                    <p className="my-md-4 header-links">
                        <a href="#" className="px-2">Sign In</a>
                        <a href="#" className="px-1">Create an Account</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Brand
