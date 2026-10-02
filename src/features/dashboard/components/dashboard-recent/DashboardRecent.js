import "./dashboard-recent.css";
import { Card, Chip, EmptyState } from "../../../../components";
import { createElement } from "../../../../utils";
import { getTaskUiProps } from "../../Config/dashboardConfig";

export const DashboardRecent = ({ tasks = [], onTaskClick } = {}) => {
  const content = tasks.length
    ? createElement("div", {
        className: "dashboard-recent__list",
        children: tasks.map((task) => crateRecentTask(task, onTaskClick)),
      })
    : EmptyState({
        icon: "clock",
        title: "No recent tasks",
        description: "There are no recent tasks to display.",
      });

  return Card({
    className: "dashboard-recent",
    header: createHeader(),
    children: [content],
  });
};

const createHeader = () => {
  return createElement("div", {
    className: "dashboard-recent__heading",
    children: [
      createElement("h2", {
        className: "dashboard-recent__title",
        textContent: "Recent Tasks",
      }),
      createElement("p", {
        className: "dashboard-recent__description",
        textContent: "Your recently created or updated tasks.",
      }),
    ],
  });
};

const crateRecentTask = (task, onTaskClick) => {
  const ui = getTaskUiProps(task);

  const metaChips = [
    ui.statusLabel
      ? Chip({
          label: ui.statusLabel,
          variant: ui.status,
          className: "dashboard-recent__chip",
        })
      : null,

    ui.dateLabel
      ? Chip({
          label: ui.dateLabel,
          icon: "clock",
          className: "dashboard-recent__chip",
        })
      : null,
  ].filter(Boolean);

  return createElement("button", {
    className: "dashboard-recent__item",
    attributes: { type: "button" },
    events: {
      click: () => onTaskClick?.(task),
    },
    children: [
      createElement("div", {
        className: "dashboard-recent__item-content",
        children: [
          createElement("h3", {
            className: "dashboard-recent__item-title",
            textContent: task.titleLabel || task.title || "Untitled Task",
          }),

          task.descriptionLabel
            ? createElement("p", {
                className: "dashboard-recent__item-description",
                textContent: task.descriptionLabel,
              })
            : null,
        ].filter(Boolean),
      }),

      metaChips.length
        ? createElement("div", {
            className: "dashboard-recent__item-meta",
            children: metaChips,
          })
        : null,
    ].filter(Boolean),
  });
};
