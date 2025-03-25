// @ts-nocheck

export function asList(a) {
  return Array.isArray(a) ? a : [a];
}

export function getFirst(a) {
  return Array.isArray(a) ? a[0] : a;
}

function hasLimitation(support) {
  return hasMajorLimitation(support) || support.notes || support.impl_url;
}

function hasMajorLimitation(support) {
  return (
    support.partial_implementation ||
    support.alternative_name ||
    support.flags ||
    support.prefix ||
    support.version_removed
  );
}
export function isFullySupportedWithoutLimitation(support) {
  return support.version_added && !hasLimitation(support);
}

function isFullySupportedWithoutMajorLimitation(support) {
  return support.version_added && !hasMajorLimitation(support);
}

export const SUPPORT = {
  full: "full",
  minorLimitation: "minorLitation",
  altnamePrefix: "altnamePrefix",
  partial: "partial",
  flag: "flat",
  no: "no",
  unknown: "unknown",
};

// Prioritizes support items
export function getCurrentSupport(support) {
  if (!support) return undefined;

  // Full support without limitation
  const noLimitationSupportItem = asList(support).find((item) =>
    isFullySupportedWithoutLimitation(item),
  );
  if (noLimitationSupportItem)
    return { support: SUPPORT.full, ...noLimitationSupportItem };

  // Full support with only notes and version_added
  const minorLimitationSupportItem = asList(support).find((item) =>
    isFullySupportedWithoutMajorLimitation(item),
  );
  if (minorLimitationSupportItem)
    return { support: SUPPORT.minorLimitation, ...minorLimitationSupportItem };

  // Full support with altname/prefix
  const altnamePrefixSupportItem = asList(support).find(
    (item) => !item.version_removed && (item.prefix || item.alternative_name),
  );
  if (altnamePrefixSupportItem)
    return { support: SUPPORT.altnamePrefix, ...altnamePrefixSupportItem };

  // Partial support
  const partialSupportItem = asList(support).find(
    (item) => !item.version_removed && item.partial_implementation,
  );
  if (partialSupportItem)
    return { support: SUPPORT.partial, ...partialSupportItem };

  // Support with flags only
  const flagSupportItem = asList(support).find(
    (item) => !item.version_removed && item.flags,
  );
  if (flagSupportItem) return { support: SUPPORT.flag, ...flagSupportItem };

  // No/Inactive support
  const noSupportItem = asList(support).find((item) => item.version_removed);
  if (noSupportItem) return { support: SUPPORT.no, ...noSupportItem };

  // Default (likely never reached)
  return { support: SUPPORT.unknown, ...getFirst(support) };
}
