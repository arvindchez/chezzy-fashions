/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";
import BurgerMenu from "./BurgerMenu";
import CollapseMenu from "./CollapseMenu";
import { FaSearch } from 'react-icons/fa';

const Navbar = (props) => {
  const linkAnimation = useSpring({
    from: { transform: 'translate3d(0, 30px, 0)', opacity: 0 },
    to: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    delay: 100,
    config: config.stiff,
  });

  return (
    <>
      <NavBar>
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

          <div className="search">
            <input type="text" placeholder="Search product..." />
            <a><FaSearch /></a>
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
    margin: 0 .5rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;
    font-size: 0.9em;
    color: var(--light-gray);
    text-transform: uppercase;

    &:hover a {
      border-bottom: 1px solid #fdcb6e;
      text-decoration: none;
    }
    @media (max-width: 768px) {
      display: none;
    }
  }

  a:hover {
  color: var(--primary-color);
}
`;

const BurgerWrapper = styled.div`
  margin: auto 0;
  @media (min-width: 769px) {
    display: none;
  }
`;