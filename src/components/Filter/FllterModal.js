import "./filter-modal.css";
import { FilterController } from "../../features/filter/controller";
import { filterState } from "../../state/filter";
import { cnBEM, createElement } from "../../utils";
import { Button } from "../button/Button";
import { Chip } from "../chip/Chip";

export const FilterModal = (props = {}) => {
  const { onClose = () => {} } = props;

  let localFilters = {
    category: filterState.category || "all",
    priority: filterState.priority || "all",
    status: filterState.status || "all",
    dueDate: filterState.dueDate || "all",
  };

  const sectionsConfig = [
    {
      key: "category",
      title: "Category",
      options: [
        { id: "all", label: "All" },
        { id: "work", label: "Work" },
        { id: "study", label: "Study" },
        { id: "personal", label: "Personal" },
        { id: "shopping", label: "Shopping" },
      ],
    },
    {
      key: "priority",
      title: "Priority",
      options: [
        { id: "all", label: "All" },
        { id: "high", label: "High" },
        { id: "medium", label: "Medium" },
        { id: "low", label: "Low" },
      ],
    },
    {
      key: "status",
      title: "Status",
      options: [
        { id: "all", label: "All" },
        { id: "pending", label: "Pending" },
        { id: "in-progress", label: "In Progress" },
        { id: "completed", label: "Completed" },
      ],
    },
    {
      key: "dueDate",
      title: "Due Date",
      options: [
        { id: "all", label: "All" },
        { id: "today", label: "Today" },
        { id: "this-week", label: "This Week" },
        { id: "this-month", label: "This Month" },
      ],
    },
  ];

  const bodyElement = createElement("div", { className: "filter-modal__body" });

  const renderSections = () => {
    bodyElement.innerHTML = "";
    sectionsConfig.forEach((section) => {
      const sectionEl = createElement("div", { className: "filter-section" });
      const labelEl = createElement("span", {
        className: "filter-section__label",
        textContent: section.title,
      });

      const optionsEl = createElement("div", {
        className: "filter-section__options",
      });

      section.options.forEach((opt) => {
        const currentVal = String(
          localFilters[section.key] || "",
        ).toLowerCase();
        const isSelected = currentVal === opt.id.toLowerCase();

        const chipClass = cnBEM("chip", "selected", isSelected);

        const chipEl = Chip({
          id: opt.id,
          label: opt.label,
          selected: isSelected,
          variant: section.key,
          onClick: () => {
            localFilters[section.key] = opt.id;
            renderSections();
          },
        });
        optionsEl.append(chipEl);
      });
      sectionEl.append(labelEl, optionsEl);
      bodyElement.append(sectionEl);
    });
  };

  renderSections();

  const title = createElement("h3", {
    className: "filter-modal__title",
    textContent: "Filter",
  });

  const btnReset = createElement("button", {
    className: "filter-modal__reset-btn",
    textContent: "Reset",
    attributes: { type: "button" },
    events: {
      click: () => {
        localFilters = {
          category: "all",
          priority: "all",
          status: "all",
          dueDate: "all",
        };
        renderSections();
      },
    },
  });

  const header = createElement("div", {
    className: "filter-modal__header",
    children: [title, btnReset],
  });

  const btnCancel = Button({
    variant: "secondary",
    text: "Cancel",
    events: { click: onClose },
  });

  const btnApply = Button({
    variant: "primary",
    text: "Apply Filter",
    events: {
      click: () => {
        FilterController.setAllFilters(localFilters);
        onClose();
      },
    },
  });

  const footer = createElement("div", {
    className: "filter-modal__footer",
    children: [btnCancel, btnApply],
  });

  const modalContent = createElement("div", {
    className: "filter-modal",
    events: {
      click: (e) => e.stopPropagation(),
    },

    children: [header, bodyElement, footer],
  });

  const overlay = createElement("div", {
    className: "filter-overlay is-open",
    events: {
      click: onClose,
    },
    children: [modalContent],
  });

  return overlay;
};
