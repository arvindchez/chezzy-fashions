/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from "../../actions/user"
import { FaShoppingCart } from 'react-icons/fa';
const logo = undefined; // from "../../images/logo.png";

const Brand = () => {

  const loggedIn = useSelector(state => state.authentication.loggedIn);
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.cartItems);

  const logout = () => {
    dispatch(userActions.logout());
  };

  return (
    <div class="container">
      <div class="row">
        <div class="col-md-4 col-sm-12 col-12">
          <div class="btn-group">
            <button class="btn border dropdown-toggle my-md-4 my-2 text-white" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">USD</button>
            <div class="dropdown-menu">
              <a href="#" class="dropdown-item">INR - Rupees</a>
              <a href="#" class="dropdown-item">ERU - Euro</a>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-12 text-center">
          <ALink href="/" alt="Home" >
            {!logo ? (<h2 class="my-md-3 site-title text-white">Chezzy e-Shop</h2>) : (
              <Image src={logo} alt="Company Logo" />
            )
            }</ALink>
        </div>
        <div class="col-md-4 col-12 text-right">
          <p class="my-md-4 header-links">
            {
              loggedIn ? (
                <a onClick={logout} href="#:">Logout</a>
              ) : (<a href="/login" class="px-2">Sign In</a>)
            }
          </p>
          <a className="small-cart" href=" /cart">{
            cartItems && cartItems.length > 0 ? cartItems.length : ""
          }<FaShoppingCart /></a>
        </div>

      </div>
    </div>
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