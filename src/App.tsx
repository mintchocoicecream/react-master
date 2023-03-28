import { useState } from "react";
import {ReactQueryDevtools} from 'react-query/devtools';
import { Link } from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Router from "./Router";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Source+Sans+Pro:wght@300;400&display=swap');
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  *{
    box-sizing: border-box;
  }
  body{
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${(props)=>props.theme.bgColor};
    color: ${(props)=>props.theme.textColor};
  }
  a{
    text-decoration: none;
    color: inherit;
  }
`;

let Menu=styled.div`
  z-index: 99;
  position: fixed;
  width: 20%;
  height: 100vh;
  background-color: ${(props)=>props.theme.pontColor};
`;

const MenuUl=styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MenuLi=styled.li`
  width: 100%;
  font-size: 1.2em;
  padding: 40px 0;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  transition: color .2s ease-in;
  &:hover{
    color: black;
  }
`;

const Logout=styled.button`
  position: absolute;
  width: 100%;
  padding: 10px;
  background-color: ${(props)=>props.theme.pontColor};
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;
  bottom: 0;
  transition: color .2s ease-in;
  &:hover{
    color: black;
  }
`;

function App() {
  const [hide, setHide]=useState(false);
  let MenuClosed=styled.span``;
  const showMenu=keyframes`
  from{transform: translateX(-100%);}
  to{}
  `;

  const hideMenu=keyframes`
  from{}
  to{transform: translateX(-100%);}
  `;

  const showMenuBtn=keyframes`
    from{}
    to{
      opacity:1;
    };
  `;

  if(hide){
    MenuClosed=styled.span`
    position: absolute;
    right: -25px;
    background-color: ${(props)=>props.theme.pontColor};
    padding: 5px;
    color: white;
    cursor: pointer;
    transition: color .2s ease-in;
    opacity: 0;
    animation: ${showMenuBtn} .3s ease-in-out forwards;
    animation-delay: .3s;
    &:hover{
      color: black;
    }
    `;
  }else{
    MenuClosed=styled.span`
    position: absolute;
    right: 0px;
    background-color: ${(props)=>props.theme.pontColor};
    padding: 5px;
    color: white;
    cursor: pointer;
    transition: color .2s ease-in;
    &:hover{
      color: black;
    }
    `;
  }



  const menuHide=()=>{
    if(hide){
      Menu=styled.div`
      z-index: 99;
      position: fixed;
      width: 20%;
      height: 100vh;
      transition: all 1s ease-in-out;
      background-color: ${(props)=>props.theme.pontColor};
      animation: ${showMenu} .3s ease-in-out forwards;

    `;
    }  else{
      Menu=styled.div`
      z-index: 99;
      position: fixed;
      width: 20%;
      height: 100vh;
      background-color: ${(props)=>props.theme.pontColor};
      animation: ${hideMenu} .3s ease-in-out forwards;
    `;
    }
    setHide(!hide);
  };
  return <>
    <GlobalStyle/>
    <Menu>
      {hide?(
      <MenuClosed onClick={menuHide}>▶</MenuClosed>
      ):(
      <MenuClosed onClick={menuHide}>◀</MenuClosed>
      )}
      <MenuUl>
        <MenuLi>
          <a href="/">Home</a>
        </MenuLi>
        <MenuLi>test</MenuLi>
        <MenuLi>test</MenuLi>
        <MenuLi>test</MenuLi>
        <Logout>Logout</Logout>
      </MenuUl>
    </Menu>
    <Router />  
    <ReactQueryDevtools initialIsOpen={true} />
  </>
}

export default App;