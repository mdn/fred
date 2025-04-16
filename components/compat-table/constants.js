// [libs/constants]
export const DEFAULT_LOCALE = "en-US";

// [client/env]
export const BCD_BASE_URL = "https://bcd.developer.mozilla.org";

// [client/telemetry]
export const BCD_TABLE = "bcd";

export const ISSUE_METADATA_TEMPLATE = `
<!-- Do not make changes below this line -->
<details>
<summary>MDN page report details</summary>

* Query: \`$QUERY_ID\`
* Report started: $DATE

</details>
`;
