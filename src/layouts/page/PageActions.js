import { createElement } from "../../utils";

export const PageActions = ({ children = [] } = {}) => {
  return createElement("div", {
    className: "page-actions",
    children,
  });
};
