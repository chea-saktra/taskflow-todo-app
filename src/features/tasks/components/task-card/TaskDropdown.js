import { Button, Dropdown } from "../../../../components";

export const TaskDropdown = ({ items = [] } = {}) => {
  const trigger = Button({
    className: "tasks-card__menu",
    icon: "more-vertical",
    variant: "ghost",
    size: "sm",
  });

  return Dropdown({
    trigger,
    align: "right",
    items,
  });
};
