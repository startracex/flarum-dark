This expansion is based on `FoF nightmod`.

It will display a theme button on the left side of the session, log in/sign up,
which rotates once when clicked: Automatic, Light, Dark.

The default value is Automatic.

When the theme switches, it will:

- Save theme to `localStorage`.
- Dispatch `startracex-flarum-dark-change` event from `document`.
- Change style if necessary.

When the style changes, it will:

- Add `data-theme` to `documentElement` as the current theme.
- Change the content of `meta[name=color-scheme]` to the current theme.
