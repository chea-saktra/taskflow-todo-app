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
    dhildren: [element, tooltipBox],
  });

  return wrapper;
};
