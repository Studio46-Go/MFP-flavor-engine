/** Short display labels for the 20 flavor dimensions */
export const DIMENSION_SHORT_LABELS: readonly string[] = [
  "Umami",
  "Salt",
  "Sweet",
  "Sour",
  "Bitter",
  "Heat",
  "Spice",
  "Smoke",
  "Roast",
  "Fat",
  "Cream",
  "Herb",
  "Citrus",
  "Allium",
  "Ferment",
  "Earth",
  "Nutty",
  "Floral",
  "Crisp",
  "Tender",
] as const;

/** Format a score value as a percentage string */
export function formatScore(value: number): string {
  return `${Math.round(value * 100)}`;
}

/** Format a delta score with sign */
export function formatDelta(value: number): string {
  const pct = Math.round(value * 100);
  return pct >= 0 ? `+${pct}` : `${pct}`;
}

/** Get a color for a score value (0-1) */
export function scoreColor(value: number): string {
  if (value >= 0.8) return "var(--success)";
  if (value >= 0.6) return "var(--accent)";
  if (value >= 0.4) return "var(--warning)";
  return "var(--error)";
}

/** Get human-readable label for cooking method */
export function methodLabel(method: string): string {
  return method
    .replace(/_METHOD$/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Get human-readable label for dish type */
export function dishTypeLabel(dishType: string): string {
  return dishType
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Get human-readable label for structural role */
export function roleLabel(role: string): string {
  return role
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Get human-readable recommendation type */
export function recTypeLabel(type: string): string {
  switch (type) {
    case "ADD_IN":
      return "Add";
    case "SUBSTITUTION":
      return "Swap";
    case "FIX":
      return "Fix";
    case "METHOD_ADJUSTMENT":
      return "Method";
    default:
      return type;
  }
}

/** Get CSS class for recommendation type */
export function recTypeClass(type: string): string {
  switch (type) {
    case "ADD_IN":
      return "rec-add";
    case "SUBSTITUTION":
      return "rec-swap";
    case "FIX":
      return "rec-fix";
    case "METHOD_ADJUSTMENT":
      return "rec-method";
    default:
      return "";
  }
}
