import { BaseState } from "./BaseState";

class SearchState extends BaseState {
  constructor() {
    super();
    this.query = "";
    this.results = [];
  }

  setQuery(query = "") {
    this.query = query;
    this.notify(this.getState());
  }

  getQuery() {
    return this.query;
  }

  setResults(results) {
    this.results = [...results];
    this.notify(this.getState());
  }

  getResults() {
    return [...this.results];
  }

  getState() {
    return {
      query: this.query,
      results: [...this.results],
      isLoading: this.isLoading,
      error: this.error,
    };
  }

  reset() {
    this.query = "";
    this.results = [];

    this.notify(this.getState());
  }
}

export const searchState = new SearchState();
