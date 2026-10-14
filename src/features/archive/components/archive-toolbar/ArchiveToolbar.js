import "./archive-toolbar.css";
import { Button, Icon, Input, Select } from "../../../../components";
import { createElement } from "../../../../utils";
import {
  parseSortValue,
} from "../../config/archiveConfig";
import { ARCHIVE_SORT_OPTIONS } from "../../../../constants";

export const ArchiveToolbar = ({
  search = "",
  sortBy = "updatedAt",
  sortOrder = "desc",
  onSearch,
  onSortChange,
  onDeleteAll,
} = {}) => {
  const searchInput = Input({
    type: "search",
    value: search,
    placeholder: "Search archived tasks...",
    className: "archive-toolbar__search-input",
    attributes: {
      "aria-label": "Search archived tasks",
    },
    events: {
      input: (event) => onSearch?.(event.target.value),
    },
  });

  const searchBox = createElement("div", {
    className: "archive-toolbar__search",
    children: [Icon({ name: "search", size: "sm" }), searchInput],
  });

const sortSelect = Select({
  value: `${sortBy}-${sortOrder}`,
  options: ARCHIVE_SORT_OPTIONS,
  placeholder: "Sort by...",
  onChange: (selectedValue) => {
    const { sortBy: nextSortBy, sortOrder: nextSortOrder } =
      parseSortValue(selectedValue);
    onSortChange?.(nextSortBy, nextSortOrder);
  },
});

  const sortBox = createElement("div", {
    className: "archive-toolbar__sort",
    children: [Icon({ name: "arrow-up-down", size: "sm" }), sortSelect],
  });

  const deleteAllButton = Button({
    text: "Delete All",
    icon: "trash-2",
    variant: "danger",
    size: "sm",
    className: "archive-toolbar__delete-all",
    attributes: {
      "aria-label": "Delete all archived tasks",
    },
    events: {
      click: () => onDeleteAll?.(),
    },
  });

  return createElement("div", {
    className: "archived-toolbar",
    children: [
      searchBox,
      createElement("div", {
        className: "archive-toolbar__actions",
        children: [sortBox, deleteAllButton],
      }),
    ],
  });
};
