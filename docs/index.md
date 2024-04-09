## Theme changes

When the theme switches, it will:

- Save theme to `localStorage`.
- Dispatch `startracex-flarum-dark-change` event from `document`.
- Change style if necessary.

When the style changes, it will:

- Add `data-theme` to `documentElement` as the current theme.
- Change the content of `meta[name=color-scheme]` to the current theme.

## Assets

It will create `forum-dark.css` and `admin-dark.css` under assets directory.

Version 0.0.0 incorrectly creates files `forum--dark.css` and `admin--dark.css`, which can be removed.

## Extension

This expansion requires turning off `Dark Mode` in Appearance.

Some tag labels would incorrectly apply styles, Specifying a color for it in `flarum/tags` to resolve this problem.

This extension is based on and replaces [fof/nightmode](https://github.com/FriendsOfFlarum/nightmode).
