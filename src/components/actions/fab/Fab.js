import "./fab.css";
import { createElement } from "../../../utils";

export const Fab = (props = {}) => {
  const { onClick } = props;

  return createElement("button", {
    className: "fab-btn",

    attributes: { "aria-label": "Add Task" },
    events: {
      click: (e) => {
        e.stopPropagation();
        if (onClick) onClick(e);
      },
    },
    children: [
      createElement("i", {
        attributes: { "data-lucide": "plus" },
      }),
    ],
  });
};
