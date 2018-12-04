import { css } from 'styled-components';

export const size = (name, value, theme) => css`
  ${name}: ${theme.global.size[value] || value};
`;
