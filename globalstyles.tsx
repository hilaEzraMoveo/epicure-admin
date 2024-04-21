import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    background-color: #e9f0ff85;
    height: 100vh;
    width: 100%;
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  th {
    font-weight: bold!important;
  }
  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
  .table-container {
    overflow-y: scroll;
    width: 100%;
    margin: 30px 30px 70px 20px;
    border: 2px solid #fff;
    border-color: gray;
    border-radius: 5px;
    background-color: white;
  }

  .container {
    display: flex;
    gap:20px;
    height: 100vh;
  }
  .load-more-button {
    margin-top: 30px;
    background-color: #85bdffb3;
    width: 200px;
    height: 30px;
    font-size: 16px;
    border: 1px solid;
    border-color: #7e7f80b3;
    border-radius: 2px;
    margin-left: 45%;
    cursor: pointer
  }

  .formContainer {
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
    height: 100vh;

  }
  .form {
    background-color: white;
    width: 100%;
    maxWidth: 360;
    border: 2px solid #fff;
    border-color: gray;
    border-radius: 5px;
  }

  .main-content {
    text-align: left;
    padding: 20px;
  }
  
  .main-title {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 20px;
  }
  
  .sub-title {
    font-size: 1.5rem;
    color: #666;
    margin-bottom: 15px;
  }
  
  .sub-heading {
    font-size: 1.2rem;
    color: #888;
  }

`;

export default GlobalStyle;
