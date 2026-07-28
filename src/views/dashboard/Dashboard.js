import "./dashboard.css";
import { createElement } from "../../utils";
import { taskState } from "../../state/task";
import { renderTaskList } from "../../features/tasks/renderer";
import { Fab } from "../../components/fab/Fab";
import { openTaskModal } from "../../utils/modal-helper";
import { createProgressRing } from "../../utils/progressPercent";
import { AnalyticsCard } from "../../components/analytics/AnalyticsCard";
import { routerState } from "../../state/router";

const createStatCard = (
  title,
  value,
  hasProgress = false,
  progressPercent = 0,
) => {
  const children = [
    createElement("span", {
      className: "stat-card__title",
      textContent: title,
    }),
  ];

  let valueEl = createElement("span", {
    className: "stat-card__value",
    textContent: hasProgress ? `${progressPercent}%` : value,
  });

  const rightElement = hasProgress ? createProgressRing(progressPercent) : null;

  const valueContainer = createElement("div", {
    className: "stat-card__value-container",
    children: rightElement ? [valueEl, rightElement] : [valueEl],
  });

  children.push(valueContainer);

  return createElement("div", {
    className: "stat-card stat-card--desktop",
    children: children,
  });
};

const createMobileSummaryCard = (stats, formattedDate) => {
  const progressPercent = stats.progress || 0;
  const progressRing = createProgressRing(progressPercent);

  progressRing.append(
    createElement("span", {
      className: "absolute-center stat-card__progress-text",
      textContent: `${progressPercent}%`,
    }),
  );

  return createElement("div", {
    className: "stat-card stat-card--mobile",
    children: [
      createElement("div", {
        className: "stat-card__mobile-left",
        children: [
          createElement("span", {
            className: "stat-card__mobile-today",
            textContent: "Today",
          }),
          createElement("span", {
            className: "stat-card__mobile-date",
            textContent: formattedDate,
          }),
        ],
      }),
      createElement("div", {
        className: "stat-card__mobile-center",
        children: [
          createElement("div", {
            className: "stat-card__mobile-stat-row",
            children: [
              createElement("span", {
                className: "stat-card__mobile-count",
                textContent: stats.total ?? "0",
              }),
              createElement("span", {
                className: "stat-card__mobile-lbl",
                textContent: " Tasks",
              }),
            ],
          }),
          createElement("div", {
            className: "stat-card__mobile-stat-row",
            children: [
              createElement("span", {
                className: "stat-card__mobile-count",
                textContent: stats.completed ?? "0",
              }),
              createElement("span", {
                className: "stat-card__mobile-lbl",
                textContent: " Completed",
              }),
            ],
          }),
        ],
      }),
      progressRing,
    ],
  });
};
export const DashboardView = () => {
  const container = createElement("section", {
    className: "dashboard-view",
  });

  const todayDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return `Good morning 👋`;
    if (hour < 18) return `Good afternoon 👋`;
    return `Good evening 👋`;
  };

  const render = () => {
    container.innerHTML = "";

    const stats = taskState.getStats();
    const tasks = taskState.getTasks();

    const welcomeSection = createElement("div", {
      className: "dashboard-view__welcome",
      children: [
        createElement("h2", {
          textContent: getGreeting(),
        }),
        createElement("p", {
          textContent: "Let's complete your tasks!",
        }),
      ],
    });

    const statsGrid = createElement("div", {
      className: "dashboard-view__stats-grid",
      children: [
        createMobileSummaryCard({ ...stats }, todayDate),
        createStatCard("Total Tasks", stats.total || "0"),
        createStatCard("Completed", stats.completed || "0"),
        createStatCard("Pending", stats.pending || "0"),
        createStatCard("Progress", "", true, stats.progress || 0),
      ],
    });

    const tasksHeader = createElement("div", {
      className: "dashboard-tasks__header",
      children: [
        createElement("h3", {
          className: "dashboard-tasks__title",
          textContent: "Today Tasks",
        }),
        createElement("button", {
          className: "dashboard-tasks__see-all",
          textContent: "See all",
          attributes: { type: "button" },
          events: {
            click: (e) => {
              e.preventDefault();
              routerState.navigate("tasks");
            },
          },
        }),
      ],
    });

    const tasksContainer = createElement("div", {
      className: "dashboard-task__list",
    });

    renderTaskList(tasksContainer, tasks.slice(0, 5));

    const tasksSection = createElement("div", {
      className: "dashboard-view__tasks-section",
      children: [tasksHeader, tasksContainer],
    });

    const analyticsSection = createElement("div", {
      className: "dashboard-view__analytics-section",
      children: [AnalyticsCard({ tasks: tasks })],
    });

    const contentLayout = createElement("div", {
      className: "dashboard-view__content-layout",
      children: [tasksSection, analyticsSection],
    });

    const btnFab = Fab({
      onClick: () => openTaskModal(),
    });

    container.append(welcomeSection, statsGrid, contentLayout, btnFab);

    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  const unsubscribe = taskState.subscribe(render);

  container.onDestroy = () => {
    unsubscribe();
  };

  render();

  return container;
};
