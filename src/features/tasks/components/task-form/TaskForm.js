import "./task-form.css";
import { Button } from "../../../../components";
import { createElement } from "../../../../utils";
import { TaskCategoryField } from "./TaskCategoryField";
import { TaskDescritpionField } from "./TaskDescriptionField";
import { TaskDueDateField } from "./TaskDueDateField";
import { TaskPriorityField } from "./TaskPriorityField";
import { TaskStatusField } from "./TaskStatusField";
import { TaskTitleField } from "./TaskTitleField";
import { TaskSubtasks } from "../task-subtasks/TaskSubtasks";

export const TaskForm = ({
  values = {},
  errors = {},
  submitLabel = "Create Task",
  cancelLabel = "Cancel",

  subtasks,
  completed,
  total,
  progress,

  onAddSubtask,
  onToggleSubtask,
  onStartEditSubtask,
  onCancelEditSubtask,
  onUpdateSubtask,
  onRemoveSubtask,

  onSubmit,
  onCancel,
  onInput,
  onChange,
} = {}) => {
  const formData = { ...values };

  const form = createElement("form", {
    className: "task-form",
    attributes: {
      novalidate: true,
    },
    events: {
      submit: (event) => {
        event.preventDefault();
        onSubmit?.(formData);
      },
    },
    children: [
      TaskTitleField({
        value: formData.title,
        error: errors.title,
        onInput: (e) => {
          formData.title = e.target.value;
          onInput?.(e);
        },
      }),
      TaskDescritpionField({
        value: formData.description,
        error: errors.description,
        onInput: (e) => {
          formData.description = e.target.value;
          onInput?.(e);
        },
      }),
      createElement("div", {
        className: "task-form__row",
        children: [
          TaskCategoryField({
            value: formData.category,
            error: errors.category,
            onChange: (value) => {
              formData.category = value;
              onChange?.({ target: { name: "category", value } });
            },
          }),
          TaskPriorityField({
            value: formData.priority,
            error: errors.priority,
            onChange: (value) => {
              formData.priority = value;
              onChange?.({ target: { name: "priority", value } });
            },
          }),
        ],
      }),

      TaskSubtasks({
        subtasks,
        completed,
        total,
        progress,

        onAdd: onAddSubtask,
        onToggle: onToggleSubtask,
        onStartEdit: onStartEditSubtask,
        onCancelEdit: onCancelEditSubtask,
        onEdit: onUpdateSubtask,
        onDelete: onRemoveSubtask,
      }),

      createElement("div", {
        className: "task-form__row",
        children: [
          TaskStatusField({
            value: formData.status,
            error: errors.status,
            onChange: (value) => {
              formData.status = value;
              onChange?.({ target: { name: "status", value } });
            },
          }),
          TaskDueDateField({
            value: formData.dueDate,
            error: errors.dueDate,
            onChange: (e) => {
              formData.dueDate = e.target ? e.target.value : e;
              onChange?.(e);
            },
          }),
        ],
      }),

      createElement("div", {
        className: "task-form__actions",
        children: [
          Button({
            type: "button",
            variant: "secondary",
            text: cancelLabel,
            size: "lg",
            events: {
              click: () => onCancel?.(),
            },
          }),
          Button({
            type: "submit",
            variant: "primary",
            size: "lg",
            text: submitLabel,
          }),
        ],
      }),
    ],
  });

  return form;
};
