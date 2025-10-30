/**
 * Logger utility that only logs in development mode
 * In production, you can replace this with a proper logging service like Sentry
 *
 * Note: ESLint no-console is disabled for this file as it's designed to wrap console methods
 */

/* eslint-disable no-console */

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  log: (...args: unknown[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  error: (...args: unknown[]) => {
    if (isDevelopment) {
      console.error(...args);
    }
    // TODO: In production, send to error tracking service (Sentry, LogRocket, etc.)
  },
  warn: (...args: unknown[]) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },
  info: (...args: unknown[]) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
};

/* eslint-enable no-console */
