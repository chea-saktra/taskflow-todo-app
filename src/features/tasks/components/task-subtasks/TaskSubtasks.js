import "./task-subtasks.css";
import { EmptyState } from "../../../../components";
import { createElement } from "../../../../utils";
import { SubtaskForm } from "./SubtaskForm";
import { SubtaskItem } from "./SubtaskItem";
import { SubtaskProgress } from "./SubtaskProgress";

export const TaskSubtasks = ({
  subtasks = [],
  completed = 0,
  total = 0,
  progress = 0,
  onAdd,
  onToggle,
  onStartEdit,
  onCancelEdit,
  onEdit,
  onDelete,
} = {}) => {
  const items = subtasks.map((subtask) =>
    SubtaskItem({
      subtask,

      onToggle: (subtaskId) => {
        onToggle?.(subtaskId);
      },

      onStartEdit: (subtaskId) => {
        onStartEdit?.(subtaskId);
      },

      onCancelEdit: (subtaskId) => {
        onCancelEdit?.(subtaskId);
      },

      onEdit: (subtaskId, changes) => {
        onEdit?.(subtaskId, changes);
      },

      onDelete: (subtaskId) => {
        onDelete?.(subtaskId);
      },
    }),
  );

  return createElement("section", {
    className: "task-subtasks",
    children: [
      createElement("div", {
        className: "task-subtasks__header",
        children: [
          createElement("h3", {
            className: "task-subtasks__title",
            textContent: "Subtasks",
          }),

          createElement("span", {
            className: "task-subtasks__count",
            textContent: `${subtasks.length}`,
          }),
        ],
      }),

      SubtaskProgress({
        completed,
        total,
        progress,
      }),

      createElement("div", {
        className: "task-subtasks__list",
        children:
          items.length > 0
            ? items
            : EmptyState({
                icon: "list-checks",
                title: "No Subtasks yet",
                description: "Break this task into smaller steps.",
              }),
      }),

      SubtaskForm({
        onSubmit: onAdd,
      }),
    ],
  });
};
