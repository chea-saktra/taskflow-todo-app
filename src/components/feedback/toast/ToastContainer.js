import { notificationState } from "../../../state/NotificationState";
import { createElement } from "../../../utils";
import { Toast } from "./Toast";

export const ToastContainer = () => {
  const notifications = notificationState.getNotifications();

  return createElement("div", {
    className: "toast-container",
    children: notifications.map((notification) =>
      Toast({ ...notification, onClose: (id) => notificationState.remove(id) }),
    ),
  });
};
