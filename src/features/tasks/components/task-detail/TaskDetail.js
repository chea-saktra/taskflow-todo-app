import "./task-detail.css";
import { createElement } from "../../../../utils";
import { TaskSubtasks } from "../task-subtasks/TaskSubtasks";
import { TaskDetailDescription } from "./TaskDetailDescription";
import { TaskDetailHeader } from "./TaskDetailHeader";
import { TaskDetailInfo } from "./TaskDetailInfo";

export const TaskDetail = ({
  task,
  onClose,
  onEdit,
  onFavorite,
  onArchive,
  onDelete,

  subtasks,
  completed,
  total,
  progress,

  onAddSubtask,
  onToggleSubtask,
  onStartEdit,
  onCancelEdit,
  onUpdateSubtask,
  onRemoveSubtask,
} = {}) => {
  return createElement("section", {
    className: "task-detail",
    children: [
      TaskDetailHeader({
        task,
        onClose,
        onEdit,
        onFavorite,
        onArchive,
        onDelete,
      }),

      createElement("div", {
        className: "task-detail__body",
        children: [
          TaskDetailInfo({
            task,
          }),

          TaskDetailDescription({
            description: task.description,
          }),

          TaskSubtasks({
            subtasks,
            completed,
            total,
            progress,

            onAdd: onAddSubtask,
            onToggle: onToggleSubtask,
            onEdit: onUpdateSubtask,
            onStartEdit,
            onCancelEdit,
            onDelete: onRemoveSubtask,
          }),
        ],
      }),
    ],
  });
};
