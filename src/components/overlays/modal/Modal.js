import "./modal.css";
import { cnBEM, createElement } from "../../../utils";

export const Modal = ({
  open = false,
  title = "",
  description = "",
  children = null,
  footer = null,
  size = "md",
  variant = "modal",
  position = "right",
  showClose = true,
  closeOnOverlay = true,
  closeOnEscape = true,
  className = "",
  onClose,
} = {}) => {
  if (!open) return null;

  // Event Listener Cleanup
  let handleKeydown = null;

  const cleanup = () => {
    if (handleKeydown) {
      document.removeEventListener("keydown", handleKeydown);
    }
  };

  const handleClose = () => {
    cleanup();
    onClose?.();
  };

  // Keyboard (Escape) Listener
  if (closeOnEscape) {
    handleKeydown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleKeydown);
  }

  // Header Elements (Heading & Native Close Button)
  const headerChildren = [];

  if (title || description) {
    headerChildren.push(
      createElement("div", {
        className: "modal__heading",
        children: [
          title
            ? createElement("h2", {
                className: "modal__title",
                textContent: title,
              })
            : null,
          description
            ? createElement("p", {
                className: "modal__description",
                textContent: description,
              })
            : null,
        ].filter(Boolean),
      }),
    );
  }

  if (showClose) {
    const closeIcon = createElement("i", {
      attributes: { "data-lucide": "x" },
    });

    const closeButton = createElement("button", {
      className: "modal__close-btn",
      attributes: {
        type: "button",
        "aria-label": "Close modal",
      },
      children: [closeIcon],
      events: {
        click: handleClose,
      },
    });
    headerChildren.push(closeButton);
  }

  // Modal Content Body Assembly
  const modalChildren = [];
  if (headerChildren.length > 0) {
    modalChildren.push(
      createElement("header", {
        className: "modal__header",
        children: headerChildren,
      }),
    );
  }

  if (children) {
    modalChildren.push(
      createElement("div", {
        className: "modal__body",
        children: Array.isArray(children) ? children : [children],
      }),
    );
  }

  if (footer) {
    modalChildren.push(
      createElement("footer", {
        className: "modal__footer",
        children: Array.isArray(footer) ? footer : [footer],
      }),
    );
  }

  // Modal Dialog Box
  const dialogClass = [
    "modal__dialog",
    cnBEM("modal__dialog", size, size !== "md"),
    variant === "drawer" ? "modal__dialog--drawer" : "",
    variant === "drawer" ? `modal__dialog--drawer-${position}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const modalDialog = createElement("div", {
    className: dialogClass,
    attributes: {
      role: "dialog",
      "aria-modal": "true",
    },
    children: modalChildren,
    events: {
      click: (event) => {
        event.stopPropagation();
      },
    },
  });

  // Modal Overlay Container
  const overlayClass = [
    "modal",
    variant === "drawer" ? "modal--drawer" : "",
    variant === "drawer" ? `modal--drawer-${position}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const overlay = createElement("div", {
    className: overlayClass,
    attributes: {
      role: "presentation",
    },
    children: [modalDialog],
    events: {
      click: () => {
        if (closeOnOverlay) {
          handleClose();
        }
      },
    },
  });

  overlay.destroy = cleanup;

  return overlay;
};
