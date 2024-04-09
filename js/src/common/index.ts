import { changeEventName } from './event';
import { packageID } from './id';
import { Theme, storageKey } from './theme';
import app from 'flarum/common/app';
import type User from 'flarum/common/models/User';

/**
 * Media preferences theme.
 * @returns Light or Dark.
 */
export const mediaPreferences: () => Theme.DARK | Theme.LIGHT = () => {
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return Theme.DARK;
  }
  return Theme.LIGHT;
};

/**
 *  User preferences theme.
 * @returns Light, Dark orAuto.
 */
export const userPreferences: () => void | Theme = () => {
  return app.session?.user?.preferences()?.[packageID] || localStorage.getItem(storageKey);
};

/**
 * If user prefers Auto, return media theme.
 * @returns Light or Dark.
 */
export const preferTheme = () => {
  const u = userPreferences();
  if (!u || u === Theme.AUTO) {
    return mediaPreferences();
  }
  return u;
};

/**
 * Get assets URL.
 * @param t Theme.
 * @returns App data key.
 */
export const assetsURL = (t: Theme.DARK | Theme.LIGHT) => {
  return `${packageID}.assets.${t}`;
};

/**
 * Set page theme.
 * @param t Theme.
 */
export const setStyle = (t: Theme) => {
  if (t === Theme.AUTO) {
    t = mediaPreferences();
  }
  let link = document.querySelector<HTMLLinkElement>(`link.theme-mode-link`);
  if (!link) {
    link = document.createElement('link');
    link.rel = 'stylesheet';
    link.classList.add('theme-mode-link');
    document.head.appendChild(link);
  }
  link.href = app.data[assetsURL(t)] as string;

  const colorScheme = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');

  if (colorScheme) {
    colorScheme.content = t;
  } else {
    const meta = document.createElement('meta');
    meta.name = 'color-scheme';
    meta.content = t;
    document.head.appendChild(meta);
  }

  document.documentElement.setAttribute('data-theme', t);
};

/**
 * Update page theme to t, save to localStorage and dispatch event.
 * @param t Theme
 * @param user session user (if exists).
 */
export const updateTheme = (t: Theme, user?: User | null) => {
  localStorage.setItem(storageKey, t);
  document.dispatchEvent(new CustomEvent(changeEventName, { detail: t }));
  if (user) {
    user
      .savePreferences({
        [packageID]: t,
      })
      .then(() => {
        setStyle(t);
      });
  } else {
    setStyle(t);
  }
};
