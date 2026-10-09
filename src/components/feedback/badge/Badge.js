import { createElement } from "../../../utils";
import "./badge.css";

export const Badge = ({
  text = "",
  type = "default",
  size = "md",
  variant = "solid",
} = {}) => {
  return createElement("span", {
    className: [
      "badge",
      `badge--${type}`,
      `badge--${size}`,
      `badge--${variant}`,
    ].join(" "),
    textContent: text,
  });
};
