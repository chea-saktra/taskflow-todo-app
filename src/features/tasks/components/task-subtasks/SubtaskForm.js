import { Button, Input } from "../../../../components";
import { createElement, select } from "../../../../utils";

export const SubtaskForm = ({ onSubmit } = {}) => {
  const inputField = Input({
    name: "subtaskTitle",
    placeholder: "Add a subtask...",
  });

  const input = select("input", inputField);

  const form = createElement("form", {
    className: "task-subtasks__form",

    events: {
      submit: (event) => {
        event.preventDefault();
        const title = input.value?.trim();
        if (!title) return;
        console.log("Adding subtask:", {
          title,
        });
        onSubmit?.({ title });
        input.value = "";
        input.focus();
      },
    },
    children: [
      input,
      Button({
        type: "submit",
        variant: "primary",
        text: "Add",
      }),
    ],
  });

  return form;
};
