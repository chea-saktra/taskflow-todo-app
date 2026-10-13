import { Select } from "../../../../components";
import { TOOLBAR_SORT } from "../../../../constants";
import { createElement } from "../../../../utils";

export const TaskToolbarSort = ({
  sortBy = "createdAt",
  sortOrder = "desc",
  onChange,
} = {}) => {
  const currentValue = `${sortBy}:${sortOrder}`;
  const sortOptions = TOOLBAR_SORT.map((option) => ({
    value: `${option.sortBy}:${option.sortOrder}`,
    label: option.label,
  }));

  return createElement("div", {
    className: "task-toolbar__sort",
    children: [
      createElement("span", {
        className: "task-toolbar__sort-label",
        textContent: "Sort",
      }),
      Select({
        value: currentValue,
        options: sortOptions,

        onChange: (value) => {
          const [nextSortBy, nextSortOrder] = value.split(":");
          onChange?.(nextSortBy, nextSortOrder);
        },
      }),
    ],
  });
};
