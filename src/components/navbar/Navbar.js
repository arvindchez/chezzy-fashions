import React from 'react'
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";

import Brand from "./Brand";
import BurgerMenu from "./BurgerMenu";
import CollapseMenu from "./CollapseMenu";
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from "../../actions/user"
import { FaShoppingCart } from 'react-icons/fa';
import Avatar, { Cache } from 'react-avatar';

const cache = new Cache({

  // Keep cached source failures for up to 7 days
  sourceTTL: 7 * 24 * 3600 * 1000,

  // Keep a maximum of 20 entries in the source cache
  sourceSize: 20
});

const Navbar = (props) => {
  const barAnimation = useSpring({
    from: { transform: 'translate3d(0, -10rem, 0)' },
    transform: 'translate3d(0, 0, 0)',
  });

  const linkAnimation = useSpring({
    from: { transform: 'translate3d(0, 30px, 0)', opacity: 0 },
    to: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    delay: 100,
    config: config.stiff,
  });

  const loggedIn = useSelector(state => state.authentication.loggedIn);
  const cartItems = useSelector(state => state.cart.cartItems);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(userActions.logout());
  };

  return (
    <>
      <NavBar style={barAnimation}>
        <FlexContainer>
          <Brand />
          <NavLinks style={linkAnimation}>
            <a href="/">Home</a>
            <a href="/myorders">My Orders</a>
            <a href="/contactus">Contact Us</a>
            {
              loggedIn && (
                <a onClick={logout} href="#:">Logout</a>
              )
            }
            <a href="/cart">{
              cartItems && cartItems.length > 0 ? cartItems.length : ""
            }<FaShoppingCart className="small-cart" /></a>
            <a href="/me">
              <Avatar name="Aravind Cheziyan" cache={cache} size="35" />
            </a>
          </NavLinks>
          <BurgerWrapper>
            <div>
              <a href="/cart">{
                cartItems && cartItems.length > 0 ? cartItems.length : ""
              }<FaShoppingCart /></a>
            </div>
            <BurgerMenu
              navbarState={props.navbarState}
              handleNavbar={props.handleNavbar}
            />
          </BurgerWrapper>
        </FlexContainer>
      </NavBar>
      <CollapseMenu
        navbarState={props.navbarState}
        handleNavbar={props.handleNavbar}
      />
    </>
  )
}

export default Navbar

const NavBar = styled(animated.nav)`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: #2d3436;
  z-index: 1;
  font-size: 1.4rem;
`;

const FlexContainer = styled.div`
  max-width: 120rem;
  display: flex;
  margin: auto;
  padding: 0 2rem;;
  justify-content: space-between;
  height: 5rem;
`;

const NavLinks = styled(animated.ul)`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  & a {
    font-weight: 600;
    border-bottom: 1px solid transparent;
    margin: 0 1.5rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;

    &:hover li {
      color: #fdcb6e;
      border-bottom: 1px solid #fdcb6e;
      text-decoration: none;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const BurgerWrapper = styled.div`
  margin: auto 0;

  @media (min-width: 769px) {
    display: none;
  }
`;

