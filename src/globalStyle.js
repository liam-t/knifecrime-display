import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    min-height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    font-size: 10px;
  }
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: Oswald;
    font-size: 1.6rem;
  }
  body,
  #root {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  }
`;

export default GlobalStyle;
