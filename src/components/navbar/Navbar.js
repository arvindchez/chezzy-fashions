/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from "styled-components";
import BurgerMenu from "./BurgerMenu";
import CollapseMenu from "./CollapseMenu";
import { connect } from "react-redux";
import { fetchProductsAutoComplete } from "../../actions/product";
import Fade from "react-reveal/Fade";
import AutoCompleteSearch from '../autocomplete/AutoCompleteSearch';
import { history } from '../../helper/history';

const Navbar = (props) => {
  const handleSearch = (query) => {
    history.push({
      pathname: '/product',
      search: `?title=${query}`
    });
  }

  const loadSuggestions = (query) => {
    props.fetchProductsAutoComplete(
      process.env.REACT_APP_PAGE_START_INDEX,
      process.env.REACT_APP_PAGE_SIZE,
      query);
  }

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
            <div className="app-component">
              <AutoCompleteSearch
                data={props.autoSuggestions ?
                  props.autoSuggestions.map(item => item.title) : []}
                loadSuggestions={loadSuggestions}
                handleSearch={handleSearch} />
            </div>
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
  @media (min-width: 769px) {
    display: none;
  }
`;

export default connect(
  (state) => ({
    autoSuggestions: state.products.autoSuggestions,
    suggestionsCount: state.products.suggestionsCount
  }),
  {
    fetchProductsAutoComplete
  }
)(Navbar);
