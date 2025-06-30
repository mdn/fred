// @ts-expect-error "Could not find declaration file"
import Glean from "@mozilla/glean/web";

import { GLEAN_CHANNEL, GLEAN_ENABLED } from "../components/env/index.js";

const FIRST_PARTY_DATA_OPT_OUT_COOKIE_NAME = "moz-1st-party-data-opt-out";
const GLEAN_APP_ID = "mdn-fred";

const userIsOptedOut = document.cookie
  .split("; ")
  .includes(`${FIRST_PARTY_DATA_OPT_OUT_COOKIE_NAME}=true`);

const uploadEnabled = !userIsOptedOut && GLEAN_ENABLED;

Glean.initialize(GLEAN_APP_ID, uploadEnabled, {
  enableAutoPageLoadEvents: true,
  enableAutoElementClickEvents: true,
  channel: GLEAN_CHANNEL,
});
