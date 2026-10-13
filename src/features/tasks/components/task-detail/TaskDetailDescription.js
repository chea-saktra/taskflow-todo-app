import { createElement } from "../../../../utils";

export const TaskDetailDescription = ({ description = "" } = {}) => {
  if (!description) {
    return createElement("section", {
      className: "task-detail__description",
      children: [
        createElement("h3", {
          className: "task-detail__section-title",
          textContent: "Description",
        }),

        createElement("p", {
          className: "task-detail__description-empty",
          textContent: "No description provided.",
        }),
      ],
    });
  }

  return createElement("section", {
    className: "task-detail__description",
    children: [
      createElement("h3", {
        className: "task-detail__section-title",
        textContent: "Description",
      }),

      createElement("p", {
        className: "task-detail__description-text",
        textContent: description,
      }),
    ],
  });
};
