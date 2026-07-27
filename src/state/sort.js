class Sort {
  constructor() {
    this.sortBy = "dueDate";
    this.order = "asc";
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach((listener) =>
      listener({ sortBy: this.sortBy, order: this.order }),
    );
  }

  setSort(sortBy, order = "asc") {
    this.sortBy = sortBy;
    this.order = order;
    this.notify();
  }
}

export const sortState = new Sort();
