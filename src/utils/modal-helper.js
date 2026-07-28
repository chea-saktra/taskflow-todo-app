import { FilterModal } from "../components/Filter/FllterModal";
import { Modal } from "../components/modal/Modal";
import { TaskDetail } from "../components/task-detail/TaskDetail";
import { TaskForm } from "../components/task-form/TaskForm";
import { TaskController } from "../features/tasks/controller";

function mountModal(renderContent) {
  let modalInstance = null;

  const handleClose = () => {
    if (modalInstance && modalInstance.parentNode) {
      modalInstance.remove();
    }
  };

  modalInstance = renderContent(handleClose);

  if (modalInstance) {
    document.body.append(modalInstance);
  }
}

export function openTaskModal(initialData = null) {
  mountModal((handleClose) => {
    const formContent = TaskForm({
      initialData: initialData || {},
      onClose: handleClose,
      onSubmitSuccess: handleClose,
    });

    return Modal({
      content: [formContent],
      onClose: handleClose,
    });
  });
}

export function openFilterModal() {
  mountModal((handleClose) => {
    return FilterModal({
      onClose: handleClose,
    });
  });
}

export function openTaskDetailModal(task) {
  mountModal((handleClose) => {
    return TaskDetail({
      task,
      onClose: handleClose,
      onEdit: (taskToEdit) => {
        handleClose();
        openTaskModal(taskToEdit);
      },
      onDelete: (taskToDelete) => {
        if (confirm("Are you sure you want to delete this task?")) {
          handleClose();
          TaskController.removeTask(taskToDelete.id || taskToDelete);
        }
      },
    });
  });
}
