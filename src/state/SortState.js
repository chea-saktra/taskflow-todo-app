import { BaseState } from "./BaseState";

class SortState extends BaseState {
  constructor() {
    super();
    this.sortBy = "dueDate";
    this.order = "asc";
  }

  getSort() {
    return {
      sortBy: this.sortBy,
      order: this.order,
    };
  }

  setSort(sortBy, order = "asc") {
    this.sortBy = sortBy;
    this.order = order;
    this.notify(this.getSort());
  }
}

export const sortState = new SortState();
