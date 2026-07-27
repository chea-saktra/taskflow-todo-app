import { createElement } from "../../utils/dom";
import "./tooltip.css";

export const Tooltip = (props = {}) => {
  const { element, text } = props;

  const tooltipBox = createElement("div", {
    className: "tooltip-box",
    textContent: text,
  });

  const wrapper = createElement("div", {
    className: "tooltip-container",
    children: [element, tooltipBox],
  });

  return wrapper;
};
