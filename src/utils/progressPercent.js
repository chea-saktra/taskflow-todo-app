import { createElement } from "./dom";

export function createProgressRing(progressPercent = 0, radius = 18) {
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (progressPercent / 100) * circumference;

  return createElement("div", {
    className: "stat-card__progress-ring",
    children: [
      createElement("svg", {
        attributes: {
          width: "44",
          height: "44",
          class: "stat-card__circle",
          viewBox: "0 0 44 44",
        },
        children: [
          createElement("circle", {
            attributes: {
              cx: "22",
              cy: "22",
              r: radius,
              stroke: "var(--sys-border)",
              "stroke-width": "4",
              fill: "transparent",
            },
          }),
          createElement("circle", {
            attributes: {
              cx: "22",
              cy: "22",
              r: radius,
              stroke: "var(--sys-color-primary)",
              "stroke-width": "4",
              fill: "transparent",
              "stroke-dasharray": circumference,
              "stroke-dashoffset": strokeDashoffset,
              "stroke-linecap": "round",
              transform: "rotate(-90 22 22)",
            },
          }),
        ],
      }),
    ],
  });
}
