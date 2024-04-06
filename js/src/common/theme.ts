export enum Theme {
  AUTO = 'auto',
  LIGHT = 'light',
  DARK = 'dark',
}

export const storageKey = 'Theme';

const themeValues: Theme[] = Object.values(Theme);

/**
 * Loop through the themes.
 * Auto -> Light -> Dark -> Auto.
 */
export const nextTheme: (theme?: Theme) => Theme = (theme?: Theme) => {
  if (!theme) {
    return Theme.LIGHT;
  }
  const index = themeValues.indexOf(theme);
  return themeValues[(index + 1) % themeValues.length] as Theme;
};
