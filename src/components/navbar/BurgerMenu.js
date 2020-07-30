import React from 'react';
import styled from "styled-components";
import { FaAlignLeft } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';


const Burgermenu = (props) => {
  return (
    <Wrapper onClick={props.handleNavbar}>
      <div>
        <div className={props.navbarState ? "open" : ""}>
          {props.navbarState ?
            <AiOutlineClose className="burger-menu" /> :
            <FaAlignLeft className="burger-menu" />
          }
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

`;