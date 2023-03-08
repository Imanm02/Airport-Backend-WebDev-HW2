export interface DefaultCssVarsTheme {
    colorSchemes: Record<string, any>;
}
declare function prepareCssVars<T extends DefaultCssVarsTheme, ThemeVars>(theme: T, parserConfig?: {
    prefix?: string;
    shouldSkipGeneratingVar?: (objectPathKeys: Array<string>, value: string | number) => boolean;
}): {
    vars: ThemeVars;
    generateCssVars: (colorScheme?: string) => any;
};
export default prepareCssVars;
