export function truncateText(text, maxLength = 60) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export function formatPercentage(value, total) {
  if (!total || total === 0) return "0%";
  const percentage = Math.round((value / total) * 100);
  return `${percentage}%`;
}

export function capitalize(string) {
  if (!string) return "";
  return string.at(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function highlightMatch(text, query) {
  if (!text) return "";
  if (!query || !query.trim()) return text;

  const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  const regex = new RegExp(`(${escapedQuery})`, "gi");

  return text.replace(regex, '<mark class="search-highlight">$1</mark>');
}
