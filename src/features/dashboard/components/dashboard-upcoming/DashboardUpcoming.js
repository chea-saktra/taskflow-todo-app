import "./dashboard-upcoming.css";
import { Card, Chip, EmptyState } from "../../../../components";
import { createElement } from "../../../../utils";
import { getTaskUiProps } from "../../Config/dashboardConfig";

export const DashboardUpcoming = ({ tasks = [], onTaskClick } = {}) => {
  const content = tasks.length
    ? createElement("div", {
        className: "dashboard-upcoming__list",
        children: tasks.map((task) => createUpcomingTask(task, onTaskClick)),
      })
    : EmptyState({
        icon: "calendar",
        title: "No upcoming tasks",
        description: "You don't have any upcoming tasks.",
      });

  return Card({
    className: "dashboard-upcoming",
    header: createHeader(),
    children: [content],
  });
};

const createHeader = () => {
  return createElement("div", {
    className: "dashboard-upcoming__heading",
    children: [
      createElement("h2", {
        className: "dashboard-upcoming__title",
        textContent: "Upcoming Tasks",
      }),
      createElement("p", {
        className: "dashboard-upcoming__description",
        textContent: "Tasks that are coming up next.",
      }),
    ],
  });
};

const createUpcomingTask = (task, onTaskClick) => {
  const ui = getTaskUiProps(task);
  const metaChips = [
    ui.dueDateLabel
      ? Chip({
          label: ui.dueDateLabel,
          icon: "calendar",
          id: "today",
          selected: true,
          className: "dashboard-upcoming__chip",
        })
      : null,

    ui.priorityLabel
      ? Chip({
          label: ui.priorityLabel,
          id: ui.priority,
          selected: true,
          className: "dashboard-upcoming__chip",
        })
      : null,
  ].filter(Boolean);

  return createElement("button", {
    className: "dashboard-upcoming__item",
    attributes: { type: "button" },

    events: {
      click: () => onTaskClick?.(task),
    },
    children: [
      createElement("div", {
        className: "dashboard-upcoming__item-content",
        children: [
          createElement("h3", {
            className: "dashboard-upcoming__item-title",
            textContent: task.titleLabel || task.title || "Untitled Task",
          }),

          task.descriptionLabel
            ? createElement("p", {
                className: "dashboard-upcoming__item-description",
                textContent: task.descriptionLabel,
              })
            : null,
        ].filter(Boolean),
      }),

      metaChips.length
        ? createElement("div", {
            className: "dashboard-upcoming__item-meta",
            children: metaChips,
          })
        : null,
    ].filter(Boolean),
  });
};
