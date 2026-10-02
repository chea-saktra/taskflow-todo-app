import "./dashboard-progress.css";
import { Card, Progress } from "../../../../components";
import { getProgressStats } from "../../../../constants";
import { cnBEM, createElement } from "../../../../utils";

export const DashboardProgress = ({
  archived = 0,
  completed = 0,
  todo = 0,
  inProgress = 0,
  total = 0,
  percentage = 0,
} = {}) => {
  const stats = getProgressStats({
    total,
    todo,
    inProgress,
    completed,
    archived,
  });

  const header = createElement("div", {
    className: "dashboard-progress__heading",
    children: [
      createElement("h2", {
        className: "dashboard-progress__title",
        textContent: "Task Progress",
      }),
      createElement("p", {
        className: "dashboard-progress__subtitle",
        textContent: "Track your overall task completion.",
      }),
    ],
  });

  const bodyContent = [
    Progress({
      value: percentage,
      max: 100,
      showValue: true,
      ariaLabel: "Overall task completion",
    }),

    createElement("div", {
      className: "dashboard-progress__stats",
      children: stats.map((stat) =>
        createElement("div", {
          className: "dashboard-progress__stat",
          children: [
            createElement("span", {
              className: cnBEM("dashboard-progress__stat-dot", stat.type, true),
            }),
            createElement("span", {
              className: "dashboard-progress__stat-label",
              textContent: stat.label,
            }),
            createElement("strong", {
              className: "dashboard-progress__stat-value",
              textContent: String(stat.value),
            }),
          ],
        }),
      ),
    }),
  ];

  return Card({
    className: "dashboard-progress",
    header,
    children: bodyContent,
  });
};
