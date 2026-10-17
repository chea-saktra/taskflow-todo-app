import "./dashboard.css";
import { DashboardOverview } from "../../features/dashboard/components/dashboard-overview/DashboardOverview";
import { DashboardProductibity } from "../../features/dashboard/components/dashboard-productivity/DashboardProductivity";
import { DashboardStatistics } from "../../features/dashboard/components/dashboard-statistics/DashboardStatistics";
import { Page, PageContent, PageHeader } from "../../layouts";
import { Button } from "../../components";
import { createElement } from "../../utils";
import { DashbaordTaskList } from "../../features/dashboard/components/dashboard-task-list/DashboardTaskList";

export const DashboardPage = ({
  overview,
  status,
  priority,

  category,
  upcoming,
  overdue,
  recent,
  favorites,

  productivity,
  activity,

  onRefresh,
  onTaskClick,
  onCreateTask,
} = {}) => {
  return Page({
    header: PageHeader({
      title: "Dashboard",
      subtitle: "Overivew of your tasks and productivity",
      actions: createElement("div", {
        className: "page-header__actions",
        children: [
          Button({
            icon: "plus",
            variant: "primary",
            text: "Create Task",
            events: onCreateTask ? { click: onCreateTask } : null,
            attributes: { "aria-label": "Create new task" },
          }),
          Button({
            icon: "refresh-cw",
            variant: "outline",
            text: "Refresh",
            events: onRefresh ? { click: onRefresh } : null,
            attributes: { "aria-label": "Refresh dashboard" },
          }),
        ],
      }),
    }),

    content: PageContent({
      children: [
        createElement("div", {
          className: "dashboard-grid",
          children: [
            createElement("div", {
              className: "dashboard-grid__full",
              children: [
                DashboardOverview({
                  data: overview,
                }),
              ],
            }),

            createElement("div", {
              className: "dashboard-grid__full",
              children: [
                DashboardStatistics({
                  status,
                  priority,
                  category,
                }),
              ],
            }),

            createElement("div", {
              className: "dashboard-grid__full",
              children: [
                DashboardProductibity({
                  ...productivity,
                }),
              ],
            }),

            createElement("div", {
              className: "dashboard-grid__span-1",
              children: [
                DashbaordTaskList({
                  title: "Favorite Tasks",
                  description: "Your bookmarked or starred tasks.",
                  items: favorites,
                  variant: "favorites",
                  onItemClick: onTaskClick,
                  emptyState: {
                    icon: "star",
                    title: "No favorite tasks",
                    description: "You have on favorite tasks.",
                  },
                }),
              ],
            }),

            createElement("div", {
              className: "dashboard-grid__span-1",
              children: [
                DashbaordTaskList({
                  title: "Upcoming Tasks",
                  description: "Tasks that are coming up next.",
                  items: upcoming,
                  variant: "upcoming",
                  onItemClick: onTaskClick,
                  emptyState: {
                    icon: "calendar",
                    title: "No upcoming tasks",
                    description: "You don't have any upcoming tasks.",
                  },
                }),
              ],
            }),

            createElement("div", {
              className: "dashboard-grid__span-1",
              children: [
                DashbaordTaskList({
                  title: "Overdue Tasks",
                  description: "Tasks that have passed their due date.",
                  items: overdue,
                  variant: "overdue",
                  onItemClick: onTaskClick,
                  emptyState: {
                    icon: "check-circle",
                    title: "No overdue tasks",
                    description: "You're all caught up.",
                  },
                }),
              ],
            }),

            createElement("div", {
              className: "dashboard-grid__span-1",
              children: [
                DashbaordTaskList({
                  title: "Recent Tasks",
                  description: "Your recently created or updated tasks.",
                  items: recent,
                  variant: "recent",
                  onItemClick: onTaskClick,
                  emptyState: {
                    icon: "clock",
                    title: "No recent tasks",
                    description: "There are no recent tasks to display.",
                  },
                }),
              ],
            }),

            createElement("div", {
              className: "dashboard-grid__full",
              children: [
                DashbaordTaskList({
                  title: "Recent Activity",
                  description: "Latest updates on your tasks.",
                  items: activity,
                  variant: "activity",
                  onItemClick: onTaskClick,
                  emptyState: {
                    icon: "activity",
                    title: "No recent activity",
                    description: "There is no recent activity to display",
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
};
