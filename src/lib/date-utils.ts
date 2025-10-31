/**
 * Date formatting utilities to prevent hydration mismatches
 *
 * These functions use consistent formatting that works the same
 * on both server and client, avoiding React hydration errors.
 */

/**
 * Format date as "Jan 1, 2024"
 */
export function formatShortDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/**
 * Format date as "1 January 2024"
 */
export function formatLongDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];

  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

/**
 * Format date as "January 1, 2024"
 */
export function formatFullDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];

  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
