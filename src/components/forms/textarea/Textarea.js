import "./textarea.css";
import { cnBEM, createElement } from "../../../utils";

export const Textarea = ({
  id = "",
  name = "",
  value = "",
  placeholder = "",
  label = "",
  error = "",
  hint = "",
  rows = 4,
  maxlength,
  disabled = false,
  required = false,
  readonly = false,
  className = "",
  ariaLabel,
  ariaDescribedBy,
  events = {},
} = {}) => {
  const textareaId =
    id || name || `textarea-${Math.random().toString(36).substring(2, 9)}`;

  //   Element attributes
  const textareaAttributes = {
    id: textareaId,
    name: name || textareaId,
    ...(placeholder ? { placeholder } : {}),
    ...(rows ? { rows: String(rows) } : {}),
    ...(maxlength !== undefined ? { maxlength: String(maxlength) } : {}),
    ...(disabled ? { disabled: true } : {}),
    ...(required ? { required: true } : {}),
    ...(readonly ? { readonly: true } : {}),
    ...(ariaLabel ? { "aria-label": ariaLabel } : {}),
    ...(ariaDescribedBy ? { "aria-describedby": ariaDescribedBy } : {}),
  };

  //   Class Names
  const textareaClass = [cnBEM("form-textarea", "error", error), className]
    .filter(Boolean)
    .join(" ");

  // Textarea Element
  const textarea = createElement("textarea", {
    className: textareaClass,
    attributes: textareaAttributes,
    textContent: value,
    events,
  });

  // Child Element (Label, hint, Error)
  const children = [];

  if (label) {
    children.push(
      createElement("label", {
        className: "form-textarea__label",
        attributes: { for: textareaId },
        textContent: label,
      }),
    );
  }

  children.push(textarea);

  if (hint && !error) {
    children.push(
      createElement("span", {
        className: "form-textarea__hint",
        textContent: hint,
      }),
    );
  }

  if (error) {
    children.push(
      createElement("span", {
        className: "form-textarea__error",
        textContent: error,
        attributes: { role: "alert" },
      }),
    );
  }

  //   Field Wrapper Container
  return createElement("div", {
    className: "form-textarea-field",
    children,
  });
};
