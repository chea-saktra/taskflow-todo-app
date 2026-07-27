class Search {
  constructor() {
    this.searchQuery = "";
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.searchQuery));
  }

  getSearchQuery() {
    return this.searchQuery;
  }

  setSearchQuery(query) {
    this.searchQuery = query.toLowerCase().trim();
    this.notify();
  }

  clearSearch() {
    this.searchQuery = "";
    this.notify();
  }
}

export const searchState = new Search();
