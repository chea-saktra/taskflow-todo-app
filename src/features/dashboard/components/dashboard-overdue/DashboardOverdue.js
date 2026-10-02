import "./dashboard-overdue.css";
import { Card, Chip, EmptyState } from "../../../../components";
import { createElement } from "../../../../utils";
import { getTaskUiProps } from "../../Config/dashboardConfig";

export const DashboardOverdue = ({ tasks = [], onTaskClick } = {}) => {
  const content = tasks.length
    ? createElement("div", {
        className: "dashboard-overdue__list",
        children: tasks.map((task) => crateOverdueTask(task, onTaskClick)),
      })
    : EmptyState({
        icon: "check-circle",
        title: "No overdue tasks",
        description: "You're all caught up.",
      });

  return Card({
    className: "dashboard-overdue",
    header: createHeader(),
    children: [content],
  });
};

const createHeader = () => {
  return createElement("div", {
    className: "dashboard-overdue__heading",
    children: [
      createElement("h2", {
        className: "dashboard-overdue__title",
        textContent: "Overdue Tasks",
      }),
      createElement("p", {
        className: "dashboard-overdue__description",
        textContent: "Tasks that have passed their due date.",
      }),
    ],
  });
};

const crateOverdueTask = (task, onTaskClick) => {
  const ui = getTaskUiProps(task);

  const metaChips = [
    ui.dueDateLabel
      ? Chip({
          label: ui.dueDateLabel,
          icon: "mouse-pointer-click",
          id: "today",
          selected: true,
          variant: "danger",
          className: "dashboard-overdue__chip",
        })
      : null,

    ui.priorityLabel
      ? Chip({
          label: ui.priorityLabel,
          id: ui.priority,
          selected: true,
          className: "dashboard-overdue__chip",
        })
      : null,
  ].filter(Boolean);

  return createElement("button", {
    className: "dashboard-overdue__item",
    attributes: { type: "button" },
    events: {
      click: () => onTaskClick?.(task),
    },
    children: [
      createElement("div", {
        className: "dashboard-overdue__item-content",
        children: [
          createElement("h3", {
            className: "dashboard-overdue__item-title",
            textContent: task.titleLabel || task.title || "Untitled Task",
          }),

          task.descriptionLabel
            ? createElement("p", {
                className: "dashboard-overdue__item-description",
                textContent: task.descriptionLabel,
              })
            : null,
        ].filter(Boolean),
      }),

      metaChips.length
        ? createElement("div", {
            className: "dashboard-overdue__item-meta",
            children: metaChips,
          })
        : null,
    ].filter(Boolean),
  });
};
