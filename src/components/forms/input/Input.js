import { cnBEM, createElement } from "../../../utils";
import "./input.css";

export const Input = ({
  type = "text",
  name = "",
  id = "",
  value = "",
  placeholder = "",
  label = "",
  error = "",
  hint = "",
  disabled = false,
  required = false,
  readonly = false,
  min,
  max,
  step,
  maxlength,
  autocomplete,
  className = "",
  attributes = {},
  events = {},
} = {}) => {
  const inputId =
    id || name || `input-${Math.random().toString(36).substring(2, 9)}`;

  // Element Attributes
  const inputAttributes = {
    type,
    id: inputId,
    value,
    ...(name ? { name } : {}),
    ...(placeholder ? { placeholder } : {}),
    ...(disabled ? { disabled: true } : {}),
    ...(required ? { required: true } : {}),
    ...(readonly ? { readonly: true } : {}),
    ...(min !== undefined ? { min: String(min) } : {}),
    ...(max !== undefined ? { max: String(max) } : {}),
    ...(step !== undefined ? { step: String(step) } : {}),
    ...(maxlength !== undefined ? { maxlength: String(maxlength) } : {}),
    ...(autocomplete !== undefined ? { autocomplete } : {}),
    ...attributes,
  };

  // Class Names
  const inputClass = [cnBEM("form-input", "error", error), className]
    .filter(Boolean)
    .join(" ");

  // Input Element
  const input = createElement("input", {
    className: inputClass,
    attributes: inputAttributes,
    events,
  });

  // Child Element (Label, Hint, Error)
  const children = [];

  if (label) {
    children.push(
      createElement("label", {
        className: "form-input__label",
        attributes: {
          for: inputId,
        },
        textContent: label,
      }),
    );
  }

  children.push(input);

  if (hint && !error) {
    children.push(
      createElement("span", {
        className: "form-input__hint",
        textContent: hint,
      }),
    );
  }

  if (error) {
    children.push(
      createElement("span", {
        className: "form-input__error",
        textContent: error,
        attributes: { role: "alert" },
      }),
    );
  }

  // Field Wrapper Container
  return createElement("div", {
    className: "form-input-field",
    children,
  });
};
