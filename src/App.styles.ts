import styled, {createGlobalStyle} from "styled-components";
 import BGImage from "./images/mountains.jpg";

 export const GlobalStyle = createGlobalStyle`
   html {
     min-height: 100%;
   }

   body {
     //background-image: url(${BGImage});
     background-size: cover;
    background-color: #e5e5e5;
     margin: 0;
     padding: 0 20px 100px;
     display: flex;
     justify-content: center;

   }

   * {
     box-sizing: border-box;
     font-family: 'Ubuntu', sans-serif;
   }
 `;
 
 export const Wrapper = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   padding-bottom: 50px;

   > p {
     color: #000;
   }

   .score {
     color: #000;
     font-size: 20px;
     line-height: 26px;
     margin: 20px 0px 10px;
     font-weight: 400;
   }

   h1 {
     //font-family: Fascinate Inline, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
     //background-image: linear-gradient(180deg, #fff, #87f1ff);
     //background-size: 100%;
     //background-clip: text;
     //-webkit-background-clip: text;
     //-webkit-text-fill-color: transparent;
     //-moz-background-clip: text;
     //-moz-text-fill-color: transparent;
     //filter: drop-shadow(2px 2px #0085a3);
     color: #222222;
     font-size: 26px;
     margin: 0px auto 20px;
     padding: 0 10px;
     text-align: center;
     font-weight: 500;
   }

   .start, .next {
     cursor: pointer;

     //background: linear-gradient(180deg, #fff, #ffcc91);
     border: 2px solid #222222;
     //box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
     border-radius: 10px;
     height: 40px;
     //margin: 10px 0px;
     padding: 0px 5px;
     font-size: 14px;


     a {
       font-size: 14px;
       display: inline-flex;
       height: 100%;
       align-items: center;
       width: 100%;
       padding: 0 10px;
       color: #000;
       text-decoration: none;
     }

   }

   .dnone {
     display: none;
   }

   .start {
     max-width: 200px;
   }

   .powered {
     position: fixed;
     bottom: 0;
     background-color: #fff;
     z-index: 10;
     width: 100%;
     padding: 10px;
     text-align: center;
     border-top: 1px solid #222;

     a {
       color: #222;

     }
   }

 `;