import { createGlobalStyle } from "styled-components";

// const GlobalStyle = createGlobalStyle`
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//   }
//   body {
//     width: 100vw;
//     height: 100vh;
//     background-color: #f0f2f5;
//     font-family: Arial, Helvetica, sans-serif
//   }
// `;

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  font-family: 'poppins', sans-serif;
  box-sizing: border-box;
}

body {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #f2f2f2;
}
`;

export default GlobalStyle;