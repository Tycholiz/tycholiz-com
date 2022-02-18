import * as Sentry from "@sentry/nextjs";

/* @ts-ignore */
const SENTRY_DSN: string =
  process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn: SENTRY_DSN || "https://3cae9c724cad439ca0a4acba33219ec8@o1143175.ingest.sentry.io/6204419",
  tunnel: '/tunnel',
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
