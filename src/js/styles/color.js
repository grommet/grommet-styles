import { css } from 'styled-components';

import { normalizeColor } from '../utils';

export const color = (name, value, theme, required) => css`
  ${name}: ${normalizeColor(value, theme, required)};
`;
