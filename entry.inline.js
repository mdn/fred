import {
  applyColorTheme,
  loadColorTheme,
} from "./components/color-theme/utils.js";

const mode = loadColorTheme();
if (mode) {
  applyColorTheme(mode);
}
