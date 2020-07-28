import React from 'react'
import styled from "styled-components";
import contactUsImg from '../../images/mail-icon.png'
import Fade from "react-reveal/Fade";
import Title from "../title/Title"

const ContactUs = () => {
    return (
        <>
            <Title title={"Contact Us"} />
            <DivContainer>
                <DivAnchor href="mailto:arvind.chez@gmail.com" >
                    <Fade bottom cascade>
                        <Image src={contactUsImg} alt="contact us..." />
                    </Fade>
                </DivAnchor>
            </DivContainer>
        </>
    )
}

export default ContactUs

const DivContainer = styled.div`
     display: flex;
    align-items: center;
    justify-content: center;
`;

const DivAnchor = styled.a`
     font-weight:bold;
     color:brown;
`;


const Image = styled.img`
 display: flex;
 flow-direction:column;
  height:60%;
  weight: 60%;

  @media screen and (max-width: 430px) {
   height: 10%;
   weight: 10%;
  }
`;
