import { createElement } from "../../../../utils";
import { getTaskMenuItems } from "../../config/taskConfig";
import { TaskDropdown } from "./TaskDropdown";
import { TaskFavoriteButton } from "./TaskFavoriteButton";

export const TaskActions = ({
  task = [],
  onFavorite,
  onEdit,
  onArchive,
  onDelete,
} = {}) => {
  const menuItems = getTaskMenuItems({ task, onEdit, onArchive, onDelete });

  return createElement("div", {
    className: "task-card__actions",
    children: [
      TaskFavoriteButton({
        active: Boolean(task.favorite || task.isFavorite),
        onClick: () => onFavorite?.(task.id),
      }),
      TaskDropdown({ items: menuItems }),
    ],
  });
};
