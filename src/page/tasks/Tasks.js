import "./tasks.css";
import { EmptyState } from "../../components";
import { TaskFilters } from "../../features/tasks/components/task-filters/TaskFilters";
import { TaskList } from "../../features/tasks/components/task-list/TaskList";
import { TaskModal } from "../../features/tasks/components/task-modal/TaskModal";
import { TaskToolbar } from "../../features/tasks/components/task-toolbar/TaskToolbar";
import { Page, PageContent, PageHeader } from "../../layouts";
import { createElement } from "../../utils";

export const TaskPage = ({
  tasks = [],
  search = "",
  filters = {},
  view = "all",
  sortBy = "createdAt",
  sortOrder = "desc",

  selectedIds = [],
  isSelectionMode,
  allSelected,

  modal = { open: false, mode: "create", task: null },

  // Event Handlers
  onSearch,
  onFilter,
  onReset,
  onViewChange,
  onSortChange,

  onSelect,
  onSelectAll,
  onToggleSelectMode,

  onToggle,
  onFavorite,
  onArchive,
  onDelete,

  onAdd,
  onEdit,
  onDetail,
  onSubmitTask,
  onCloseModal,
  onFormInput,
  onFormChange,

  // Subtask Handleers
  onAddSubtask,
  onToggleSubtask,
  onStartEditSubtask,
  onCancelEditSubtask,
  onUpdateSubtask,
  onRemoveSubtask,

  // Bulk Handleers
  onCompleteSelected,
  onArchiveSelected,
  onDeleteSelected,
} = {}) => {
  const hasTasks = tasks.length > 0;
  const listContent = hasTasks
    ? TaskList({
        onToggle,
        selectedIds,
        isSelectionMode,
        allSelected,
        tasks,

        onSelect,
        onSelectAll,

        onDetail,
        onEdit,
        onDelete,
        onArchive,
        onFavorite,
      })
    : EmptyState({
        icon: "inbox",
        title: "No tasks found",
        description: "Create your first task to get started.",
        actionLabel: "Create Task",
        actionIcon: "plus",
        onAction: onAdd,
      });

  const pageHeader = PageHeader({
    title: "Tasks",
    subtitle: "Manage and organize your tasks.",
  });

  const pageContent = PageContent({
    className: "task-page",
    children: [
      createElement("section", {
        className: "task-page__controls",
        children: [
          TaskFilters({
            search,
            filters,
            onSearch,
            onFilter,
            onReset,
          }),
          createElement("hr", { className: "task-page__controls-divider" }),
          TaskToolbar({
            view,
            sortBy,
            sortOrder,
            selectedCount: selectedIds.length,
            isSelectionMode,
            allSelected,

            onViewChange,
            onSortChange,
            onAdd,

            onToggleSelectMode,
            onSelectAll,
            onCompleteSelected,
            onArchiveSelected,
            onDeleteSelected,
          }),
        ],
      }),

      createElement("section", {
        className: "task-page__content",
        children: [listContent],
      }),
      modal.open
        ? TaskModal({
            mode: modal.mode,
            task: modal.task,

            values: modal.values,
            errors: modal.errors,

            onSubmit: onSubmitTask,
            onClose: onCloseModal,

            onFormInput,
            onFormChange,

            onEdit,
            onFavorite,
            onArchive,
            onDelete,

            onAddSubtask,
            onToggleSubtask,
            onStartEdit: onStartEditSubtask,
            onCancelEdit: onCancelEditSubtask,
            onUpdateSubtask,
            onRemoveSubtask,
          })
        : null,
    ].filter(Boolean),
  });
  return Page({
    header: pageHeader,
    content: pageContent,
  });
};
