
/**
 * Format a number as Bangladeshi Taka.
 */
export function formatPrice(amount) {
  if (amount === null || amount === undefined || amount === "") {
    return "Price unavailable";
  }

  const number = Number(amount);

  if (!Number.isFinite(number)) {
    return "Price unavailable";
  }

  return `৳${number.toLocaleString("en-BD")}`;
}

/**
 * Format a date into a readable format.
 */
export function formatDate(date) {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  return parsedDate.toLocaleDateString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Calculate the number of days between two dates.
 */
export function getDaysBetween(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime())
  ) {
    return 0;
  }

  const difference = Math.abs(end.getTime() - start.getTime());

  return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

/**
 * Shorten long text.
 */
export function truncateText(text, maxLength = 100) {
  if (!text) return "";

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}...`;
}

/**
 * Convert a string into a URL-friendly slug.
 */
export function createSlug(text) {
  if (!text) return "";

  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
