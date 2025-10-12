export const toYyyyMMdd = (input) => {
  if (!input) return "";

  if (typeof input === "string") {
    if (/^\d{8}$/.test(input)) return input; // "20251012"
    if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
      // "2025-10-12"
      return input.replaceAll("-", "");
    }
  }

  if (input instanceof Date && !isNaN(input)) {
    const y = input.getFullYear();
    const m = String(input.getMonth() + 1).padStart(2, "0");
    const d = String(input.getDate()).padStart(2, "0");
    return `${y}${m}${d}`;
  }

  // 안전망: "YYYY/MM/DD" 등 들어오면 Date로 시도
  const dt = new Date(input);
  if (!isNaN(dt)) {
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    const d = String(dt.getDate()).padStart(2, "0");
    return `${y}${m}${d}`;
  }

  return "";
};
