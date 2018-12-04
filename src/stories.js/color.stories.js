import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import styled, { ThemeProvider, withTheme } from 'styled-components';

import { color, colorIsDark, normalizeColor } from 'grommet-styles';

const colorTheme = {
  global: {
    colors: {
      brand: {
        dark: 'black',
        light: 'grey',
      },
      text: {
        dark: 'white',
        light: 'black',
      },
      black: '#000000',
    },
  },
};

const darkTheme = {
  ...colorTheme,
  dark: true,
};

const StyledBox = styled.div`
  display: flex;

  ${props => color('background', props.bg.color || props.bg, props.theme)}
  ${props => color('color', 'text', props.theme)}
`;

const Box = withTheme(
  class BoxWrapper extends Component {
    constructor(props) {
      super(props);
      this.state = {
        theme: props.theme,
      };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      const {
        bg,
        theme: { dark: forceDark },
      } = nextProps;
      const { dark: stateDark, theme: stateTheme } = prevState;

      let dark = !!forceDark;
      if (!dark && bg) {
        if (typeof bg.dark !== 'undefined') {
          dark = bg.dark;
        } else {
          dark = colorIsDark(normalizeColor(bg.color || bg, stateTheme));
        }
      }

      if (stateDark !== dark) {
        return {
          dark,
          theme: {
            ...stateTheme,
            dark,
          },
        };
      }

      return undefined;
    }

    render() {
      const { theme } = this.state;
      return (
        <ThemeProvider theme={theme}>
          <StyledBox {...this.props} theme={theme} />
        </ThemeProvider>
      );
    }
  },
);

const Text = styled.span`
  ${props => color('color', 'text', props.theme)}
`;

const Color = () => (
  <div>
    <Box theme={colorTheme} bg="brand">
      Hello, light theme.
    </Box>
    <Box theme={darkTheme} bg="brand">
      Hello, dark theme.
    </Box>
    <ThemeProvider theme={colorTheme}>
      <Box bg="brand">
        <Text>Hello, light theme.</Text>
      </Box>
    </ThemeProvider>
    <ThemeProvider theme={darkTheme}>
      <Box bg="brand">
        <Text>Hello, dark theme.</Text>
      </Box>
    </ThemeProvider>
  </div>
);

storiesOf('Color', module).add('Default', () => <Color />);
