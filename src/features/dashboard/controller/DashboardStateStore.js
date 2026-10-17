export class DashboardStateStore {
  constructor() {
    this.resetState();
  }

  resetState() {
    this.data = {
      overview: {
        total: 0,
        todo: 0,
        inProgress: 0,
        completed: 0,
        overdue: 0,
        favorites: 0,
        archived: 0,
      },

      status: {},
      priority: {},
      category: {},

      upcoming: [],
      overdue: [],
      recent: [],
      favorites: [],

      productivity: {
        totalTasks: 0,
        completedTasks: 0,
        completionRate: 0,
      },

      activity: [],
    };

    this.loading = false;
    this.error = null;
  }

  setData(data = {}) {
    this.data = {
      ...this.data,
      ...data,
    };
  }

  getData() {
    return this.data;
  }

  setLoading(value) {
    this.loading = value;
  }

  isLoading() {
    return this.loading;
  }

  setError(error) {
    this.error = error;
  }

  getError() {
    return this.error;
  }
}
