import "./select-field.css";
import { createElement } from "../../utils";
import { Dropdown } from "../dropdown/Dropdown";

export const SelectField = (props = {}) => {
  const { label, options = [], value, onChange } = props;

  let selectedOption =
    options.find((opt) => opt.value === value) || options[0];
  let selectedValue = selectedOption ? selectedOption.value : "";

  const labelEl = label
    ? createElement("label", {
        className: "form-field__label",
        textContent: label,
      })
    : null;
  const createOptionContent = (opt) => {
    const children = [];

    if (opt.color) {
      children.push(
        createElement("span", {
          className: "select-field__dot",
          attributes: { style: `background-color: ${opt.color};` },
        }),
      );
    }

    if (opt.icon) {
      children.push(
        createElement("i", {
          attributes: { "data-lucide": opt.icon },
          className: "select-field__icon",
        }),
      );
    }

    children.push(
      createElement("span", {
        className: "select-field__text",
        textContent: opt ? opt.label : "Select...",
      }),
    );

    return children;
  };

  const valueDisplay = createElement("div", {
    className: "select-field__value",
    children: createOptionContent(selectedOption),
  });

  const btnTrigger = createElement("button", {
    className: "select-field__trigger",
    attributes: { type: "button" },
    children: [
      valueDisplay,
      createElement("i", { attributes: { "data-lucide": "chevron-down" } }),
    ],
  });

  const dropdownItems = options.map((opt) => ({
    label: opt.label,
    icon: opt.icon,
    color: opt.color,
    onClick: () => {
      selectedValue = opt.value;
      selectedOption = opt;

      valueDisplay.innerHTML = "";
      createOptionContent(opt).forEach((el) => valueDisplay.appendChild(el));

      if (onChange) onChange(opt.value);
      if (window.lucide) window.lucide.createIcons();
    },
  }));

  const dropdown = Dropdown({
    trigger: btnTrigger,
    items: dropdownItems,
  });

  const wrapper = createElement("div", {
    className: "form-field select-field",
    children: [labelEl, dropdown].filter(Boolean),
  });

  wrapper.getValue = () => selectedValue;

  return wrapper;
};
