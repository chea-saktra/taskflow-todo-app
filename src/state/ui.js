const state = {
  isSidebarOpen: false,
};

const listeners = [];

export const uiState = {
  isOpen() {
    return state.isSidebarOpen;
  },

  toggleSidebar() {
    state.isSidebarOpen = !state.isSidebarOpen;
    this._notify();
  },

  subscribe(listener) {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1);
    };
  },

  _notify() {
    listeners.forEach((listener) => listener(state.isSidebarOpen));
  },
};
