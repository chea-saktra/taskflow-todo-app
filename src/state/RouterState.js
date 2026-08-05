import { BaseState } from "./BaseState";

class RouterState extends BaseState {
  constructor() {
    super();
    this.currentRoute = "dashboard";
  }

  getRoute() {
    return this.currentRoute;
  }

  navigate(route) {
    if (!route || this.currentRoute === route) return;
    this.currentRoute = route;
    this.notify(this.currentRoute);
  }
}

export const routerState = new RouterState();
