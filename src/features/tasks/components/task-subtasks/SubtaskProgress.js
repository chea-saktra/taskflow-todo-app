import { Progress } from "../../../../components";
import { createElement } from "../../../../utils";

export const SubtaskProgress = ({
  completed = 0,
  total=0,
  progress = 0,
} = {}) => {
  return createElement("div", {
    className: "task-subtasks__progress",
    children: [
      Progress({
        value: progress,
        label: `${completed}/${total} completed`,
        showValue: true,
        size: "sm",
      }),
    ],
  });
};
