import { BaseState } from "./BaseState";

class SearchState extends BaseState {
  constructor() {
    super();
    this.query = "";
  }

  getQuery() {
    return this.query;
  }

  setQuery(query = "") {
    const value = query.trim().toLowerCase();
    if (this.query === value) return;
    this.query = value;
    this.notify(this.query);
  }

  clear() {
    this.setQuery("");
  }
}

export const searchState = new SearchState();
