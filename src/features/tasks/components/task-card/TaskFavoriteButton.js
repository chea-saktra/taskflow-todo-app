import { Button } from "../../../../components";

export const TaskFavoriteButton = ({ active = false, onClick } = {}) => {
  return Button({
    icon: "star",
    variant: "ghost",
    attributes:{
      "aria-label":active?"Remove from favorites":"Add to favorites",
      "aria-pressed":String(active),
      title:active?"Remove from favorites":"Add to Favorite"
    },
    className: `task-card__favorite ${active ? "is-active" : ""}`,
    events: {
      click: (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick?.();
      },
    },
  });
};
