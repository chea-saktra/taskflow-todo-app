import { createElement } from "../../../utils/dom";
import "./spinner.css";

export const Spinner = (props = {}) => {
  const size = props.size || "md";
  return createElement("div", {
    className: `spinner spinner--${size} ${props.className || ""}`,
  });
};
