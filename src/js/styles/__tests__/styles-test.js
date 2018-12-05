import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';

import { colorStyle, sizeStyle } from '../..';

const fakeTheme = {
  global: {
    colors: {
      white: '#FFFFFF',
      text: {
        light: 'black',
        dark: 'white',
      },
      icon: 'white',
    },
    size: {
      small: '75px',
      medium: '150px',
      large: '300px',
    },
  },
};

const fakeDarkTheme = {
  ...fakeTheme,
  dark: true,
};

const Box = styled.div`
  ${props =>
    props.bg &&
    colorStyle('background-color', props.bg.color || props.bg, props.theme)}
  ${props =>
    props.color &&
    colorStyle('color', props.color.color || props.color, props.theme, true)}
  ${props => props.width && sizeStyle('width', props.width, props.theme)}
`;

test('renders a div with color', () => {
  const component = renderer.create(
    <div>
      <Box bg="white" theme={fakeTheme}>
        white
      </Box>
      <Box bg="text" theme={fakeTheme}>
        black
      </Box>
      <Box bg="icon" theme={fakeTheme}>
        white
      </Box>
      <Box bg="text" theme={fakeDarkTheme}>
        white
      </Box>
      <Box bg="#767676" theme={fakeDarkTheme}>
        #767676
      </Box>
      <Box bg={{ color: 'text' }} theme={fakeTheme}>
        black
      </Box>
      <Box bg={{ color: 'text' }} theme={fakeDarkTheme}>
        white
      </Box>
    </div>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders a div with size', () => {
  const component = renderer.create(
    <div>
      <Box width="small" theme={fakeTheme}>
        small
      </Box>
      <Box width="medium" theme={fakeTheme}>
        medium
      </Box>
      <Box width="large" theme={fakeTheme}>
        large
      </Box>
      <Box width="24px" theme={fakeTheme}>
        24px
      </Box>
    </div>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
