/**
 * @type {Placements.PlacementMap}
 */
const PLACEMENT_MAP = {
  side: {
    typ: "side",
    pattern:
      /^\/[^/]+\/(play|docs\/|blog\/|observatory\/?|curriculum\/[^$]|search$)/i,
  },
  top: {
    typ: "top-banner",
    pattern: /^\/[^/]+\/(?!$|_homepage$).*/i,
  },
  hpTop: {
    typ: "top-banner",
    pattern: /^\/[^/]+\/($|_homepage$)/i,
  },
  hpMain: {
    typ: "hp-main",
    pattern: /^\/[^/]+\/($|_homepage$)/i,
  },
  hpFooter: {
    typ: "hp-footer",
    pattern: /^\/[^/]+\/($|_homepage$)/i,
  },
  bottom: {
    typ: "bottom-banner",
    pattern: /^\/[^/]+\/docs\//i,
  },
};

/**
 *
 * @param {string} pathname
 * @returns {string[]}
 */
function placementTypes(pathname) {
  return (
    Object.entries(PLACEMENT_MAP)
      .map(([k, { pattern: re }]) => (re.test(pathname) ? k : null))
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
      pongs: placementTypes(globalThis.location.pathname),
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
