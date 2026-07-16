function startOfDay(date) {
  const result = new Date(date);
  if (isNaN(result.getTime())) return null;
  result.setHours(0, 0, 0, 0);
  return result;
}

export function formatDate(date) {
  if (!date) return ``;

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function formatRelativeDate(date) {
  if (!date) return "";

  const target = startOfDay(date);
  const today = startOfDay(new Date());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isSameDay = (d1, d2) => d1.getTime() === d2.getTime();

  if (isSameDay(target, yesterday)) return "Yesterday";
  if (isSameDay(target, today)) return "Today";
  if (isSameDay(target, tomorrow)) return "Tomorrow";

  return formatDate(target);
}

export function isOverdue(dueDate) {
  if (!dueDate) return false;
  return startOfDay(dueDate) < startOfDay(new Date());
}
