import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init(): void {
  Sentry.init({
    dsn: "https://8c4360d258bf452c8f1908d87228fd3a@o1130463.ingest.sentry.io/6174518",
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    release: "1.0.0",
    environment: "development",
  });
}

function log(error: any): void {
  Sentry.captureException(error);
}

export default { init, log };
