import { STORAGE_KEY } from "../constants/storageKey";
import { themeState } from "../state/ThemeState";
import { StorageService } from "./StorageService";

class ThemeService {
  constructor() {
    this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  }

  init() {
    const savedTheme = StorageService.get(STORAGE_KEY.THEME);

    const initialTheme =
      savedTheme ?? (this.mediaQuery.matches ? "dark" : "light");

    this.apply(initialTheme);
    themeState.setTheme(initialTheme);
    themeState.subscribe((theme) => {
      this.apply(theme);
      StorageService.set(STORAGE_KEY.THEME, theme);
    });
  }

  apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }

  toggle() {
    themeState.toggleTheme();
  }

  getCurrentTheme() {
    return themeState.getTheme();
  }

  getSystemTheme() {
    return this.mediaQuery.matches ? "dark" : "light";
  }

  resetToSystem() {
    themeState.setTheme(this.getSystemTheme());
  }
}

export const themeService = new ThemeService();
