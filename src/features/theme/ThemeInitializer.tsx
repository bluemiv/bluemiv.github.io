const THEME_SCRIPT = `(function(){try{var theme=localStorage.getItem("theme");var dark=theme==="dark"||(!theme&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",dark);}catch(e){}})();`;

export function ThemeInitializer() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
}
