import "./subtask-input.css";
import { createElement, select } from "../../utils";
import { InputField } from "../input/Input";

export const SubtaskInput = (props = {}) => {
  const { label = "Subtasks", initialItems = [], onChange } = props;

  let items = [...initialItems];

  const labelEl = createElement("label", {
    className: "subtask-input__label",
    textContent: label,
  });

  const textInput = InputField({
    placeholder: "Add a subtask...",
  });

  const listContainer = createElement("div", {
    className: "subtask-input__list",
  });

  const renderList = () => {
    listContainer.innerHTML = "";
    items.forEach((item, index) => {
      const checkboxEl = createElement("input", {
        attributes: {
          type: "checkbox",
          ...(item.completed ? { checkbox: true } : {}),
        },
        className: "subtask-input__checkbox",
        events: {
          change: (e) => {
            items[index].completed = e.target.checked;
            if (onChange) onChange(items);
          },
        },
      });
      const itemEl = createElement("div", {
        className: "subtask-input__item",
        children: [
          checkboxEl,
          createElement("span", {
            className: "subtask-input__item-text",
            textContent: item.title,
          }),
          createElement("button", {
            className: "subtask-input__remove-btn",
            attributes: { type: "button" },
            events: {
              click: () => {
                items.splice(index, 1);
                renderList();
                if (onChange) onChange(items);
              },
            },
            children: [
              createElement("i", { attributes: { "data-lucide": "trash-2" } }),
            ],
          }),
        ],
      });
      listContainer.append(itemEl);
    });
    if (window.lucide) window.lucide.createIcons();
  };

  const handleAdd = () => {
    const inputEl = select("input", textInput);
    const val = inputEl ? inputEl.value.trim() : "";

    if (val) {
      items.push({ title: val, completed: false });
      inputEl.value = "";
      renderList();
      if (onChange) onChange(items);
    }
  };

  const btnAdd = createElement("button", {
    className: "subtask-input__add-btn",
    attributes: { type: "button" },
    events: { click: handleAdd },
    children: [createElement("i", { attributes: { "data-lucide": "plus" } })],
  });

  const wrapper = createElement("div", {
    className: "form-field subtask-input",
    children: [
      labelEl,
      createElement("div", {
        className: "subtask-input__field-group",
        children: [textInput, btnAdd],
      }),
      listContainer,
    ],
  });

  renderList();

  wrapper.getValue = () => items;

  return wrapper;
};
