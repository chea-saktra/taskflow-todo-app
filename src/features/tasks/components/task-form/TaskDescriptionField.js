import { Textarea } from "../../../../components";
import { createElement } from "../../../../utils";

export const TaskDescritpionField = ({
  value = "",
  error = "",
  onInput,
} = {}) => {
  return Textarea({
    id: "task-descritpion",
    name: "description",
    value,
    placeholder: "Add a description...",
    rows: 5,
    label: "Descritpion",
    maxlegth: 1000,
    error,
    events: {
      input: onInput,
    },
  });
};
