export const OBSERVATORY_TITLE = "HTTP Observatory";
export const OBSERVATORY_TITLE_FULL = "HTTP Observatory | MDN";
export const OBSERVATORY_API_URL = "https://observatory-api.mdn.mozilla.net";

/**
 * @typedef {Object} ObservatoryAnalyzeRequest
 * @property {string} host - The host to analyze
 */

/**
 * @typedef {"ABORTED"|"FAILED"|"FINISHED"|"PENDING"|"STARTING"|"RUNNING"} ObservatoryScanState
 */

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

/**
 * @typedef {Object} ObservatoryResult
 * @property {ObservatoryScanResult} scan
 * @property {ObservatoryTestResult} tests
 * @property {ObservatoryHistoryResult[]} history
 */

/**
 * @typedef {Object} GradeDistribution
 * @property {string} grade
 * @property {number} count
 */

/**
 * @typedef {Object} ObservatoryScanResult
 * @property {number} algorithm_version
 * @property {string} scanned_at
 * @property {string|null} [error]
 * @property {string|null} [grade]
 * @property {number} id
 * @property {Object.<string, string>} [response_headers]
 * @property {number} [score]
 * @property {number} [status_code]
 * @property {number} tests_failed
 * @property {number} tests_passed
 * @property {number} tests_quantity
 */

/**
 * @typedef {Object.<string, ObservatoryIndividualTest>} ObservatoryTestResult
 */

/**
 * @typedef {Object} ObservatoryIndividualTest
 * @property {null|ObservatoryCookiesData} data
 * @property {string} expectation
 * @property {string} name
 * @property {string} title
 * @property {string} link
 * @property {boolean} pass
 * @property {string} result
 * @property {string} score_description
 * @property {string} recommendation
 * @property {number} score_modifier
 * @property {ObservatoryCSPPolicy} [policy]
 * @property {string[]} [route]
 */

/**
 * @typedef {Object} ObservatoryHistoryResult
 * @property {string} scanned_at
 * @property {string} grade
 * @property {number} id
 * @property {number} score
 */

/**
 * @typedef {Object.<string, ObservatoryIndividualCookie>} ObservatoryCookiesData
 */

/**
 * @typedef {Object} ObservatoryIndividualCookie
 * @property {string} domain
 * @property {string} expires
 * @property {boolean} httponly
 * @property {string} path
 * @property {string} samesite
 * @property {boolean} secure
 */

/**
 * @typedef {Object} ObservatoryPolicyItem
 * @property {boolean|null} pass
 * @property {string} description
 * @property {string} info
 */

/**
 * @typedef {Object} ObservatoryCSPPolicy
 * @property {ObservatoryPolicyItem} antiClickjacking
 * @property {ObservatoryPolicyItem} defaultNone
 * @property {ObservatoryPolicyItem} insecureBaseUri
 * @property {ObservatoryPolicyItem} insecureFormAction
 * @property {ObservatoryPolicyItem} insecureSchemeActive
 * @property {ObservatoryPolicyItem} insecureSchemePassive
 * @property {ObservatoryPolicyItem} strictDynamic
 * @property {ObservatoryPolicyItem} unsafeEval
 * @property {ObservatoryPolicyItem} unsafeInline
 * @property {ObservatoryPolicyItem} unsafeInlineStyle
 * @property {ObservatoryPolicyItem} unsafeObjects
 */

// Export the constants
export { SCORING_TABLE, TEST_NAMES_IN_ORDER };
