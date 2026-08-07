import { getThemeInitializerScript } from "./themeConfig";

const THEME_SCRIPT = getThemeInitializerScript();

export function ThemeInitializer() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
}
