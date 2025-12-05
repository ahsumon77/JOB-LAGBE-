// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://c108424e44c86eef2ef84d9e70b5764e@o4510367913738240.ingest.us.sentry.io/4510367920291840",

  integrations: [
    nodeProfilingIntegration(),  // ✔ enable performance + profiling
    Sentry.mongooseIntegration()
  ],

  // Optional: enable if you want Sentry to collect IP + other PII
  sendDefaultPii: true,
});
