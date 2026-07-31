import { filterState } from "../../state/filter";

export const FilterController = {
  setCategory(category) {
    filterState.setCategory(category);
  },

  setPriority(priority) {
    filterState.setPriority(priority);
  },

  setStatus(status) {
    filterState.setStatus(status);
  },

  setDueDate(dueDate) {
    filterState.setDueDate(dueDate);
  },

  setAllFilters(filters) {
    filterState.setAllFilters(filters);
  },

  resetFilter() {
    filterState.resetFilter();
  },

  applyFilter(tasks = []) {
    const { category, priority, status, dueDate } = filterState;
    const selectedCategory = category.toLowerCase();
    const selectedPriority = priority.toLowerCase();
    const selectedStatus = status.toLowerCase();
    const selectedDueDate = dueDate.toLowerCase();

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return tasks.filter((task) => {
      const taskCategory = (task.category || "").toLowerCase();
      const matchCategory =
        selectedCategory === "all" || selectedCategory === taskCategory;

      const taskPriority = (task.priority || "").toLowerCase();
      const matchPriority =
        selectedPriority === "all" || selectedPriority === taskPriority;

      const taskStatus = task.completed
        ? "completed"
        : (task.status || "pending").toLowerCase();

      let matchStatus = false;
      switch (selectedStatus) {
        case "completed":
          matchStatus = task.completed || taskStatus === "completed";
          break;

        case "pending":
          matchStatus = !task.completed && taskStatus === "pending";
          break;

        case "in-progress":
          matchStatus = !task.completed && taskStatus === "in-progress";
          break;

        case "all":
        default:
          matchStatus = true;
          break;
      }

      let matchDueDate = true;
      if (selectedDueDate !== "all" && task.dueDate) {
        const taskDate = new Date(task.dueDate);
        const taskDay = new Date(
          taskDate.getFullYear(),
          taskDate.getMonth(),
          taskDate.getDate(),
        );

        if (selectedDueDate === "today") {
          matchDueDate = taskDay.getTime() === today.getTime();
        } else if (
          selectedDueDate === "this-week" ||
          selectedDueDate === "this week"
        ) {
          const nextWeek = new Date(today);
          nextWeek.setDate(today.getDate() + 7);
          matchDueDate = taskDay >= today && taskDay <= nextWeek;
        } else if (
          selectedDueDate === "this-month" ||
          selectedDueDate === "this month"
        ) {
          matchDueDate =
            taskDay.getMonth() === today.getMonth() &&
            taskDay.getFullYear() === today.getFullYear();
        }
      }

      return matchCategory && matchPriority && matchStatus && matchDueDate;
    });
  },
};
