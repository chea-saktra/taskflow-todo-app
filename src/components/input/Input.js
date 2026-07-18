import { createElement } from "../../utils";
import "./input.css";

export const InputField = (props = {}) => {
  const type = props.type || "text";
  const isTextarea = type === "textarea";

  const label = props.label
    ? createElement("label", {
        className: "form-field__label",
        textContent: props.label,
      })
    : null;

  const input = createElement(isTextarea ? "textarea" : "input", {
    className: "form-field__input",
    attributes: {
      type: !isTextarea ? type : null,
      placeholder: props.placeholder || "",
      value: props.value || "",
      ...props.attributes,
    },
    events: props.events,
  });

  return createElement("div", {
    className: "form-field",
    children: [label, input].filter(Boolean),
  });
};
