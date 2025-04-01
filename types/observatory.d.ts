namespace Observatory {
  interface AnalyzeRequest {
    // The host to analyze.
    host: string;
  }

  type ScanState =
    | "ABORTED"
    | "FAILED"
    | "FINISHED"
    | "PENDING"
    | "STARTING"
    | "RUNNING";

  interface Result {
    scan: ScanResult;
    tests: TestResult;
    history: HistoryResult[];
  }

  interface GradeDistribution {
    grade: string;
    count: number;
  }

  interface ScanResult {
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

  type TestResult = Record<string, IndividualTest>;

  interface IndividualTest {
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

  interface HistoryResult {
    scanned_at: string;
    grade: string;
    id: number;
    score: number;
  }

  type CookiesData = Record<string, IndividualCookie>;

  interface IndividualCookie {
    domain: string;
    expires: string;
    httponly: boolean;
    path: string;
    samesite: string;
    secure: boolean;
  }

  interface PolicyItem {
    pass: boolean | null;
    description: string;
    info: string;
  }

  interface CSPPolicy {
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
}
