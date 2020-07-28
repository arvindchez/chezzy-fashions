/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import styled from "styled-components";
import BurgerMenu from "./BurgerMenu";
import CollapseMenu from "./CollapseMenu";
import { connect } from "react-redux";
import { searchProducts } from "../../actions/product"
import Fade from "react-reveal/Fade";
import { useLocation } from 'react-router-dom'

const Navbar = (props) => {

  let location = useLocation();
  console.log(location)

  const handleSearch = (query) => {
    props.searchProducts(
      query,
      process.env.REACT_APP_PAGE_START_INDEX,
      process.env.REACT_APP_PAGE_SIZE, false);
  };

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
          <NavLinks>
            <a href="/">Home</a>
            <a href="/product">Products</a>
            <a href="/myorders">My Orders</a>
            <a href="/contactus">Contact Us</a>
          </NavLinks>
          <Fade left cascade>
            {(location.pathname === "/product" || props.search) && (
              <div className="search input-icons">
                <input
                  type="search"
                  placeholder="Search product..."
                  onKeyUp={(e) =>
                    handleSearch(e.target.value)
                  } required />
                <i className="fas fa-search icon" aria-hidden="true"></i>
              </div>
            )}
          </Fade>
        </FlexContainer>
      </NavBar>
      <CollapseMenu
        navbarState={props.navbarState}
        handleNavbar={props.handleNavbar}
      />
    </>
  )
}

const NavBar = styled.nav`
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

const NavLinks = styled.ul`
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
  (state) => ({ search: state.products.search }),
  {
    searchProducts
  }
)(Navbar);
