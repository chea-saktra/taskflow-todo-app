export function escapeHTML(string) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };

  return String(string).replace(/[&<>"'/]/g, (s) => map[s]);
}

export function cnBEM(blockElement, modifier, condition) {
  if (!condition || !modifier) return blockElement;
  return `${blockElement} ${blockElement}--${modifier}`;
}
