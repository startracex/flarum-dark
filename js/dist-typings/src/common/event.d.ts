import type { Theme } from './theme';
export declare const changeEventName = "startracex-flarum-dark-change";
declare global {
    interface DocumentEventMap {
        [changeEventName]: ThemeChangeEvent;
    }
}
export interface ThemeChangeEvent {
    detail: Theme;
}
