import { packageID } from './id';
import type { Theme } from './theme';

export const changeEventName = `${packageID}-change`;

declare global {
  interface DocumentEventMap {
    [changeEventName]: ThemeChangeEvent;
  }
}

export interface ThemeChangeEvent {
  detail: Theme;
}
