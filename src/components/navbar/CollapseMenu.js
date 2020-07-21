import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from "../../actions/user"


import { useSpring, animated } from 'react-spring';

const CollapseMenu = (props) => {
  const { open } = useSpring({ open: props.navbarState ? 0 : 1 });

  const loggedIn = useSelector(state => state.authentication.loggedIn);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(userActions.logout());
    props.handleNavbar()
  };


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
          <li><a href="/myorders" onClick={props.handleNavbar}>My Orders</a></li>
          <li><a href="/contactus" onClick={props.handleNavbar}>Contact Us</a></li>
          {
            loggedIn && (
              <div><a onClick={logout} href="#:">Logout</a></div>
            )
          }
        </NavLinks>
      </CollapseWrapper>
    );
  }
  return null;
};

export default CollapseMenu;

const CollapseWrapper = styled(animated.div)`
  background: #2d3436;
  position: fixed;
  top: 4.5rem;
  height:16rem;
  left: 0;
  right: 0;
  z-index:99;
`;

const NavLinks = styled.ul`
  list-style-type: none;
  padding: 2rem 1rem 2rem 2rem;

   & li {
    transition: all 300ms linear 0s;
  }

  & a {
    font-size: 1.4rem;
    line-height: 2;
    text-decoration: none;
    cursor: pointer;

    &:hover li {
      color: #fdcb6e;
      border-bottom: 1px solid #fdcb6e;
       text-decoration: none;
    }
  }
`;