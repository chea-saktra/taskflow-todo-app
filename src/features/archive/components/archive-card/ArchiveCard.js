import "./archive-card.css";
import { Badge, Button, Card, Checkbox, Icon } from "../../../../components";
import { cnBEM, createElement } from "../../../../utils";
import {
  getArchiveCardAction,
  getArchiveTaskInfo,
} from "../../config/archiveConfig";
import { getTaskMeta } from "../../../tasks/config/taskConfig";

export const ArchiveCard = ({
  task = {},
  isSelected = false,
  onSelect,
  onRestore,
  onDelete,
} = {}) => {
  const { id, title, description } = task;

  const checkbox = Checkbox({
    checked: isSelected,
    onChange: () => onSelect?.(id),
    attributes: {
      "aria-label": `Select ${title || "archived task"}`,
    },
  });

  const actions = getArchiveCardAction({ id, onRestore, onDelete }).map(
    (action) =>
      Button({
        icon: action.icon,
        variant: action.danger ? "danger" : "ghost",
        size: "sm",
        className: cnBEM("archive-card__action", "danger", action.danger),
        attributes: {
          "aria-label": action.label,
          title: action.label,
        },
        events: {
          click: (e) => {
            e.stopPropagation();
            action.onClick();
          },
        },
      }),
  );

  const header = createElement("div", {
    className: "archive-card__header",
    children: [
      createElement("div", {
        className: "archive-card__selection",
        children: [checkbox],
      }),
      createElement("div", {
        className: "archive-card__heading",
        children: [
          createElement("h3", {
            className: "archive-card__title",
            textContent: title || "Untitled Task",
            attributes: { title: title || "" },
          }),
          description
            ? createElement("p", {
                className: "archive-card__description",
                textContent: description,
              })
            : null,
        ].filter(Boolean),
      }),
      createElement("div", {
        className: "archive-card__actions",
        children: actions,
      }),
    ],
  });

  const metaList = getTaskMeta(task);
  const metadataElement = metaList.length
    ? createElement("div", {
        className: "archive-card__metadata",
        children: metaList.map((item) =>
          Badge({
            type: item.type,
            text: item.text,
          }),
        ),
      })
    : null;

  const infoElement = getArchiveTaskInfo(task)
    .filter((info) => info.show)
    .map((info) =>
      createElement("div", {
        className: `archive-card__${info.key}`,
        children: [
          Icon({ name: info.icon, size: "sm" }),
          createElement("span", { textContent: info.text }),
        ],
      }),
    );

  const footer = createElement("div", {
    className: "archive-card__footer",
    children: [
      metadataElement,
      infoElement.length > 0
        ? createElement("div", {
            className: "archive-card__footer-info",
            children: infoElement,
          })
        : null,
    ].filter(Boolean),
  });

  return Card({
    className: cnBEM("archive-card", "selected", isSelected),
    attributes: {
      "data-task-id": id || "",
    },
    header,
    // children: [],
    footer,
  });
};
