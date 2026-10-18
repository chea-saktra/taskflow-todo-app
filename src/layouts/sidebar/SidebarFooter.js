import { Avatar, Icon } from "../../components";
import { createElement } from "../../utils";

export const SidebarFooter = ({ user = {}, onProfileClick } = {}) => {
  const userAvatar = Avatar({
    src: user.avatar,
    name: user.name,
    size: "md",
  });

  const userName = createElement("span", {
    className: "app-sidebar__user-name",
    textContent: user.name || "User",
  });

  const userPlan = createElement("span", {
    className: "app-sidebar__user-plan",
    textContent: user.plan || "Free Plan",
  });

  const userInfo = createElement("div", {
    className: "app-sidebar__user-info",
    children: [userName, userPlan],
  });

  const profileMain = createElement("div", {
    className: "app-sidebar__profile-main",
    children: [userAvatar, userInfo],
  });

  const profileAction = createElement("div", {
    className: "app-sidebar__profile-action",
    children: [Icon({ name: "more-vertical" })], 
  });

  const profileCard = createElement("div", {
    className: "app-sidebar__profile-card",
    events: {
      click: onProfileClick,
    },
    children: [profileMain, profileAction],
  });

  return createElement("div", {
    className: "app-sidebar__footer",
    children: [profileCard],
  });
};
