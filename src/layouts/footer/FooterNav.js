import { createElement } from "../../utils";
import { FooterNavItem } from "./FooterNavItem";

export const FooterNav = ({ items = [], activeRoute, onNavigate }) => {
  return createElement("nav", {
    className: "app-footer",
    children: items.map((item) =>
      FooterNavItem({
        item,
        activeRoute,
        onNavigate,
      }),
    ),
  });
};
