import { sortState } from "../../state/sort";

export const SortController = {
  setSort(sortBy, order) {
    sortState.setSort(sortBy, order);
  },

  applySort(tasks = []) {
    const { sortBy, order } = sortState;
    const sorted = [...tasks];

    return sorted.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "dueDate":
          {
            const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
            const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
            comparison = dateA - dateB;
          }
          break;

        case "priority":
          {
            const priorityWeight = { high: 3, medium: 2, low: 1, "": 0 };
            const weightA =
              priorityWeight[(a.priority || "").toLowerCase()] || 0;
            const weightB =
              priorityWeight[(b.priority || "").toLowerCase()] || 0;
            comparison = weightB - weightA;
          }
          break;

        case "title":
          {
            comparison = (a.title || "").localeCompare(b.title || "");
          }
          break;

        default:
          break;
      }

      return order === "asc" ? comparison : -comparison;
    });
  },
};
