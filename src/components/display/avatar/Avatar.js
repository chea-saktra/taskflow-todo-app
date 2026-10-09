import "./avatar.css";
import { createElement } from "../../../utils";

export const Avatar = ({
  src = "",
  name = "User",
  size = "md",
  className = "",
} = {}) => {
  const avatarClasses = ["avatar", `avatar--${size}`, className]
    .filter(Boolean)
    .join(" ");

  const content = src
    ? createElement("img", {
        attributes: {
          src,
          alt: name,
          loading: "lazy",
        },
      })
    : createElement("span", {
        className: "avatar__fallback",
        textContent: (name || "U").charAt(0).toUpperCase(),
      });

  return createElement("div", {
    className: avatarClasses,
    children: [content],
  });
};
