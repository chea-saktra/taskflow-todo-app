import "./dashboard-statistics.css";
import { Badge, Card } from "../../../../components";
import { getStatisticsSections } from "../../../../constants";
import { createElement } from "../../../../utils";

export const DashboardStatistics = ({
  status = {},
  priority = {},
  category = {},
} = {}) => {
  const sections = getStatisticsSections({ status, priority, category });

  return createElement("section", {
    className: "dashboard-statistics",
    children: [
      createElement("div", {
        className: "dashboard-statistics__heading",
        children: [
          createElement("h2", {
            className: "dashboard-statistics__title",
            textContent: "Statistics",
          }),
          createElement("p", {
            className: "dashboard-statistics__description",
            textContent: "Detailed breakdown of your tasks.",
          }),
        ],
      }),
      createElement("div", {
        className: "dashboard-statistics__grid",
        children: sections.map((section) => createStatisticsSection(section)),
      }),
    ],
  });
};

const createStatisticsSection = ({ title, items = [] } = {}) => {
  return Card({
    className: "dashboard-statistics__card",
    children: [
      createElement("div", {
        className: "dashboard-statistics__card-header",
        children: [
          createElement("h3", {
            className: "dashboard-statistics__card-title",
            textContent: title,
          }),
        ],
      }),
      createElement("div", {
        className: "dashboard-statistics__items",
        children: items.map((item) => createStatisticsItem(item)),
      }),
    ],
  });
};

const createStatisticsItem = ({ label = "", value = 0, type = "" } = {}) => {
  return createElement("div", {
    className: "dashboard-statistics__item",
    children: [
      Badge({ text: label, type, variant: "subtle" }),
      createElement("strong", {
        className: "dashboard-statistics__value",
        textContent: String(value),
      }),
    ],
  });
};
