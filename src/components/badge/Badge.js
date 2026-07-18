import { createElement } from "../../utils";
import "./badge.css";

export const Badge = (props = {}) => {
  const type = props.type || "category";

  return createElement("span", {
    className: `badge badge--${type.toLowerCase()} ${props.className || ""}`,
    textContent: props.text,
  });
};
