import { BaseState } from "./BaseState";

class TaskState extends BaseState {
  constructor() {
    super();
    this.tasks = [];
  }

  setTasks(tasks) {
    this.tasks = [...tasks];
    this.notify(this.getTasks());
  }

  getTasks() {
    return [...this.tasks];
  }
}

export const taskState = new TaskState();
