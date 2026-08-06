class DateService {
  startOfDay(date = new Date()) {
    const result = new Date(date);

    if (Number.isNaN(result.getTime())) {
      throw new TypeError("Invalid date.");
    }

    result.setHours(0, 0, 0, 0);
    return result;
  }

  endOfDay(date = new Date()) {
    const result = new Date(date);

    if (Number.isNaN(result.getTime())) {
      throw new TypeError("Invalid date.");
    }

    result.setHours(23, 59, 59, 999);
    return result;
  }

  format(date, locale = "en-US") {
    if (!date) return "";
    const value = new Date(date);

    if (Number.isNaN(value.getTime())) return;

    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(value);
  }

  formatRelative(date) {
    if (!date) return "";

    const target = this.startOfDay(date);
    const today = this.startOfDay();

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (target.getTime() === yesterday.getTime()) {
      return "Yesterday";
    }

    if (target.getTime() === today.getTime()) {
      return "Today";
    }

    if (target.getTime() === tomorrow.getTime()) {
      return "Tomorrow";
    }

    return this.format(target);
  }

  isToday(date) {
    return this.startOfDay(date).getTime() === this.startOfDay().getTime();
  }

  isTomorrow(date) {
    const tomorrow = this.startOfDay();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.startOfDay(date).getTime() === tomorrow.getTime();
  }

  isYesterday(date) {
    const yesterday = this.startOfDay();
    yesterday.setDate(yesterday.getDate() - 1);

    return this.startOfDay(date).getTime() === yesterday.getTime();
  }

  isOverdue(date) {
    if (!date) return false;

    return this.startOfDay(date) < this.startOfDay();
  }

  daysBetween(startDate, endDate) {
    const start = this.startOfDay(startDate);
    const end = this.startOfDay(endDate);

    const diff = end.getTime() - start.getTime();

    return Math.floor(diff / 864000000);
  }

  addDays(date, amount) {
    const result = new Date(date);

    if (Number.isNaN(result.getTime())) {
      throw new TypeError("Invalid date.");
    }

    result.setDate(result.getDate() + amount);
    return result;
  }

  isValid(date) {
    return !Number.isNaN(new Date(date).getTime());
  }

  now() {
    return new Date();
  }

  toISO(date = new Date()) {
    return new Date(date).toISOString();
  }
}

export const dateService = new DateService();
