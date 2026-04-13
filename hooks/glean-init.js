import Glean from "@mozilla/glean/web";

import {
  GLEAN_CHANNEL,
  GLEAN_DEBUG,
  GLEAN_ENABLED,
} from "../components/env/index.js";
import { gleanClick } from "../utils/glean.js";
import { userIsOptedOut } from "../utils/telemetry-opt-out.js";

const GLEAN_APP_ID = "mdn-fred";

const uploadEnabled = !userIsOptedOut() && GLEAN_ENABLED;

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
    // Workaround for automatic click events in shadow DOM.
    // See: https://bugzil.la/1988206
    const taggedElement = composedTarget.closest("[data-glean-id]");
    if (taggedElement instanceof HTMLElement) {
      const gleanId = taggedElement.dataset.gleanId;
      if (gleanId) {
        gleanClick(gleanId);
      }
    }
  }

  const target = composedTarget ?? event.target;
  if (target instanceof Element) {
    // External link measurement.
    const anchor = target.closest("a");
    if (
      anchor instanceof HTMLAnchorElement &&
      anchor.href &&
      anchor.origin &&
      anchor.origin !== document.location.origin
    ) {
      gleanClick(`external-link: ${anchor.href}`);
    }
  }
});
