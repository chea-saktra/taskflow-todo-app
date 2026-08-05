import { BaseState } from "./BaseState";

class ThemeState extends BaseState {
  constructor() {
    super();
    this.theme = "light";
  }

  getTheme() {
    return this.theme;
  }

  setTheme(theme) {
    if (this.theme === theme) return;
    this.theme = theme;
    this.notify(this.theme);
  }

  toggleTheme() {
    this.setTheme(this.theme === "dark" ? "light" : "dark");
  }
}

export const themeState = new ThemeState();
