export class DashboardHandlers {
  constructor(actions, renderFn, navigationCallbacks = {}) {
    this.actions = actions;
    this.render = renderFn;
    this.navigation = navigationCallbacks;
  }

  handleRefresh = () => {
    this.actions.refresh();
    this.render();
  };

  handleTaskClick = (item) => {
    this.navigation.onTaskClick?.(item);
  };

  handleCreateTask = () => {
    this.navigation.onCreateTask?.();
  };
}
