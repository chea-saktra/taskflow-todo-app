import { createElement } from "../../utils";
import "./modal.css";

export const Modal = (props = {}) => {
  const { content, onClose } = props;

  const card = createElement("div", {
    className: "modal-card",
    events: { click: (e) => e.stopPropagation() },
    children: content,
  });

  const overlay = createElement("div", {
    className: "modal-overlay",
    events: { click: onClose },
    children: card,
  });

  return overlay;
};
