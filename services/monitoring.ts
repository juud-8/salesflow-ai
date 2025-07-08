import * as Sentry from '@sentry/node';

export function initMonitoring() {
  if (process.env.SENTRY_DSN) {
    Sentry.init({ dsn: process.env.SENTRY_DSN });
  }
}

export function captureError(error: unknown) {
  Sentry.captureException(error);
}
