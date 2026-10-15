import "./dashboard.css";
import { DashboardOverdue } from "../../features/dashboard/components/dashboard-overdue/DashboardOverdue";
import { DashboardOverview } from "../../features/dashboard/components/dashboard-overview/DashboardOverview";
import { DashboardProductibity } from "../../features/dashboard/components/dashboard-productivity/DashboardProductivity";
import { DashboardProgress } from "../../features/dashboard/components/dashboard-progress/DashboardProgress";
import { DashboardRecent } from "../../features/dashboard/components/dashboard-recent/DashboardRecent";
import { DashboardStatistics } from "../../features/dashboard/components/dashboard-statistics/DashboardStatistics";
import { DashboardUpcoming } from "../../features/dashboard/components/dashboard-upcoming/DashboardUpcoming";
import { Page, PageContent, PageHeader } from "../../layouts";
import { Button } from "../../components";
import { createElement } from "../../utils";

export const DashboardPage = ({
  overview,
  progress,
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
  onViewAllTasks,
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
              className: "dashboard-grid__span-2",
              children: [
                DashboardProgress({
                  ...progress,
                }),
              ],
            }),

            createElement("div", {
              className: "dashboard-grid__span-1",
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
                DashboardUpcoming({
                  tasks: upcoming,
                  onTaskClick,
                  onViewAll: () => onViewAllTasks?.("upcoming"),
                }),
              ],
            }),

            createElement("div", {
              className: "dashboard-grid__span-1",
              children: [
                DashboardOverdue({
                  tasks: overdue,
                  onTaskClick,
                  onViewAll: () => onViewAllTasks?.("overdue"),
                }),
              ],
            }),

            createElement("div", {
              className: "dashboard-grid__span-1",
              children: [
                DashboardRecent({
                  tasks: recent,
                  onTaskClick,
                  onViewAll: () => onViewAllTasks?.("recent"),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
};
