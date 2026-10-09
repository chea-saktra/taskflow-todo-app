import "./progress.css";
import { cnBEM, createElement } from "../../../utils";
export const Progress = ({
  value = 0,
  max = 100,
  label = "",
  showValue = false,
  size = "md",
  variant = "default",
  className = "",
  ariaLabel,
} = {}) => {
  const safeMax = Number(max) > 0 ? Number(max) : 100;
  const safeValue = Math.min(Math.max(Number(value) || 0, 0), safeMax);
  const percentage = Math.round((safeValue / safeMax) * 100);

  // Header Element (Label & Percentage Value)
  const headerChildren = [];

  if (label) {
    headerChildren.push(
      createElement("span", {
        className: "progress__label",
        textContent: label,
      }),
    );
  }

  if (showValue) {
    headerChildren.push(
      createElement("span", {
        className: "progress__value",
        textContent: `${percentage}%`,
      }),
    );
  }

  // Progress Bar & Track Element
  const progressBar = createElement("div", {
    className: "progress__track",
    attributes: {
      role: "progressbar",
      "aria-valuenow": safeValue,
      "aria-valuemin": 0,
      "aria-valuemax": safeMax,
      ...(ariaLabel ? { "aria-label": ariaLabel } : {}),
    },
    children: [
      createElement("div", {
        className: "progress__bar",
        attributes: {
          style: `width: ${percentage}%`,
        },
      }),
    ],
  });

  // Children Assembly
  const children = [];
  if (headerChildren.length) {
    children.push(
      createElement("div", {
        className: "progress__header",
        children: headerChildren,
      }),
    );
  }
  children.push(progressBar);

  // Main Container Class Names & Component
  const progressClass = [
    "progress",
    cnBEM("progress", size, size),
    cnBEM("progress", variant, variant !== "default"),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return createElement("div", {
    className: progressClass,
    children,
  });
};
