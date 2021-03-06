// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
const parseHexToRGB = color =>
  color
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`,
    )
    .substring(1)
    .match(/.{2}/g)
    .map(x => parseInt(x, 16));

const getRGBArray = color => {
  if (/^#/.test(color)) {
    return parseHexToRGB(color);
  }
  if (/^rgb/.test(color)) {
    return color
      .match(/rgba?\((\s?[0-9]*\s?),(\s?[0-9]*\s?),(\s?[0-9]*\s?).*?\)/)
      .splice(1);
  }
  return color;
};

export const colorIsDark = color => {
  const [red, green, blue] = getRGBArray(color);
  // http://www.had2know.com/technology/
  //  color-contrast-calculator-web-design.html
  const brightness = (299 * red + 587 * green + 114 * blue) / 1000;
  return brightness < 125;
};

export const normalizeColor = (color, theme) => {
  const colorSpec = theme.global.colors[color] || color;
  // If the color has a light or dark object, use that
  let result = colorSpec;
  if (theme.dark && colorSpec.dark) {
    result = colorSpec.dark;
  } else if (!theme.dark && colorSpec.light) {
    result = colorSpec.light;
  }
  // allow one level of indirection in color names
  if (
    result &&
    theme.global.colors[result] &&
    theme.global.colors[result] !== result
  ) {
    result = normalizeColor(result, theme);
  }
  return result;
};
