import "./dashboard-overview.css";
import { StatCard } from "../../../../components";
import { getOverviewCards } from "../../../../constants";
import { createElement } from "../../../../utils";

export const DashboardOverview = ({ data = {} } = {}) => {
  const cards = getOverviewCards(data);

  return createElement("section", {
    className: "dashboard-overview",
    children: [
      createElement("div", {
        className: "dashboard-overview__heading",
        children: [
          createElement("h2", {
            className: "dashboard-overview__title",
            textContent: "Overview",
          }),
          createElement("p", {
            className: "dashboard-overview__description",
            textContent: "Your task summary",
          }),
        ],
      }),

      createElement("div", {
        className: "dashboard-overview__grid",
        children: cards.map((card) =>
          StatCard({
            title: card.label,
            value: card.value,
            icon: card.icon,
            color: card.color,
          }),
        ),
      }),
    ],
  });
};
