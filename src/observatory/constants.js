export const OBSERVATORY_TITLE = "HTTP Observatory";
export const OBSERVATORY_TITLE_FULL = "HTTP Observatory | MDN";
export const OBSERVATORY_API_URL = "https://observatory-api.mdn.mozilla.net";

/**
 * Scoring table for Observatory grades
 * @type {Array<{grade: string, scoreText: string, score: number, stars?: boolean}>}
 */
const SCORING_TABLE = [
  { grade: "A+", scoreText: "100+", score: 100, stars: true },
  { grade: "A", scoreText: "90", score: 90, stars: true },
  { grade: "A-", scoreText: "85", score: 85, stars: true },
  { grade: "B+", scoreText: "80", score: 80 },
  { grade: "B", scoreText: "70", score: 70 },
  { grade: "B-", scoreText: "65", score: 65 },
  { grade: "C+", scoreText: "60", score: 60 },
  { grade: "C", scoreText: "50", score: 50 },
  { grade: "C-", scoreText: "45", score: 45 },
  { grade: "D+", scoreText: "40", score: 40 },
  { grade: "D", scoreText: "30", score: 30 },
  { grade: "D-", scoreText: "25", score: 25 },
  { grade: "F", scoreText: "0", score: 0 },
];

/**
 * Maintain consistent test order.
 * @type {string[]}
 */
const TEST_NAMES_IN_ORDER = [
  "content-security-policy",
  "cookies",
  "cross-origin-resource-sharing",
  "redirection",
  "referrer-policy",
  "strict-transport-security",
  "subresource-integrity",
  "x-content-type-options",
  "x-frame-options",
  "cross-origin-resource-policy",
];

// Export the constants
export { SCORING_TABLE, TEST_NAMES_IN_ORDER };
