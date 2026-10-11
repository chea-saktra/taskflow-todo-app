import "./confirm-modal.css";
import { createElement } from "../../../utils";

export const ConfirmModal = ({
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item? This action cannot be undone",
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
} = {}) => {
  const actions = createElement("div", {
    className: "confirm-modal__actions",
    children: [
      createElement("button", {
        className: "btn btn-secondary",
        textContent: cancelText,
        events: {
          click: () => onCancel?.(),
        },
      }),
      createElement("button", {
        className: "btn btn--danger",
        textContent: confirmText,
        events: {
          click: () => onConfirm?.(),
        },
      }),
    ],
  });

  const overlay = createElement("div", {
    className: "confirm-modal__overlay",
    events: {
      click: (e) => {
        if (e.target === overlay) {
          onCancel?.();
        }
      },
    },
    children: [
      createElement("div", {
        className: "confirm-modal__content",
        children: [
          createElement("h3", {
            className: "confirm-modal__title",
            textContent: title,
          }),
          createElement("p", {
            className: "confirm-modal__message",
            textContent: message,
          }),
          actions,
        ],
      }),
    ],
  });

  return overlay;
};
