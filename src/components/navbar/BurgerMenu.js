import React from 'react';
import styled from "styled-components";
import { FaAlignRight } from 'react-icons/fa';

const Burgermenu = (props) => {
  return (
    <Wrapper onClick={props.handleNavbar}>
      <div>
        <div className={props.navbarState ? "open" : ""}>
          <FaAlignRight className="burger-menu" />
        </div>
      </div>
    </Wrapper>
  );
}

export default Burgermenu;

const Wrapper = styled.div`
  position: relative;
  padding-top: .7rem;
  cursor: pointer;
  display: block;

  & span {
    background: #fdcb6e;
    display: block;
    position: relative;
    width: 3.5rem;
    height: .4rem;
    margin-bottom: .7rem;
    transition: all ease-in-out 0.2s;
  }

  .open span:nth-child(2) {
      opacity: 0;
    }

  .open span:nth-child(3) {
    transform: rotate(45deg);
    top: -11px;
  }

  .open span:nth-child(1) {
    transform: rotate(-45deg);
    top: 11px;
  }

`;