import "./icon.css";
import { createElement } from "../../../utils";

export const Icon = ({
  name = "",
  size = "md",
  className = "",
  attributes = {},
} = {}) => {
  return createElement("i", {
    className: ["icon", `icon--${size}`, className].filter(Boolean).join(" "),
    attributes: {
      "data-lucide": name,
      ...attributes,
    },
  });
};
