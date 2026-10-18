import { BaseState } from "./BaseState";

class ErrorState extends BaseState {
  constructor() {
    super();

    this.error = null;
  }

  getError() {
    return this.error;
  }

  hasError() {
    return Boolean(this.error);
  }

  set(error) {
    this.error = {
      message: error?.message || String(error) || "Something went wrong.",
      code: error?.code || null,
    };

    this.notify(this.error);
  }

  clear() {
    this.error = null;
    this.notify(null);
  }
}

export const errorState = new ErrorState();
