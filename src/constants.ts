export const apiUrl = process.env.NEXT_PUBLIC_API_URI;
export const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
const sampleRate = parseFloat(process.env.NEXT_PUBLIC_SENTRY_APM || "");
export const sentrySampleRate = isNaN(sampleRate) ? 0 : sampleRate;
export const serviceWorkerTimeout =
  parseInt(process.env.SERVICE_WORKER_TIMEOUT, 10) || 60 * 1000;
export const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
export const channelSlug = process.env.NEXT_PUBLIC_SALEOR_CHANNEL_SLUG;

export const builderIoApiKey = process.env.NEXT_PUBLIC_BUILDER_IO_API_KEY;

export const countryCode = process.env.NEXT_PUBLIC_COUNTRY_CODE;
export const countryName = process.env.NEXT_PUBLIC_COUNTRY_NAME;
export const promptPayID = process.env.NEXT_PUBLIC_PROMPTPAY_ID;

export const ssrMode = typeof window === "undefined";
