/**
 * Converts a Date object to an ISO string, or returns the value as-is if it's not a Date.
 * Useful for converting Prisma DateTime fields to ISO strings for domain models.
 *
 * @param value - The value to convert (Date, string, or other)
 * @returns ISO string if value is a Date, otherwise returns the value unchanged
 */
export function toISOStringOrValue(value: Date | string | unknown): string {
  return value instanceof Date ? value.toISOString() : (value as string);
}
