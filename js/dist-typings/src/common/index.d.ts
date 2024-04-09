import { Theme } from './theme';
import type User from 'flarum/common/models/User';
/**
 * Media preferences theme.
 * @returns Light or Dark.
 */
export declare const mediaPreferences: () => Theme.DARK | Theme.LIGHT;
/**
 *  User preferences theme.
 * @returns Light, Dark orAuto.
 */
export declare const userPreferences: () => void | Theme;
/**
 * If user prefers Auto, return media theme.
 * @returns Light or Dark.
 */
export declare const preferTheme: () => Theme.LIGHT | Theme.DARK;
/**
 * Get assets URL.
 * @param t Theme.
 * @returns App data key.
 */
export declare const assetsURL: (t: Theme.DARK | Theme.LIGHT) => string;
/**
 * Set page theme.
 * @param t Theme.
 */
export declare const setStyle: (t: Theme) => void;
/**
 * Update page theme to t, save to localStorage and dispatch event.
 * @param t Theme
 * @param user session user (if exists).
 */
export declare const updateTheme: (t: Theme, user?: User | null) => void;
