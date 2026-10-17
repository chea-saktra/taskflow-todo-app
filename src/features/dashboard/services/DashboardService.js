import { dashboardActivity } from "./DashboardActivity";
import { dashboardStatistics } from "./DashboardStatistics";
import { dashboardTasks } from "./DashboardTasks";

class DashboardService {
  getOverview() {
    return dashboardStatistics.getOverview();
  }

  getStatus() {
    return dashboardStatistics.getStatus();
  }

  getPriority() {
    return dashboardStatistics.getPriority();
  }

  getCategory() {
    return dashboardStatistics.getCategory();
  }

  getUpcoming(limit = 5) {
    return dashboardTasks.getUpcoming(limit);
  }

  getOverdue(limit = 5) {
    return dashboardTasks.getOverdue(limit);
  }

  getRecent(limit = 5) {
    return dashboardTasks.getRecent(limit);
  }

  getFavorites(limit = 5) {
    return dashboardTasks.getFavorites(limit);
  }

  getProductivity() {
    return dashboardActivity.getProductivity();
  }

  getRecentActivity(limit = 5) {
    return dashboardActivity.getRecentActivity(limit);
  }

  getDashboardData() {
    return {
      overview: this.getOverview(),
      status: this.getStatus(),
      priority: this.getPriority(),
      category: this.getCategory(),

      upcoming: this.getUpcoming(),
      overdue: this.getOverdue(),
      recent: this.getRecent(),
      favorites: this.getFavorites(),

      productivity: this.getProductivity(),
      activity: this.getRecentActivity(),
    };
  }
}

export const dashboardService = new DashboardService();
