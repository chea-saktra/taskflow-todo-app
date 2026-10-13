import { TASK_STATUS } from "../../../../constants";
import { cnBEM, createElement } from "../../../../utils";
import "./task-card.css";
import { TaskActions } from "./TaskActions";
import { TaskCheckbox } from "./TaskCheckbox";
import { TaskContent } from "./TaskContent";

export const TaskCard = ({
  onToggle,
  isSelected = false,
  isSelectionMode = false,
  onSelect,

  task,
  onDetail,
  onFavorite,
  onEdit,
  onArchive,
  onDelete,
} = {}) => {
  const completed = task.status === TASK_STATUS.COMPLETED;
  const mianCheckbox = TaskCheckbox({
    checked: isSelectionMode ? isSelected : completed,
    onChange: (e) => {
      e.stopPropagation();
      if (isSelectionMode) {
        onSelect?.(task.id);
      } else {
        onToggle?.(task.id);
      }
    },
  });
  return createElement("article", {
    className: [
      cnBEM("task-card", "completed", completed),
      cnBEM("task-card", "selected", isSelected),
    ]
      .filter(Boolean)
      .join(" "),

    events: {
      click: (e) => {
        const isInteractive = e.target.closest(
          "button, input, .checkbox, .dropdown, .task-actions",
        );

        if (isInteractive) return;

        if (isSelectionMode) {
          onSelect?.(task.id);
        } else {
          onDetail?.(task);
        }
      },
    },
    children: [
      mianCheckbox,

      TaskContent({
        task,
      }),

      TaskActions({
        task,
        onFavorite,
        onEdit,
        onArchive,
        onDelete,
      }),
    ],
  });
};
