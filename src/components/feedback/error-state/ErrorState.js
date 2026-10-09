import { createElement } from "../../../utils";
import { Button } from "../../actions";

export const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't complete this action.",
  actionLabel = "Try Again",
  onAction,
} = {}) => {
  const iconElement = createElement("div", {
    className: "error-state__icon",
    children: [
      createElement("i", {
        attributes: {
          "data-lucide": "alert-circle",
        },
      }),
    ],
  });

  const titleElement = createElement("h2", {
    className: "error-state__title",
    textContent: title,
  });

  const messageElement = createElement("p", {
    className: "error-state__message",
    textContent: message,
  });

  const actionButton = onAction
    ? Button({
        text: actionLabel,
        icon: "refresh-cw",
        events: {
          click: onAction,
        },
      })
    : null;

  return createElement("section", {
    className: "error-state",
    attributes: {
      role: "alert",
    },
    children: [iconElement, titleElement, messageElement, actionButton].filter(
      Boolean,
    ),
  });
};
