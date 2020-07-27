/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";
import BurgerMenu from "./BurgerMenu";
import CollapseMenu from "./CollapseMenu";
import { FaSearch } from 'react-icons/fa';
import { connect } from "react-redux";
import { searchProducts } from "../../actions/product"
import { useLocation } from 'react-router-dom'

const Navbar = (props) => {

  const linkAnimation = useSpring({
    from: { transform: 'translate3d(0, 30px, 0)', opacity: 0 },
    to: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    delay: 100,
    config: config.stiff,
  });

  const handleSearch = (query) => {
    props.searchProducts(
      query,
      process.env.REACT_APP_PAGE_START_INDEX,
      process.env.REACT_APP_PAGE_SIZE);
  };

  let location = useLocation();

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
            <a href="/product">Products</a>
            <a href="/myorders">My Orders</a>
            <a href="/contactus">Contact Us</a>
          </NavLinks>
          {location.pathname === "/product" && (
            <div className="search input-icons">
              <input style={linkAnimation}
                type="search"
                placeholder="Search product..."
                onKeyUp={(e) =>
                  handleSearch(e.target.value)
                } required />
              <i class="fas fa-search icon" aria-hidden="true"></i>

            </div>
          )}
        </FlexContainer>
      </NavBar>
      <CollapseMenu
        navbarState={props.navbarState}
        handleNavbar={props.handleNavbar}
      />
    </>
  )
}

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
}
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

export default connect(
  (state) => ({}),
  {
    searchProducts
  }
)(Navbar);
