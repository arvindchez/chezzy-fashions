import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';


const CollapseMenu = (props) => {
  const { open } = useSpring({ open: props.navbarState ? 0 : 1 });

  if (props.navbarState === true) {
    return (
      <CollapseWrapper style={{
        transform: open.interpolate({
          range: [0, 0.2, 0.3, 1],
          output: [0, -20, 0, -200],
        }).interpolate(openValue => `translate3d(0, ${openValue}px, 0`),
      }}
      >
        <NavLinks >
          <li><a href="/" onClick={props.handleNavbar}>Home</a></li>
          <li><a href="/product" onClick={props.handleNavbar}>Products</a></li>
          <li><a href="/myorders" onClick={props.handleNavbar}>My Orders</a></li>
          <li><a href="/contactus" onClick={props.handleNavbar}>Contact Us</a></li>
        </NavLinks>
      </CollapseWrapper>
    );
  }
  return null;
};

export default CollapseMenu;

const CollapseWrapper = styled(animated.div)`
  background: #45ccb8;
  left: 0;
  right: 0;
  z-index:50;
`;

const NavLinks = styled.ul`
  list-style-type: none;
  padding: 2rem 1rem 2rem 2rem;

   & li {
    transition: all 300ms linear 0s;
  }

  & a {
    line-height: 2;
    text-decoration: none;
    cursor: pointer;
    color:white;

    &:hover li {
      color: #fdcb6e;
      border-bottom: 1px solid #fdcb6e;
       text-decoration: none;
    }
  }
`;