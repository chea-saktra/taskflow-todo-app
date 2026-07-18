import { createElement } from "../../utils/dom";
import "./toast.css";

let toastContainer = null;
const getToastContainer = () => {
  if (!toastContainer) {
    toastContainer = createElement("div", {
      className: "toast-container",
    });
    document.body.append(toastContainer);
  }
  return toastContainer;
};

export const showToast = (message, type = "success", duration = 3000) => {
  const container = getToastContainer();
  const iconMap = {
    success: "check-circle",
    error: "alert-triangle",
    info: "info",
  };

  const toast = createElement("div", {
    className: `toast toast--${type}`,
    children: [
      createElement("div", {
        className: `toast__icon toast__icon--${type}`,
        children: createElement("i", {
          attributes: { "data-lucide": iconMap[type] || "info" },
        }),
      }),
      createElement("span", {
        className: "toast__message",
        textContent: message,
      }),
    ],
  });

  container.append(toast);

  if (window.lucide) {
    window.lucide.createIcons();
  }

  setTimeout(() => {
    toast.style.animation = "slideIn var(--pr-anim-normal) reverse forwards";
    toast.addEventListener("animationend", () => toast.remove());
  }, duration);
};
