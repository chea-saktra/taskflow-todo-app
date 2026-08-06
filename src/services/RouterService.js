class RouterService {
  navigate(hash) {
    window.location.hash = hash;
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }

  getCurrentRoute() {
    return window.location.hash.replace("#", "") || "dashboard";
  }

  onChange(callback) {
    window.addEventListener("hashchange", () => {
      callback(this.getCurrentRoute());
    });
  }
}

export const routerService = new RouterService();
