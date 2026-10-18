import { BaseState } from "./BaseState";

class NotificationState extends BaseState {
  constructor() {
    super();

    this.notifications = [];
  }

  getNotifications() {
    return this.notifications;
  }

  add(notification) {
    const item = {
      id: crypto.randomUUID(),
      type: notification.type || "info",
      message: notification.message || "",
      duration: notification.duration ?? 3000,
    };

    this.notifications = [...this.notifications, item];

    this.notify(this.notifications);
    return item.id;
  }

  remove(id) {
    this.notifications = this.notifications.filter(
      (notification) => notification.id !== id,
    );

    this.notify(this.notifications);
  }

  clear() {
    this.notifications = [];
    this.notify(this.notifications);
  }
}

export const notificationState = new NotificationState();
