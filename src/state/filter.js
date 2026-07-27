class Filter {
  constructor() {
    this.category = "all";
    this.priority = "all";
    this.status = "all";
    this.dueDate = "all";
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach((listener) => {
      listener({
        category: this.category,
        priority: this.priority,
        status: this.status,
        dueDate: this.dueDate,
      });
    });
  }

  setCategory(category) {
    this.category = category;
    this.notify();
  }

  setPriority(priority) {
    this.priority = priority;
    this.notify();
  }

  setStatus(status) {
    this.status = status;
    this.notify();
  }

  setDueDate(dueDate) {
    this.dueDate = dueDate;
    this.notify();
  }

  setAllFilters(filters = {}) {
    if (filters.category !== undefined) this.category = filters.category;
    if (filters.priority !== undefined) this.priority = filters.priority;
    if (filters.status !== undefined) this.status = filters.status;
    if (filters.dueDate !== undefined) this.dueDate = filters.dueDate;
    this.notify();
  }

  resetFilter() {
    this.category = "all";
    this.priority = "all";
    this.status = "all";
    this.dueDate = "all";
    this.notify();
  }
}

export const filterState = new Filter();
