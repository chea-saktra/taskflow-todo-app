import { createElement } from "../../../utils";
import "./toast.css";

const ICONS = {
  success: "check-circle",
  error: "x-circle",
  warning: "alert-triangle",
  info: "info",
};

export const Toast = ({ id, type = "info", message = "", onClose } = {}) => {
  const closeButton = createElement("button", {
    className: "toast__close",
    attributes: {
      type: "button",
      "aria-label": "Close notification",
    },
    children: [
      createElement("i", {
        attributes: {
          "data-lucide": "x",
        },
      }),
    ],
    events: {
      click: () => onClose?.(id),
    },
  });

  return createElement("div", {
    className: `toast toast--${type}`,
    attributes: {
      role: type === "error" ? "alert" : "status",
      "data-toast-id": id,
    },
    children: [
      createElement("div", {
        className: "toast__icon",
        children: [
          createElement("i", {
            attributes: { "data-lucide": ICONS[type] || ICONS.info },
          }),
        ],
      }),

      createElement("div", {
        className: "toast__content",
        children: [
          createElement("p", {
            className: "toast__message",
            textContent: message,
          }),
        ],
      }),
      
      closeButton,
    ],
  });
};
