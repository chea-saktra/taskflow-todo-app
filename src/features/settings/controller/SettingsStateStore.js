export class SettingsStateStore {
  constructor() {
    this.resetState();
  }

  resetState() {
    this.activeTab = "appearance";
    this.isDirty = false;
    this.errors = {};
  }

  setActiveTab(tabName) {
    this.activeTab = tabName;
  }

  setDirty(isDirty = true) {
    this.isDirty = isDirty;
  }

  setErrors(errors = {}) {
    this.errors = errors;
  }

  clearErrors() {
    this.errors = {};
  }
}
