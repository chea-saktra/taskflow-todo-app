import { notificationState } from "../state/NotificationState";

class NotificationService {
  show(message, type = "info", duration = 3000) {
    this.clear();
    const id = notificationState.add({
      message,
      type,
      duration,
    });

    if (duration > 0) {
      setTimeout(() => {
        notificationState.remove(id);
      }, duration);
    }

    return id;
  }

  success(message, duration = 3000) {
    return this.show(message, "success", duration);
  }

  error(message, duration = 4000) {
    this.show(message, "error", duration);
  }

  warning(message, duration = 3500) {
    this.show(message, "warning", duration);
  }

  info(message, duration = 3000) {
    this.show(message, "info", duration);
  }

  remove(id) {
    notificationState.remove(id);
  }

  clear() {
    notificationState.clear();
  }
}

export const notificationService = new NotificationService();
