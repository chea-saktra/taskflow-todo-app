import { Select } from "../../../../components";
import { createElement } from "../../../../utils";

export const TaskFilterSelects = ({
  category = "all",
  priority = "all",
  status = "all",

  categories = [],
  priorities = [],
  statuses = [],

  onCategoryChange,
  onPriorityChange,
  onStatusChange,
} = {}) => {
  const selectConfigs = [
    {
      value: category,
      options: categories,
      onChange: onCategoryChange,
    },
    {
      value: priority,
      options: priorities,
      onChange: onPriorityChange,
    },
    {
      value: status,
      options: statuses,
      onChange: onStatusChange,
    },
  ];

  return createElement("div", {
    className: "task-filters__selects",
    children: selectConfigs.map(({ value, options, onChange }) =>
      Select({
        value,
        options,
        onChange,
      }),
    ),
  });
};
