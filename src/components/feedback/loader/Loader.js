import "./loader.css";
import { cnBEM, createElement } from "../../../utils";

export const GlobalLoader = ({ visible = false, text = "Loading..." } = {}) => {
  const containerClass = [
    "global-loader",
    cnBEM
      ? cnBEM("global-loader", "visible", visible)
      : visible
        ? "is-visible"
        : "",
  ]
    .filter(Boolean)
    .join(" ");

  const backdrop = createElement("div", {
    className: "global-loader__backdrop",
  });

  const spinner = createElement("div", {
    className: "global-loader__spinner",
  });
  const label = createElement("span", {
    className: "global-loader__text",
    textContent: text,
  });
  const content = createElement("div", {
    className: "global-loader__content",
    children: [spinner, label],
  });
  return createElement("div", {
    className: containerClass,
    attributes: {
      role: "status",
      "aria-live": "polite",
      "aria-label": text,
    },
    children: [backdrop, content],
  });
};
