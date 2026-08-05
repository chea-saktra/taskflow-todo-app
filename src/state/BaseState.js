export class BaseState {
  constructor() {
    this.listeners = new Set();
  }

  subscribe(listener) {
    if (typeof listener !== "function") {
      throw new TypeError("Listener must be a function.");
    }
    this.listeners.add(listener);
    return () => this.unsubscribe(listener);
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);
  }

  clearListeners() {
    this.listeners.clear();
  }

  notify(payload) {
    for (const listener of [...this.listeners]) {
      listener(payload);
    }
  }

  getSubscriberCount() {
    return this.listeners.size;
  }
}
