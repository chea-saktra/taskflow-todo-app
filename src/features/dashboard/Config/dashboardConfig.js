export const getTaskUiProps = (task={}) => {
  const dueDateObj = task.dueDate ? new Date(task.dueDate) : null;
  const rawDate = task.updatedAt || task.createdAt;
  const createdDateObj = rawDate ? new Date(rawDate) : null;

  return {
    title: task.title || "Untitled Task",
    description: task.description || "",
    dueDateLabel: dueDateObj ? dueDateObj.toLocaleDateString() : "",
    dateLabel: createdDateObj ? createdDateObj.toLocaleDateString() : "",
    priorityLabel: task.priority ? task.priority.toUpperCase() : "",
    statusLabel: task.status ? task.status.replace("_", " ").toUpperCase() : "",
    priority: task.priority,
    status: task.status,
  };
};

export const getProductivityMetrics = ({
  completedTasks = 0,
  totalTasks = 0,
  completionRate = 0,
} = {}) => [
  {
    label: "Completed",
    value: `${completedTasks}/${totalTasks}`,
  },
  {
    label: "Completion Rate",
    value: `${completionRate}%`,
  },
];
