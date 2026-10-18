class RouterService {
  navigate(route) {
    const cleanRoute = route.replace(/^#/, "");
    const path =
      cleanRoute === "dashboard" || cleanRoute === "" ? "/" : `/${cleanRoute}`;
    if (window.location.pathname === path) return;
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }

  getCurrentRoute() {
    const path = window.location.pathname.replace(/^\//, "");
    return path || "dashboard";
  }

  onChange(callback) {
    const handleChange = () => {
      callback(this.getCurrentRoute());
    };

    window.addEventListener("popstate", handleChange);

    return () => window.removeEventListener("popstate", handleChange);
  }
}

export const routerService = new RouterService();
