import "./button.css";
import { createElement } from "../../utils";

export const Button = (props = {}) => {
  const variant = props.variant || "primary";

  return createElement("button", {
    className: `btn btn--${variant} ${props.className || ""}`,
    attributes: props.attributes,
    events: props.events,
    children: [
      props.icon
        ? createElement("i", { attributes: { "data-lucide": props.icon } })
        : null,

      props.text ? document.createTextNode(props.text) : null,
    ].filter(Boolean),
  });
};
