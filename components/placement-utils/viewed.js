/**
 *
 * @param {Placements.PlacementData} placementData
 */
export function viewed(placementData) {
  if (placementData?.view) {
    const params = new URLSearchParams([
      ["code", placementData?.view],
      ...(placementData?.version
        ? [["version", placementData.version.toString()]]
        : []),
    ]);
    navigator.sendBeacon?.(`/pong/viewed?${params.toString()}`);
  }
}
