import "./tasks.css";
import { Button } from "../../components/button/Button";
import { TaskCard } from "../../components/task-card/TaskCard";
import { createElement } from "../../utils";

export const TasksView = (props = {}) => {
  const {
    tasks = [],
    categories = [],
    activeCategory = "All",
    onCategoryChange,
    onToggleTask,
    onTaskAction,
    onNewTask,
  } = props;

  const title = createElement("h2", {
    className: "tasks-view__title m-0",
    textContent: "All Tasks",
  });

  const btnNewTask = Button({
    className: "tasks-view__addtask-btn",
    variant: "primary",
    icon: "plus",
    text: "New Task",
    events: { click: () => onNewTask && onNewTask() },
  });

  const header = createElement("div", {
    className: "tasks-view__header",
    children: [
      title,
      createElement("div", {
        className: "tasks-view__actions",
        children: [btnNewTask],
      }),
    ],
  });

  const tabButtons = categories.map((cat) => {
    const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
    return createElement("button", {
      className: `tasks-view__tab-btn ${isActive ? "tasks-view__tab-btn--active" : ""}`,
      textContent: cat,
      events: {
        click: () => onCategoryChange && onCategoryChange(cat),
      },
    });
  });

  const tabsContainer = createElement("nav", {
    className: "tasks-view__tabs",
    children: tabButtons,
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
        className: "tasks-view__th tasks-view__th--category",
        textContent: "Action",
      }),
    ],
  });

  const taskCards = tasks.map((task) =>
    TaskCard({ task, onToggle: onToggleTask, onAction: onTaskAction }),
  );

  const listContent = createElement("div", {
    className: "tasks-view__list",
    children: taskCards,
  });

  return createElement("section", {
    className: "tasks-view",
    children: [header, tabsContainer, tableHeader, listContent],
  });
};
