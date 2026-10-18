import { createElement } from "../../utils";

export const Page = ({ header, content }) => {
  return createElement("section", {
    className: "page",
    children: [header, content],
  });
};
