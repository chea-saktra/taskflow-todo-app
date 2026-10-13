import { Input } from "../../../../components";

export const TaskTitleField = ({ value = "", error = "", onInput } = {}) => {
  return Input({
    id: "task-title",
    name: "title",
    label: "Task Title",
    value,
    placeholder: "Enter task title...",
    maxlength: 100,
    required: true,
    error,
    events: { input: onInput },
  });
};
