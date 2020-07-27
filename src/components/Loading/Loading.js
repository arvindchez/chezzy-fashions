import React from 'react'
import styled from "styled-components";
import smallLoadingGif from '../../images/gif/small-loading.gif'

const Loading = () => {
    return (
        <div>
            <Image alt="Loading..." />
        </div>
    )
}

export default Loading

const Image = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
  height: 30%;
  content:url(${smallLoadingGif});

  @media screen and (max-width: 430px) {
   content:url(${smallLoadingGif});
  }
`;
