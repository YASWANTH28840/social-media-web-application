import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Landing = () => {
  return (
    <Container>
      <Content>
        <CTA>
        </CTA>
        <BgImage/>
    </Content>
  </Container>
  )
}

const Container = styled.section`
overflow: hidden;
display: flex;
flex-direction: column;
text-align: center;
height: 100vh
`;

const Content = styled.div`
margin-bottom = 10vh;
width: 100%;
position: relative;
min-height: 100vh;
box-sizing: border-box;
display:flex;
justify-content: center;
align-item: center;
flex-direction: column;
padding: 80px 40px;
height: 100%;
`;

const BgImage = styled.div`
    height: 100%;
    backgroung-position: top;
    background-image: url('/images/landing.jfif');
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    right: 0;
    botton: 0;
    left: 0;
    z-index: -1;
`;

const CTA = styled.div`
    margin-bottom: 2vw;
    max-width: 650px;
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 0;
    align-item: center;
    text-align: center;
    margin-right: auto;
    margin-left: auto;
    transition-timing-function: ease-out;
    transition: opacity 0.2s;
    width: 100%;
`;

export default Landing;