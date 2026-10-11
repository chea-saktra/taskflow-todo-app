export class SearchStateStore {
  constructor() {
    this.resetState();
  }

  resetState() {
    this.query = "";
    this.results = [];
    this.selectedCategory = "all";
    this.selectedPriority = "all";
    this.selectedStatus = "all";
    this.suggestions = [];
  }

  setQuery(query = "") {
    this.query = query;
  }

  setResults(results = []) {
    this.results = [...results];
  }

  setSuggestions(suggestions = []) {
    this.suggestions = [...suggestions];
  }

  setFilterCategory(category = "all") {
    this.selectedCategory = category;
  }

  setFilterPriority(priority = "all") {
    this.selectedPriority = priority;
  }

  setFilterStatus(status = "all") {
    this.selectedStatus = status;
  }
}
