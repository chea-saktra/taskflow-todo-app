import "./task-filters.css";
import { Button } from "../../../../components";
import { createElement } from "../../../../utils";
import { TaskFilterSearch } from "./TaskFiltersSearch";
import { TaskFilterSelects } from "./TaskFiltersSelects";
import { FILTER_OPTIONS } from "../../config/taskConfig";

export const TaskFilters = ({
  search = "",
  filters = {},

  onSearch,
  onFilter,
  onReset,
} = {}) => {
  const { categories, priorities, statuses } = FILTER_OPTIONS;

  return createElement("section", {
    className: "task-filters",
    children: [
      TaskFilterSearch({
        value: search,
        onInput: onSearch,
      }),

      TaskFilterSelects({
        category: filters.category || "all",
        priority: filters.priority || "all",
        status: filters.status || "all",

        categories,
        priorities,
        statuses,

        onCategoryChange: (val) => onFilter?.({ category: val }),
        onPriorityChange: (val) => onFilter?.({ priority: val }),
        onStatusChange: (val) => onFilter?.({ status: val }),
      }),

      Button({
        text: "Reset",
        variant: "danger",
        className: "task-filters__reset",
        events: {
          click: () => onReset?.(),
        },
      }),
    ],
  });
};
