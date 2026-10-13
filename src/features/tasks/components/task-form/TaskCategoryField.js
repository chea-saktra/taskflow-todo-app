import { Select } from "../../../../components";
import { TASK_CATEGORY } from "../../../../constants";
import { capitalize } from "../../../../utils";

export const TaskCategoryField = ({
  value = "personal",
  error = "",
  onChange,
} = {}) => {
  const options = Object.values(TASK_CATEGORY).map((category) => ({
    value: category,
    label: capitalize(category),
  }));

  return Select({
    id: "task-category",
    name: "category",
    label: "Category",
    value,
    options,
    placeholder: "Select category",
    error,
    onChange,
  });
};
