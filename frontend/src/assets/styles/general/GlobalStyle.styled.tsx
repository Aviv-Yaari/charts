import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle<{ theme: any }>`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
      font-family: 'Red Hat Display', sans-serif;
      line-height: 1.5;
  }
  
  h1,h2 {
    font-weight: 900;
    font-size: 1.5em;
  }

`;
