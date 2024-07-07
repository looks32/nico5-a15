import React from 'react';
import styled from "styled-components";


const HeaderWrap = styled.header`
  
  position: relative;
  padding: 100px 0 50px;
  text-align:center;
  animation: 1s head;

  @keyframes head {
    0% {
      top: 40px;
      opacity:0;
    }

    100% {
      top: 0;
      opacity:1;
    }
  }

  img {
    width:200px;
  }
`

export default function Header() {
  return (
	<HeaderWrap>
    <img src="https://i.namu.wiki/i/ztRqdTgURxDVUWrHYNFM3omqjG0EuvxTqWvPAITIP-eHOL0l9u-0BfHYO1yY7D2fWf6UO370NbsJ1gglPgbJRg.svg" alt="디즈니 로고" />
  </HeaderWrap>
  )
}
