/**
 * @import * as Placements from "../placement/types.js";
 */

/**
 * @type {Placements.PlacementMap}
 */
const PLACEMENT_MAP = {
  side: {
    typ: "side",
    renderer:
      /Doc|BlogPost|CurriculumDefault|GenericDoc|SpaSearch|SpaNotFound|SpaPlay|SpaObservatoryAnalyze/gi,
    pattern:
      /^\/[^/]+\/(play|docs\/|blog\/|observatory\/?|curriculum\/[^$]|search$)/i,
  },
  top: {
    typ: "top-banner",
    renderer: /^(?!Homepage$).+/gi,
    pattern: /^\/[^/]+\/(?!$|_homepage$).*/i,
  },
  hpTop: {
    typ: "top-banner",
    renderer: /Homepag/gi,
    pattern: /^\/[^/]+\/($|_homepage$)/i,
  },
  hpMain: {
    typ: "hp-main",
    renderer: /Homepage/gi,
    pattern: /^\/[^/]+\/($|_homepage$)/i,
  },
  hpFooter: {
    typ: "hp-footer",
    renderer: /Homepage/gi,
    pattern: /^\/[^/]+\/($|_homepage$)/i,
  },
  bottom: {
    typ: "bottom-banner",
    renderer: /^(?!Homepage$).+/gi,
    pattern: /^\/[^/]+\/docs\//i,
  },
};

/**
 *
 * @param {string} renderer
 * @returns {string[]}
 */
function placementTypes(renderer) {
  return (
    Object.entries(PLACEMENT_MAP)
      .map(([k, { renderer: re }]) => (re.test(renderer) ? k : null))
      .filter((k) => k !== null) || []
  );
}
/**
 * @type {Promise<Placements.PlacementContextData> | undefined}
 */
let PLACEMENT_CONTEXT;

/**
 *
 * @returns {Promise<Placements.PlacementContextData>}
 */
export function globalPlacementContext() {
  if (!PLACEMENT_CONTEXT) {
    PLACEMENT_CONTEXT = fetchPlacementData();
  }
  return PLACEMENT_CONTEXT;
}
/**
 * @returns {Promise<Placements.PlacementContextData>}
 */
async function fetchPlacementData() {
  const response = await fetch("/pong/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      keywords: [],
      pongs: placementTypes(
        globalThis.document.documentElement.dataset.renderer || "Unknown",
      ),
    }),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  try {
    const placementResponse = await response.json();
    return placementResponse;
  } catch {
    throw new Error(response.statusText);
  }
}
