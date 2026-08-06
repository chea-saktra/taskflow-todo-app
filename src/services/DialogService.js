class DialogService {
  confirm(message) {
    return window.confirm(message);
  }

  alert(message) {
    window.alert(message);
  }

  prompt(message, defaultValue = "") {
    return window.prompt(message, defaultValue);
  }
}

export const dialogService = new DialogService();
