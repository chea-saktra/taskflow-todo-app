class NotificationService {
  success(message) {
    this.show(message, "success");
  }

  error(message) {
    this.show(message, "error");
  }

  warning(message) {
    this.show(message, "warning");
  }

  info(message) {
    this.show(message, "info");
  }

  show(message, type = "info") {
    document.dispatchEvent(
      new CustomEvent("toast:show", {
        detail: {
          message,
          type,
        },
      }),
    );
  }
}

export const notificationService = new NotificationService();
