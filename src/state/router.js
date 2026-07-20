const state = {
  currentRoute: "dashboard",
};

const listeners = [];

export const routerState = {
  getRoute() {
    return state.currentRoute;
  },

  navigate(routeId) {
    if (state.currentRoute === routeId) return;
    state.currentRoute = routeId;
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
    listeners.forEach((listener) => listener(state.currentRoute));
  },
};
