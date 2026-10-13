import { Input } from "../../../../components";
import { TASK_CATEGORY } from "../../../../constants";
import { capitalize } from "../../../../utils";

export const TaskDueDateField = ({
  value = "personal",
  error = "",
  onChange,
} = {}) => {
  return Input({
    id: "task-due-date",
    name: "dueDate",
    label: "Due Date",
    type: "date",
    value,
    error,
    events: { change: onChange },
  });
};
