import reset from 'react-style-reset/string';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  ${reset};
  html,
  body{
    user-select: none;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
`;
/*

  body{
    touch-action: manipulation;
    user-zoom:fixed;
  }

  */