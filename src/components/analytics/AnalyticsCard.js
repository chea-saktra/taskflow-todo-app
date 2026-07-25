import { capitalize, createElement } from "../../utils";
import "./analytics.css";

const CATEGORY_COLORS = {
  Work: "#4F46E5",
  Study: "#06B6D4",
  Personal: "#EC4899",
  Shopping: "#F59E0B",
  Other: "#8B5CF6",
};

const getCategoryColor = (catName) => {
  const farmattedCat = capitalize(catName);
  return CATEGORY_COLORS[farmattedCat] || CATEGORY_COLORS.Other;
};

export const AnalyticsCard = (props = {}) => {
  const { tasks = [] } = props;

  const categoryCounts = tasks.reduce((acc, task) => {
    const cat = task.category ? capitalize(task.category) : "Other";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const totalTasks = tasks.length;
  const categories = Object.keys(categoryCounts);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercent = 0;

  const svgSlices = categories.map((cat) => {
    const count = categoryCounts[cat];
    const percent = totalTasks > 0 ? count / totalTasks : 0;
    const strokeDasharray = `${percent * circumference} ${circumference}`;
    const strokeDashoffset = -(accumulatedPercent * circumference);

    accumulatedPercent += percent;

    return createElement("circle", {
      attributes: {
        cx: "50",
        cy: "50",
        r: radius,
        fill: "transparent",
        "stroke-width": "12",
        stroke: getCategoryColor(cat),
        "stroke-dasharray": strokeDasharray,
        "stroke-dashoffset": strokeDashoffset,
      },
    });
  });

  const bgCircle = createElement("circle", {
    attributes: {
      cx: "50",
      cy: "50",
      r: radius,
      fill: "transparent",
      "stroke-width": "12",
      stroke: "var(--sys-border)",
    },
  });

  const svgChart = createElement("svg", {
    attributes: { viewBox: "0 0 100 100", class: "analytics-chart__svg" },
    children: [bgCircle, ...svgSlices],
  });

  const chartCenter = createElement("div", {
    className: "analytics-chart__center-text",
    children: [
      createElement("span", {
        className: "analytics-chart__total",
        textContent: totalTasks,
      }),
      createElement("span", {
        className: "analytics-chart__label",
        textContent: "Total",
      }),
    ],
  });

  const chartContainer = createElement("div", {
    className: "analytics-chart",
    children: [svgChart, chartCenter],
  });

  const legendItems = categories.map((cat) => {
    return createElement("div", {
      className: "analytics-legend__item",
      children: [
        createElement("div", {
          className: "analytics-legend__left",
          children: [
            createElement("span", {
              className: "analytics-legend__dot",
              attributes: {
                style: `background-color: ${getCategoryColor(cat)}`,
              },
            }),
            createElement("span", { textContent: cat }),
          ],
        }),
        createElement("span", {
          className: "analytics-legend__count",
          textContent: categoryCounts[cat],
        }),
      ],
    });
  });

  const legendContainer = createElement("div", {
    className: "analytics-legend",
    children:
      legendItems.length > 0
        ? legendItems
        : [createElement("span", { textContent: "No data available" })],
  });

  return createElement("div", {
    className: "analytics-card",
    children: [
      createElement("h3", {
        className: "analytics-card__title",
        textContent: "Task by Category",
      }),
      createElement("div", {
        className: "analytics-card__content",
        children: [chartContainer, legendContainer],
      }),
    ],
  });
};
