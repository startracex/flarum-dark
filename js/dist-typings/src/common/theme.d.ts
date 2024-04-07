export declare enum Theme {
    AUTO = "auto",
    LIGHT = "light",
    DARK = "dark"
}
export declare const storageKey = "Theme";
/**
 * Loop through the themes.
 * Auto -> Light -> Dark -> Auto.
 */
export declare const nextTheme: (theme?: Theme) => Theme;
