import "./card.css";
import { createElement } from "../../../utils";

export const Card = ({
  className = "",
  header,
  footer,
  children = [],
  events = {},
  attributes = {},
} = {}) => {
  const content = [];

  if (header) {
    content.push(
      createElement("header", {
        className: "card__header",
        children: Array.isArray(header) ? header : [header],
      }),
    );
  }

  content.push(
    createElement("div", {
      className: "card__body",
      children: Array.isArray(children) ? children : [children],
    }),
  );

  if (footer) {
    content.push(
      createElement("footer", {
        className: "card__footer",
        children: Array.isArray(footer) ? footer : [footer],
      }),
    );
  }

  return createElement("article", {
    className: `card ${className}`.trim(),
    events,
    attributes,
    children: content,
  });
};
