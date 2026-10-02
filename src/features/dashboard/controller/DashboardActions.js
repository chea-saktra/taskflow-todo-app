import { dashboardService } from "../services/DashboardService";

export class DashboardActions {
  constructor(store) {
    this.store = store;
  }

  load = () => {
    this.store.setLoading(true);
    this.store.setError(null);

    try {
      const data = dashboardService.getDashboardData();
      this.store.setData(data);
      return data;
    } catch (error) {
      console.log("Dashboard load failed:", error);
      this.store.setError(error);
      return null;
    } finally {
      this.store.setLoading(false);
    }
  };

  refresh() {
    return this.load();
  }
}
