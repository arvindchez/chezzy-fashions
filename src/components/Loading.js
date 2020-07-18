import React from 'react'
import styled from "styled-components";
import smallLoadingGif from '../images/gif/small-loading.gif'
import bigLoadingGif from '../images/gif/big-loading.gif'

const Loading = () => {
    return (
        <div>
            <h4>Loading...</h4>
            <Image alt="Loading..." />
        </div>
    )
}

export default Loading

const Image = styled.img`
  height: 30%;
  weight: 30%;
  content:url(${bigLoadingGif});

  @media screen and (max-width: 430px) {
   height: 20%;
   weight: 20%;
   content:url(${smallLoadingGif});
  }
`;
