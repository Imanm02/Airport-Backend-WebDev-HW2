import { DefaultCssVarsTheme } from './prepareCssVars';
interface Theme extends DefaultCssVarsTheme {
    cssVarPrefix?: string;
    shouldSkipGeneratingVar?: (objectPathKeys: Array<string>, value: string | number) => boolean;
}
declare function createCssVarsTheme<T extends Theme, ThemeVars>(theme: T): T & {
    vars: ThemeVars;
    generateCssVars: (colorScheme?: string | undefined) => any;
};
export default createCssVarsTheme;
