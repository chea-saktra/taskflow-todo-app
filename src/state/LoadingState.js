import { BaseState } from "./BaseState";

class LoadingState extends BaseState {
  constructor() {
    super();
    this.loadingCount = 0;
  }

  isLoading() {
    return this.loadingCount > 0;
  }

  getCount() {
    return this.loadingCount;
  }

  start() {
    this.loadingCount += 1;
    this.notify(this.isLoading());
    return this.loadingCount;
  }

  stop() {
    this.loadingCount = Math.max(0, this.loadingCount - 1);
    this.notify(this.isLoading());
  }

  reset() {
    this.loadingCount = 0;
    this.notify(false);
  }
}

export const loadingState = new LoadingState();
