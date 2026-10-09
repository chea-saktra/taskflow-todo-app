import { cnBEM, createElement } from "../../../utils";
import "./stat-card.css";

export const StatCard = ({
  title = "",
  value = 0,
  subtitle = "",
  icon = "",
  color = "",
} = {}) => {
  const header = createElement("div", {
    className: "stat-card__header",
    children: [
      createElement("span", {
        className: "stat-card__title",
        textContent: title,
      }),

      icon
        ? createElement("i", {
            className: "stat-card__icon",
            attributes: { "data-lucide": icon },
          })
        : null,
    ].filter(Boolean),
  });

  const body = createElement("div", {
    className: "stat-card__body",
    children: [
      createElement("strong", {
        className: "stat-card__value",
        textContent: value,
      }),
      subtitle
        ? createElement("span", {
            className: "stat-card__subtitle",
            textContent: subtitle,
          })
        : null,
    ].filter(Boolean),
  });

  return createElement("div", {
    className: cnBEM("stat-card", color, color),
    children: [header, body],
  });
};
