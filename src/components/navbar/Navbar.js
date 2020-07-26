/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import styled from "styled-components";
import BurgerMenu from "./BurgerMenu";
import CollapseMenu from "./CollapseMenu";
import { useSpring, animated, config } from "react-spring";
import { useSelector } from "react-redux";

const Navbar = (props) => {

  const cartItems = useSelector(state => state.cart.cartItems);

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

  return (
    <>
      <NavBar style={barAnimation}>
        <FlexContainer>
          <BurgerWrapper>
            <BurgerMenu
              navbarState={props.navbarState}
              handleNavbar={props.handleNavbar}
            />
          </BurgerWrapper>
          <NavLinks style={linkAnimation}>
            <a href="/">Home</a>
            <a href="/myorders">My Orders</a>
            <a href="/contactus">Contact Us</a>
          </NavLinks>
          <div className="navbar-nav">
            <div className="row">
              <div className="col">
                <li className="nav-item border rounded-circle mx-2 search-icon">
                  <i className="fas fa-search p-2"></i>
                </li>
              </div>
              <div className="col">
                <li className="nav-item border rounded-circle mx-2 basket-icon">
                  <a href="/cart">{
                    cartItems && cartItems.length > 0 ? cartItems.length : ""
                  }<i className="fas fa-shopping-basket p-2"></i></a>
                </li>
              </div>
            </div>
          </div>
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
  width: 100%;
  left: 0;
  top:10;
  z-index: 1;
`;

const FlexContainer = styled.div`
  max-width: 120rem;
  display: flex;
  margin: auto;
  padding: 0 2rem;;
  justify-content: space-between;
  height: 3rem;
  background-color: white;
`;

const NavLinks = styled(animated.ul)`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  & a {
    border-bottom: 1px solid transparent;
    margin: 0 1.5rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;
    color:#45ccb8;

    &:hover li {
      color:lightgray;
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

