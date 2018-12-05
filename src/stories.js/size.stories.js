import React from 'react';
import { storiesOf } from '@storybook/react';
import styled, { ThemeProvider } from 'styled-components';

import { sizeStyle } from 'grommet-styles';

const sizeTheme = {
  global: {
    size: {
      large: '300px',
      medium: '150px',
    },
  },
};

const InnerBox = ({ theme, width, height, ...rest }) => <div {...rest} />;
InnerBox.displayName = 'Box';

const Box = styled(InnerBox)`
  border: 1px solid;
  ${props => sizeStyle('width', props.width, props.theme)}
  ${props => sizeStyle('height', props.height, props.theme)}
`;

const Size = () => (
  <div>
    <Box theme={sizeTheme} width="large" height="medium">
      Hello, large width and medium height theme.
    </Box>
    <ThemeProvider theme={sizeTheme}>
      <Box width="large" height="medium">
        Hello, large width and medium height theme.
      </Box>
    </ThemeProvider>
  </div>
);

storiesOf('Size', module).add('Default', () => <Size />);
