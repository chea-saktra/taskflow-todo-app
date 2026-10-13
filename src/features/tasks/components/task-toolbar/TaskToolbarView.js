import { Button } from "../../../../components";
import { VIEWS } from "../../../../constants";
import { createElement } from "../../../../utils";

export const TaskToolbarView = ({ value = "all", onChange } = {}) => {
  return createElement("div", {
    className: "task-toolbar__views",
    attributes: {
      role: "tablist",
      "aria-label": "Task views",
    },
    children: VIEWS.map(({ value: viewValue, label, icon }) => {
      const isActive = value === viewValue;

      return Button({
        variant: "ghost",
        text: label,
        icon,
        className: ["task-toolbar__view", isActive && "is-active"]
          .filter(Boolean)
          .join(" "),
        attributes: {
          role: "tab",
          "aria-selected": String(isActive),
        },
        events: {
          click: () => onChange?.(viewValue),
        },
      });
    }),
  });
};
