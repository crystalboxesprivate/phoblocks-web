import reset from 'react-style-reset/string';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  ${reset};
  body{user-select: none;}
`;
