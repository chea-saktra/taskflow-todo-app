import { FilterModal } from "../components/Filter/FllterModal";

export function openFilterModal() {
  const appContainer = document.body;
  let modalInstaces = null;

  const handleClose = () => {
    if (modalInstaces && modalInstaces.parentNode) {
      modalInstaces.remove();
    }
  };

  modalInstaces = FilterModal({
    onClose: handleClose,
  });

  appContainer.append(modalInstaces);
}
