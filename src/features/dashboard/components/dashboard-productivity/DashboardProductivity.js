import "./dashboard-productivity.css";
import { Card, Progress } from "../../../../components";
import { createElement } from "../../../../utils";
import { getProductivityMetrics } from "../../Config/dashboardConfig";

export const DashboardProductibity = ({
  totalTasks = 0,
  completedTasks = 0,
  completionRate = 0,
} = {}) => {
  const metrics = getProductivityMetrics({
    totalTasks,
    completedTasks,
    completionRate,
  });

  const header = createElement("div", {
    className: "dashboard-productivity__heading",
    children: [
      createElement("h2", {
        className: "dashboard-productivity__title",
        textContent: "Productivity",
      }),
      createElement("p", {
        className: "dashboard-productivity__description",
        textContent: "Track your task completion performance.",
      }),
    ],
  });

  const summary = createElement("div", {
    className: "dashboard-productivity__summary",
    children: metrics.map((metric) =>
      createElement("div", {
        className: "dashboard-productivity__metric",
        children: [
          createElement("span", {
            className: "dashboard-productivity__metric-label",
            textContent: metric.label,
          }),
          createElement("strong", {
            className: "dashboard-productivity__metric-value",
            textContent: metric.value,
          }),
        ],
      }),
    ),
  });

  const progress = Progress({
    value: completionRate,
    max: 100,
    showValue: true,
    ariaLabel: "Task completion rate",
  });

  return Card({
    className: "dashboard-productivity",
    header,
    children: [summary, progress],
  });
};
