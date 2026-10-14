import { ArchiveList } from "../../features/archive/components/archive-list/ArchiveList";
import { ArchiveToolbar } from "../../features/archive/components/archive-toolbar/ArchiveToolbar";
import { Page, PageContent, PageHeader } from "../../layouts";
import { createElement } from "../../utils";
import "./archive.css";

export const ArchivePage = ({
  tasks = [],
  search = "",
  sortBy = "updatedAt",
  sortOrder = "desc",
  selectedIds = [],
  onSearch,
  onSortChange,
  onSelect,
  onSelectAll,
  onRestore,
  onRestoreSelected,
  onDelete,
  onDeleteSelected,
  onDeleteAll,
}) => {
  const countBadge =
    tasks.length > 0
      ? createElement("span", {
          className: "archive-page__count",
          textContent: `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`,
        })
      : null;

  const header = PageHeader({
    title: "Archived Tasks",
    subtitle: "View and manage your archived tasks.",
    actions: [countBadge].filter(Boolean),
  });

  const toolbar = ArchiveToolbar({
    search,
    sortBy,
    sortOrder,
    onSearch,
    onSortChange,
    onDeleteAll,
  });

  const list = ArchiveList({
    tasks,
    selectedIds,
    onSelect,
    onDeselectAll: () => onSelectAll?.(false),
    onSelectAll,
    onRestore,
    onRestoreSelected,
    onDelete,
    onDeleteSelected,
  });

  const content = PageContent({
    children: [
      createElement("div", {
        className: "archive-page__content",
        children: [toolbar, list].filter(Boolean),
      }),
    ],
  });

  return Page({
    header,
    content,
  });
};
