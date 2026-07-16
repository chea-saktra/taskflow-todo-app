export function validateTaskTitle(text) {
  const trimmedText = text ? text.trim() : "";

  if (!trimmedText) {
    return { isValid: false, error: "Task title cannot be empty.", value: "" };
  }

  if (trimmedText.length > 100) {
    return {
      isValid: false,
      error: "Task title must be less than 100 characters.",
      value: trimmedText,
    };
  }

  return {
    isValid: true,
    error: null,
    value: trimmedText,
  };
}

export function isValidDate(dateString) {
  if (!dateString) return true;

  const timestamp = Date.parse(dateString);
  return !isNaN(timestamp);
}

export function isValidPriority(priority) {
  const validPriorities = ["High", "Medium", "Low"];
  return validPriorities.includes(priority);
}
