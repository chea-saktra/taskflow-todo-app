import { Checkbox } from "../../../../components";

export const TaskCheckbox = ({ checked = false, onChange } = {}) => {
  return Checkbox({
    checked,
    onChange,
  });
};
