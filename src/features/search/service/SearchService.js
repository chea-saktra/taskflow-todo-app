import { TASK_STATUS } from "../../../constants";
import { searchState, taskState } from "../../../state";

class SearchService {
  getQuery() {
    return searchState.getQuery();
  }

  getResults() {
    return searchState.getResults();
  }

  getTasks() {
    return taskState.getTasks();
  }

  #updateTaskStateAndRefresh(updateFn) {
    const updatedTask = updateFn(this.getTasks());
    taskState.setTasks(updatedTask);
    return this.search(this.getQuery());
  }

  #toggleTaskProperty(taskId, mutateFn) {
    return this.#updateTaskStateAndRefresh((tasks) =>
      tasks.map((task) => (task.id === taskId ? mutateFn(task) : task)),
    );
  }

  search(query = "") {
    const keyword = query.trim().toLowerCase();
    searchState.setQuery(query);
    if (!keyword) {
      searchState.setResults([]);
      return [];
    }

    try {
      const results = this.getTasks().filter((task) => {
        const fields = [
          task.title,
          task.description,
          task.category,
          task.priority,
          task.priority,
          task.status,
        ];

        return fields.some((field) => field?.toLowerCase().includes(keyword));
      });

      searchState.setResults(results);
      return results;
    } catch (error) {
      searchState.setError(error.message || "Search failed.");
      return [];
    }
  }

  // Actions

  toggleCompleted(taskId) {
    return this.#toggleTaskProperty(taskId, (task) => ({
      ...task,
      status:
        task.status === TASK_STATUS.COMPLETED
          ? TASK_STATUS.TODO
          : TASK_STATUS.COMPLETED,
    }));
  }

  toggleFavorite(taskId) {
    return this.#toggleTaskProperty(taskId, (task) => ({
      ...task,
      favorite: !task.favorite,
    }));
  }

  toggleArchive(taskId) {
    return this.#toggleTaskProperty(taskId, (task) => ({
      ...task,
      archived: !task.archived,
    }));
  }

  deleteTask(taskId) {
    return this.#updateTaskStateAndRefresh((tasks) =>
      tasks.filter((task) => task.id !== taskId),
    );
  }

  getSuggestions(query = "", limit = 5) {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return [];

    return this.getTasks()
      .filter((task) => task.title?.toLowerCase().includes(keyword))
      .slice(0, limit)
      .map(({ id, title }) => ({ id, title }));
  }

  clear() {
    searchState.reset();
    return [];
  }
}

export const searchService = new SearchService();
