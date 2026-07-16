export function generateUUID() {
  if (crypto && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
