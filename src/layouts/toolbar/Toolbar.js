import { Button } from "../../components/button/Button";
import { Dropdown } from "../../components/dropdown/Dropdown";
import { InputField } from "../../components/input/Input";
import { SelectField } from "../../components/select/SelectField";
import { Tooltip } from "../../components/tooltip/Tooltip";
import { SortController } from "../../features/sort/controller";
import { createElement } from "../../utils";
import { openFilterModal } from "../../utils/openFilterModal";
import "./toolbar.css";

export const Toolbar = (props = {}) => {
  const btnFilter = Button({
    variant: "ghost",
    icon: "sliders-horizontal",
    className: "toolbar__icon-btn",
    attributes: { "aria-label": "Filter" },
    events: {
      click: () => openFilterModal(),
    },
  });

  const filterWithTooltip = Tooltip({
    element: btnFilter,
    text: "Filter tasks",
  });

  const btnSortTrigger = Button({
    variant: "ghost",
    icon: "arrow-up-down",
    className: "toolbar__icon-btn toolbar__sort-btn",
    attributes: { "aria-label": "Sort" },
  });
  
  const chevronIcon = createElement("i", {
    className: "toolbar__sort-chevron",
    attributes: {
      "data-lucide": "chevron-down",
    },
  });

  btnSortTrigger.append(chevronIcon);

  const sortWithTooltip = Tooltip({
    element: btnSortTrigger,
    text: "Sort tasks",
  });

  const sortItems = [
    {
      label: "Due Date (Earliest)",
      icon: "calendar",
      onClick: () => SortController.setSort("dueDate", "asc"),
    },
    {
      label: "Due Date (Latest)",
      icon: "calendar",
      onClick: () => SortController.setSort("dueDate", "desc"),
    },
    {
      label: "Priority (High to Low)",
      icon: "arrow-up-narrow-wide",
      onClick: () => SortController.setSort("priority", "desc"),
    },
    {
      label: "Title (A - Z)",
      icon: "arrow-down-a-z",
      onClick: () => SortController.setSort("title", "asc"),
    },
  ];

  const sortDropdown = Dropdown({
    trigger: sortWithTooltip,
    items: sortItems,
  });

  return createElement("section", {
    className: "app-toolbar",
    children: [filterWithTooltip, sortDropdown],
  });
};
