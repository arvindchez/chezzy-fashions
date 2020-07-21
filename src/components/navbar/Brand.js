import React from 'react'
import styled from "styled-components";

import logo from "../../images/logo.png";

const Brand = () => {
  return (
    <ALink href="/" alt="Home" >
      <Image src={logo} alt="Company Logo" />
    </ALink>
  )
}

export default Brand

const Image = styled.img`
  height: 85%;
  margin: auto 0;
  padding-left: 2rem;
`;

const ALink = styled.a`
width: 5rem;

 @media screen and (max-width: 430px) {
   width: 20rem;
  }
`;