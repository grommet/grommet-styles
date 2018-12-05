import { css } from 'styled-components';

export const sizeStyle = (name, value, theme) => css`
  ${name}: ${theme.global.size[value] || value};
`;
