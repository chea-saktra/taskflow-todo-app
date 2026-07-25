import "./task-form.css";
import { TaskController } from "../../features/tasks/controller";
import { createElement, select } from "../../utils";
import { Button } from "../button/Button";
import { Dropdown } from "../dropdown/Dropdown";
import { InputField } from "../input/Input";
import { SelectField } from "../select/SelectField";
import { showToast } from "../toast/Toast";
import { SubtaskInput } from "../subtask/SubtaskInput";

export const TaskForm = (props = {}) => {
  const { initialData = {}, onClose, onSubmitSuccess } = props;
  const isEdit = Boolean(initialData.id);
  let isFavorite = Boolean(initialData.isFavorite);

  let selectedCategory = initialData.category || "work";
  let selectedPriority = initialData.priority || "medium";

  const titleInput = InputField({
    label: "Title ",
    placeholder: "e.g., Completed Project Proposal",
    value: initialData.title || "",
  });

  const descInput = InputField({
    type: "textarea",
    label: "Description",
    placeholder: "Add details about this task...",
    value: initialData.description || "",
    attributes: { rows: "3" },
  });

  const categorySelect = SelectField({
    label: "Category",
    value: initialData.category || "work",
    options: [
      { label: "Work", value: "work", icon: "briefcase" },
      { label: "Study", value: "study", icon: "book-open" },
      { label: "Personal", value: "personal", icon: "user" },
      { label: "Shopping", value: "shopping", icon: "shopping-bag" },
    ],
  });

  const prioritySelect = SelectField({
    label: "Priority",
    value: initialData.priority || "medium",
    options: [
      { label: "Low", value: "low", color: "#10b981" },
      { label: "Medium", value: "medium", color: "#f59e0b" },
      { label: "High", value: "high", color: "#ef4444" },
    ],
  });

  const dueDateInput = InputField({
    type: "date",
    label: "Due Date",
    value: initialData.dueDate || new Date().toISOString().split("T")[0],
  });

  const timeInput = InputField({
    type: "time",
    label: "Time",
    value: initialData.time || "10:00",
  });

  const favoriteToggle = createElement("div", {
    className: "form-field task-form__favorite-field",
    children: [
      createElement("label", {
        className: "task-form__favorite-label",
        textContent: "Favorite",
      }),
      createElement("label", {
        className: "switch",
        children: [
          createElement("input", {
            attributes: {
              type: "checkbox",
              ...(isFavorite ? { checked: true } : {}),
            },
            events: {
              change: (e) => {
                isFavorite = e.target.checked;
              },
            },
          }),
          createElement("span", { className: "slider round" }),
        ],
      }),
    ],
  });

  const subtaskInput = SubtaskInput({
    label: "Subtasks",
    initialItems: initialData.subtasks || [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const titleVal = select("input", titleInput)?.value.trim() || "";
    const descVal = select("textarea", descInput)?.value.trim() || "";
    const dueDateVal = select("input", dueDateInput)?.value || "";

    if (!titleVal) {
      showToast("Please enter a task title", "error");
      return;
    }

    const formData = {
      title: titleVal,
      description: descVal,
      category: categorySelect.getValue(),
      priority: prioritySelect.getValue(),
      dueDate: dueDateVal,
      time: select("input", timeInput)?.value || "",
      isFavorite,
      subtasks: subtaskInput.getValue(),
    };

    let success = false;

    if (isEdit) {
      TaskController.editTask(initialData.id, formData);
      success = true;
    } else {
      success = TaskController.createNewTask(formData);
    }

    if (success) {
      if (onSubmitSuccess) onSubmitSuccess();
      if (onClose) onClose();
    }
  };

  const formEl = createElement("form", {
    className: "task-form",
    events: { submit: handleSubmit },
    children: [
      createElement("div", {
        className: "task-form__header",
        children: [
          createElement("h3", {
            className: "task-form__title",
            textContent: isEdit ? "Edit Task" : "Create New Task",
          }),
          createElement("button", {
            className: "task-form__close-btn",
            attributes: { type: "button" },
            events: { click: onClose },
            children: [
              createElement("i", { attributes: { "data-lucide": "x" } }),
            ],
          }),
        ],
      }),
      titleInput,
      descInput,
      createElement("div", {
        className: "form-row",
        children: [categorySelect, prioritySelect],
      }),
      createElement("div", {
        className: "form-row",
        children: [dueDateInput, timeInput],
      }),
      favoriteToggle,
      subtaskInput,
      createElement("div", {
        className: "task-form__actions",
        children: [
          Button({
            text: "Cancel",
            variant: "secondary",
            attributes: { type: "button" },
            events: { click: onClose },
          }),
          Button({
            text: isEdit ? "Save Change" : "Create Task",
            variant: "primary",
            attributes: { type: "submit" },
          }),
        ],
      }),
    ],
  });

  setTimeout(() => {
    if (window.lucide) window.lucide.createIcons();
  }, 0);

  return formEl;
};
