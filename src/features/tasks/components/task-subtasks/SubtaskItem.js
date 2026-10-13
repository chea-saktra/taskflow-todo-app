import { Button, Checkbox, Input } from "../../../../components";
import { cnBEM, createElement, select } from "../../../../utils";

export const SubtaskItem = ({
  subtask = {},
  onToggle,
  onStartEdit,
  onCancelEdit,
  onEdit,
  onDelete,
} = {}) => {
  const completed = Boolean(subtask.completed);
  const editing = Boolean(subtask.isEditing);
  let editValue = subtask.title || "";

  const item = createElement("div", {
    className: [
      cnBEM("task-subtasks__item", "completed", completed),
      cnBEM("task-subtasks__item", "editing", editing),
    ]
      .filter(Boolean)
      .join(" "),
  });

  const main = createElement("div", {
    className: "task-subtasks__item-main",
  });

  const checkbox = Checkbox({
    checked: completed,
    events: {
      change: () => {
        onToggle?.(subtask.id);
      },
    },
  });

  if (editing) {
    const inputField = Input({
      value: editValue,
      placeholder: "Subtask title...",
      className: "task-subtasks__item-input",
      attributes: {
        maxlength: "100",
        "aria-label": "Edit subtask",
      },
    });

    const input = select("input", inputField);

    if (input) {
      input.addEventListener(
        "input",

        (event) => {
          editValue = event.target.value;
        },
      );
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          saveEdit();
        }
        if (event.key === "Escape") {
          event.preventDefault();
          onCancelEdit?.(subtask.id);
        }
      });
    }

    const saveEdit = () => {
      const title = editValue.trim();
      if (!title) return;
      if (title === subtask.title) {
        onCancelEdit?.(subtask.id);
        return;
      }
      onEdit?.(subtask.id, { title });
    };

    const saveButton = Button({
      type: "button",
      variant: "primary",
      icon: "check",
      attributes: { "aria-label": "Save subtask" },
      events: {
        click: (event) => {
          event.stopPropagation();
          saveEdit();
        },
      },
    });

    const cancelButton = Button({
      type: "button",
      variant: "danger-subtle",
      icon: "x",
      attributes: {
        "aria-label": "Cancel edit",
      },
      events: {
        click: (event) => {
          event.stopPropagation();
          onCancelEdit?.(subtask.id);
        },
      },
    });

    main.append(
      inputField,
      createElement("div", {
        className: "task-subtasks__item-edit-actions",
        children: [saveButton, cancelButton],
      }),
    );

    requestAnimationFrame(() => {
      input?.focus();
      input?.select();
    });
  } else {
    const title = createElement("span", {
      className: cnBEM("task-subtasks__item-title", "completed", completed),
      textContent: subtask.title || "",
    });
    main.append(checkbox, title);
  }

  const actions = createElement("div", {
    className: "task-subtasks__item-actions",
  });

  if (!editing) {
    actions.append(
      Button({
        type: "button",
        variant: "secondary",
        className: "task-subtasks__item-action",
        attributes: {
          "aria-label": "Edit subtask",
        },
        icon: "pencil",
        events: {
          click: (event) => {
            event.stopPropagation();
            onStartEdit?.(subtask.id);
          },
        },
      }),

      Button({
        type: "button",
        variant: "danger-subtle",
        className:
          "task-subtasks__item-action task-subtasks__item-action--danger",
        attributes: {
          "aria-label": "Delete subtask",
        },
        icon: "trash-2",
        events: {
          click: (event) => {
            event.stopPropagation();
            onDelete?.(subtask.id);
          },
        },
      }),
    );
  }

  item.append(main, actions);
  window.lucide?.createIcons();
  return item;
};
