export class StorageService {
  static get(key, fallback = null) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      console.error(`Storage get error: ${key}`, error);
      return fallback;
    }
  }

  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Storage set error: ${key}`, error);
      return false;
    }
  }

  static remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Storage remove error: ${key}`, error);
    }
  }

  static clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Storage clear error", error);
    }
  }

  static has(key) {
    return localStorage.getItem(key) !== null;
  }
}
