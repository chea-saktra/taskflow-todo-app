import { Modal } from "../components/modal/Modal";
import { TaskForm } from "../components/task-form/TaskForm";

export function openTaskModal(initialData = null) {
  const appContainer = document.body;
  let modalInstance = null;

  const handleClose = () => {
    if (modalInstance && modalInstance.parentNode) {
      modalInstance.remove();
    }
  };

  const formContent = TaskForm({
    initialData: initialData || {},
    onClose: handleClose,
    onSubmitSuccess: handleClose,
  });

  modalInstance = Modal({
    content: [formContent],
    onClose: handleClose,
  });

  appContainer.append(modalInstance);
}
