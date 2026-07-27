import "./tasks.css";
import { Button } from "../../components/button/Button";
import { TaskCard } from "../../components/task-card/TaskCard";
import { createElement } from "../../utils";
import { filterState } from "../../state/filter";
import { FilterController } from "../../features/filter/controller";
import { taskState } from "../../state/task";
import { SearchController } from "../../features/search/controller";
import { TaskController } from "../../features/tasks/controller";
import { openTaskModal } from "../../utils/modal-helper";
import { searchState } from "../../state/search";
import { Fab } from "../../components/fab/Fab";
import { Toolbar } from "../../layouts/toolbar/Toolbar";
import { sortState } from "../../state/sort";
import { SortController } from "../../features/sort/controller";

export const TasksView = () => {
  const btnNewTask = Button({
    className: "tasks-view__addtask-btn",
    variant: "primary",
    icon: "plus",
    text: "New Task",
    events: { click: () => openTaskModal() },
  });

  const toolbar = Toolbar();

  const header = createElement("div", {
    className: "tasks-view__header",
    children: [toolbar, btnNewTask],
  });

  const tabsContainer = createElement("nav", {
    className: "tasks-view__tabs",
  });

  const tableHeader = createElement("div", {
    className: "tasks-view__table-header",
    children: [
      createElement("input", {
        className: "tasks-view__select-all",
        attributes: { type: "checkbox", "aria-label": "Select all tasks" },
      }),
      createElement("span", {
        className: "tasks-view__th tasks-view__th--title",
        textContent: "Task",
      }),
      createElement("span", {
        className: "tasks-view__th tasks-view__th--category",
        textContent: "Category",
      }),
      createElement("span", {
        className: "tasks-view__th tasks-view__th--priority",
        textContent: "Priority",
      }),
      createElement("span", {
        className: "tasks-view__th tasks-view__th--date",
        textContent: "Due Date",
      }),
      createElement("span", {
        className: "tasks-view__th tasks-view__th--status",
        textContent: "Status",
      }),
      createElement("span", {
        className: "tasks-view__th tasks-view__th--category",
        textContent: "Action",
      }),
    ],
  });

  const listContent = createElement("div", {
    className: "tasks-view__list",
  });

  const updateUI = () => {
    const categories = ["All", "Work", "Study", "Personal", "Shopping"];
    const activeCategory = filterState.category || "All";

    tabsContainer.innerHTML = "";
    categories.forEach((cat) => {
      const isActive = activeCategory.toLowerCase() === cat.toLowerCase();

      const btnTab = createElement("button", {
        className: `tasks-view__tab-btn ${isActive ? "tasks-view__tab-btn--active" : ""}`,
        textContent: cat,
        events: {
          click: () => FilterController.setCategory(cat),
        },
      });
      tabsContainer.append(btnTab);
    });

    let currentTasks = taskState.getTasks();
    currentTasks = SearchController.applySearch(currentTasks);
    currentTasks = FilterController.applyFilter(currentTasks);
    currentTasks = SortController.applySort(currentTasks);
    listContent.innerHTML = "";
    currentTasks.forEach((task) => {
      const card = TaskCard({
        task,
        onToggle: (taskId) => TaskController.toggleTaskStatus(taskId),
        onFavorite: (taskId) => TaskController.toggleFavoriteTask(taskId),
        onEdit: (taskData) => openTaskModal(taskData),
        onDelete: (taskId) => {
          if (confirm("Are you sure you want to delete this task?")) {
            TaskController.removeTask(taskId);
          }
        },
      });
      listContent.append(card);
    });
    if (window.lucide) window.lucide.createIcons();
  };

  const unsubTask = taskState.subscribe(updateUI);
  const unsubFilter = filterState.subscribe(updateUI);
  const unsubSearch = searchState.subscribe(updateUI);
  const unsubSort = sortState.subscribe(updateUI);

  const btnFab = Fab({
    onClick: () => openTaskModal(),
  });

  const container = createElement("section", {
    className: "tasks-view",
    children: [header, tabsContainer, tableHeader, listContent, btnFab],
  });

  updateUI();
  container.onDestroy = () => {
    unsubTask();
    unsubFilter();
    unsubSearch();
    unsubSort();
  };

  return container;
};
