export interface AnalyzeRequest {
  // The host to analyze.
  host: string;
}

export type ScanState =
  | "ABORTED"
  | "FAILED"
  | "FINISHED"
  | "PENDING"
  | "STARTING"
  | "RUNNING";

export interface Result {
  scan: ScanResult;
  tests: TestResult;
  history: HistoryResult[];
}

export interface GradeDistribution {
  grade: string;
  count: number;
}

export interface ScanResult {
  algorithm_version: number;
  scanned_at: string;
  error?: string | null;
  grade?: string | null;
  id: number;
  response_headers?: Record<string, string>;
  score?: number;
  status_code?: number;
  tests_failed: number;
  tests_passed: number;
  tests_quantity: number;
}

export type TestResult = Record<string, IndividualTest>;

export interface IndividualTest {
  data: CookiesData | null;
  expectation: string;
  name: string;
  title: string;
  link: string;
  pass: boolean;
  result: string;
  score_description: string;
  recommendation: string;
  score_modifier: number;
  policy?: CSPPolicy;
  route?: string[];
}

export interface HistoryResult {
  scanned_at: string;
  grade: string;
  id: number;
  score: number;
}

export type CookiesData = Record<string, IndividualCookie>;

export interface IndividualCookie {
  domain: string;
  expires: string;
  httponly: boolean;
  path: string;
  samesite: string;
  secure: boolean;
}

export interface PolicyItem {
  pass: boolean | null;
  description: string;
  info: string;
}

export interface CSPPolicy {
  antiClickjacking: PolicyItem;
  defaultNone: PolicyItem;
  insecureBaseUri: PolicyItem;
  insecureFormAction: PolicyItem;
  insecureSchemeActive: PolicyItem;
  insecureSchemePassive: PolicyItem;
  strictDynamic: PolicyItem;
  unsafeEval: PolicyItem;
  unsafeInline: PolicyItem;
  unsafeInlineStyle: PolicyItem;
  unsafeObjects: PolicyItem;
}
