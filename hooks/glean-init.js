// @ts-expect-error "Could not find declaration file"
import Glean from "@mozilla/glean/web";

import {
  GLEAN_CHANNEL,
  GLEAN_DEBUG,
  GLEAN_ENABLED,
} from "../components/env/index.js";
import { gleanClick } from "../utils/glean.js";

const FIRST_PARTY_DATA_OPT_OUT_COOKIE_NAME = "moz-1st-party-data-opt-out";
const GLEAN_APP_ID = "mdn-fred";

const userIsOptedOut = document.cookie
  .split("; ")
  .includes(`${FIRST_PARTY_DATA_OPT_OUT_COOKIE_NAME}=true`);

const uploadEnabled = !userIsOptedOut && GLEAN_ENABLED;

if (GLEAN_DEBUG) {
  Glean.setDebugViewTag("mdn-dev");
  Glean.setLogPings(true);
}

Glean.initialize(GLEAN_APP_ID, uploadEnabled, {
  enableAutoPageLoadEvents: true,
  enableAutoElementClickEvents: true,
  channel: GLEAN_CHANNEL,
});

document.addEventListener("click", (event) => {
  const composedTarget = event.composedPath()?.[0];
  if (composedTarget !== event.target && composedTarget instanceof Element) {
    const taggedElement = composedTarget.closest("[data-glean-id]");
    if (taggedElement instanceof HTMLElement) {
      const gleanId = taggedElement.dataset.gleanId;
      if (gleanId) {
        gleanClick(gleanId);
      }
    }
  }
});
