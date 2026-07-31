import "./delete-confirmation.css";
import { TaskController } from "../../features/tasks/controller";
import { createElement } from "../../utils";
import { Button } from "../button/Button";

export const openDeleteModal = (taskId) => {
  const overlay = createElement("div", { className: "modal-overlay" });

  const iconContainer = createElement("div", {
    className: "delete-modal__icon-wrapper",
    children: [
      createElement("i", {
        attributes: { "data-lucide": "trash-2" },
      }),
    ],
  });

  const title = createElement("h3", {
    className: "delete-modal__title",
    textContent: "Delete this task?",
  });

  const description = createElement("p", {
    className: "delete-modal__description",
    textContent: "This action cannot be undone.",
  });

  const btnCancel = Button({
    variant: "secondary",
    className: "delete-modal__btn",
    text: "Cancel",
    events: {
      click: closeModal,
    },
  });

  const btnDelete = Button({
    variant: "danger",
    className: "delete-modal__btn",
    text: "Delete",
    events: {
      click: () => {
        TaskController.removeTask(taskId);
        closeModal();
      },
    },
  });

  const actionsGroup = createElement("div", {
    className: "delete-modal__actions",
    children: [btnCancel, btnDelete],
  });

  const modalContent = createElement("div", {
    className: "delete-modal__content",
    children: [iconContainer, title, description, actionsGroup],
  });

  overlay.append(modalContent);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  function closeModal() {
    overlay.classList.add("modal-overlay--leaving");
    setTimeout(() => {
      overlay.remove();
    }, 200);
  }
  
  requestAnimationFrame(() => {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  });

  document.body.append(overlay);
};
