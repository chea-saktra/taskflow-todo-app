import { BaseState } from "./BaseState";

class FilterState extends BaseState {
  constructor() {
    super();
    this.filters = {
      category: "all",
      priority: "all",
      status: "all",
      dueDate: "all",
    };
  }

  getFilters() {
    return { ...this.filters };
  }

  setFilter(key, value) {
    if (!(key in this.filters)) return;
    this.filters[key] = value;
    this.notify(this.getFilters());
  }

  setFilters(filters = {}) {
    this.filters = {
      ...this.filters,
      ...filters,
    };
    this.notify(this.getFilters());
  }

  reset() {
    this.filters = {
      category: "all",
      priority: "all",
      status: "all",
      dueDate: "all",
    };
    this.notify(this.getFilters());
  }
}

export const filterState = new FilterState();
