import { BaseState } from "./BaseState";

class UIState extends BaseState {
  constructor() {
    super();
    this.sidebarOpen = false;
  }

  isSidebarOpen() {
    return this.sidebarOpen;
  }

  openSidebar() {
    this.sidebarOpen = true;
    this.notify(this.sidebarOpen);
  }

  closeSidebar() {
    this.sidebarOpen = false;
    this.notify(this.sidebarOpen);
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.notify(this.sidebarOpen);
  }
}

export const uiState = new UIState();
