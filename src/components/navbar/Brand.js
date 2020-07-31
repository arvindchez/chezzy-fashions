/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from "../../actions/user"
import { FaShoppingCart } from 'react-icons/fa';
import CartToolTip from './CartToolTip';
import ReactTooltip from "react-tooltip";

const logo = undefined; // from "../../images/logo.png";


const Brand = () => {

  const loggedIn = useSelector(state => state.authentication.loggedIn);
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.cartItems);

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
              <a href="#" className="dropdown-item">INR - Rupees</a>
              <a href="#" className="dropdown-item">ERU - Euro</a>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-12 text-center">
          <ALink href="/" alt="Home" >
            {!logo ? (<h2 className="my-md-3 site-title text-white">Chezzy e-Shop</h2>) : (
              <Image src={logo} alt="Company Logo" />
            )
            }</ALink>
        </div>
        <div className="col-md-4 col-12 text-right">
          <p className="my-md-4 header-links">
            {
              loggedIn ? (
                <a onClick={logout} href="#:">Logout</a>
              ) : (<a href="/login" className="px-2">Sign In</a>)
            }
          </p>
          <a className="small-cart" href=" /cart">{
            cartItems && cartItems.length > 0 ? cartItems.length : ""
          }<FaShoppingCart data-for='cartitem' data-tip /></a>
          <ReactTooltip id='cartitem'
            getContent={(dataTip) => <CartToolTip />}
            className='cart-popup'
            effect='solid'
            border={false}
            type={'dark'}
            place={'left'}
          ></ReactTooltip>
        </div>
      </div>
    </div >
  )
}

export default Brand

const Image = styled.img`
  height: 85%;
  margin: auto 0;
  padding-left: 2rem;
`;

const ALink = styled.a`
width: 5rem;

 @media screen and (max-width: 430px) {
   width: 20rem;
  }
`;