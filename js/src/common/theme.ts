export enum Theme {
  AUTO = 'auto',
  LIGHT = 'light',
  DARK = 'dark',
}

export const storageKey = 'Theme';

const themeValues = Object.values(Theme);

export const nextTheme = (theme?: Theme) => {
  if (!theme) {
    return Theme.LIGHT;
  }
  const index = themeValues.indexOf(theme);
  return themeValues[(index + 1) % themeValues.length] as Theme;
};
