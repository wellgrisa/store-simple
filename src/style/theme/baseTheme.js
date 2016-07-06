import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

const { palette } = lightBaseTheme;

export default {
  ...darkBaseTheme,
  table: {
    backgroundColor: palette.canvasColor,
  },
  tableHeaderColumn: {
    textColor: palette.accent3Color,
  },
  tableRow: {
    hoverColor: palette.accent2Color,
    stripeColor: palette.primary1Color,
    selectedColor: palette.borderColor,
    textColor: palette.textColor,
    borderColor: palette.borderColor,
  },
}