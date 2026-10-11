import "./search-filters.css";
import { Select } from "../../../../components";
import { createElement } from "../../../../utils";
import { SEARCH_FILTERS_CONFIG } from "../../../../constants/search";

export const searchFilter = ({
  category = "all",
  priority = "all",
  status = "all",
  onFilterCategory,
  onFilterPriority,
  onFilterStatus,
} = {}) => {
  const currentValues = { category, priority, status };
  const filterHandlers = {
    category: onFilterCategory,
    priority: onFilterPriority,
    status: onFilterStatus,
  };

  const selects = SEARCH_FILTERS_CONFIG.map(({ key, options }) =>
    Select({
      value: currentValues[key],
      options,
      onChange: (value) => filterHandlers[key]?.(value),
    }),
  );

  return createElement("div", {
    className: "search-filters",
    children: selects,
  });
};
