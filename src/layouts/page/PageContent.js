import { cnBEM, createElement } from "../../utils";

export const PageContent = ({
  children = [],
  fluid = false,
  className = "",
} = {}) => {
  const contentClass = [cnBEM("page__content", "fluid", fluid), className]
    .filter(Boolean)
    .join(" ");
  return createElement("section", {
    className: contentClass,
    children,
  });
};
