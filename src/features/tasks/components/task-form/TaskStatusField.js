import { Select } from "../../../../components";
import { TASK_STATUS } from "../../../../constants";
import { capitalize } from "../../../../utils";

export const TaskStatusField = ({
  value = "todo",
  error = "",
  onChange,
} = {}) => {
  const options = Object.values(TASK_STATUS).map((status) => ({
    value: status,
    label: capitalize(status),
  }));

  return Select({
    id: "task-status",
    name: "status",
    label: "Status",
    value,
    options,
    placeholder: "Select status",
    error,
    onChange,
  });
};
