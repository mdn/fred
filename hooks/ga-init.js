/**
 * Google Analytics, enabled if:
 * 1. FRED_GA_ENABLED and FRED_GA_MEASUREMENT_ID are set
 * 2. User has not opted out via moz-1st-party-data-opt-out cookie
 * 3. User has not enabled Do Not Track (DNT)
 */

import { GA_ENABLED, GA_MEASUREMENT_ID } from "../components/env/index.js";
import { dntEnabled } from "../utils/dnt-helper.js";
import { userIsOptedOut } from "../utils/telemetry-opt-out.js";

if (GA_ENABLED && GA_MEASUREMENT_ID && !userIsOptedOut() && !dntEnabled()) {
  const gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.append(gaScript);

  globalThis.dataLayer = globalThis.dataLayer || [];

  function gtag() {
    globalThis.dataLayer.push(arguments);
  }

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
  });
}
