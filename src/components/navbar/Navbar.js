import React from 'react'
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";
import BurgerMenu from "./BurgerMenu";
import CollapseMenu from "./CollapseMenu";
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';

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

  const cartItems = useSelector(state => state.cart.cartItems);

  return (
    <>
      <NavBar style={barAnimation}>
        <FlexContainer>
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
          <NavLinks style={linkAnimation}>
            <a href="/">Home</a>
            <a href="/myorders">My Orders</a>
            <a href="/contactus">Contact Us</a>
            <a href="/cart">{
              cartItems && cartItems.length > 0 ? cartItems.length : ""
            }<FaShoppingCart className="small-cart" /></a>
          </NavLinks>

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
  top:0;
  z-index: 1;
`;

const FlexContainer = styled.div`
  max-width: 120rem;
  display: flex;
  background-color: white;
`;

const NavLinks = styled(animated.ul)`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;
  
  & a {
    border-bottom: 1px solid transparent;
    margin: 0 .5rem;
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