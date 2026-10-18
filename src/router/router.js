import { routerService } from "../services";
import { routes } from "./routes";

class Router {
  render(container) {
    if (!container) return;
    const currentRoute = routerService.getCurrentRoute();
    const View = routes[currentRoute] || routes.dashboard;
    const result = View(container);

    if (result instanceof Node) {
      container.replaceChildren(result);
    }
  }
}

export const router = new Router();
