import { createGlobalStyle, DefaultTheme } from 'styled-components';
import { Theme } from './theme'

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
    background-color: ${({ theme }: DefaultTheme & { theme: Theme }) => theme.color.background};
    font-family: ${({ theme }) => theme.font.paragraph};
  }
`