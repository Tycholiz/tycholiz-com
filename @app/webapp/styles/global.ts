import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }
  *, *::after, *::before {
    box-sizing: border-box;
  }
  body {
    height: 100vh;
    max-width: 800px;
    margin: 0 auto;
    text-rendering: optimizeLegibility;
    background-color: ${({ theme }) => theme.color.background};
  }
`