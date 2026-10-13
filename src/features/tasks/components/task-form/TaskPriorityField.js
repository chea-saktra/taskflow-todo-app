import { Select } from "../../../../components";
import { TASK_PRIORITY } from "../../../../constants";
import { capitalize } from "../../../../utils";

export const TaskPriorityField = ({
  value = "medium",
  error = "",
  onChange,
} = {}) => {
  const options = Object.values(TASK_PRIORITY).map((priority) => ({
    value: priority,
    label: capitalize(priority),
  }));

  return Select({
    id: "task-priority",
    name: "priority",
    label: "Priority",
    value,
    options,
    placeholder: "Select priority",
    error,
    onChange,
  });
};
