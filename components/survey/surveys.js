// import { html } from "lit";

/**
 * @import * as Survey from "./types.js";
 */
/**
 * Survey bucket identifiers used for localStorage state management.
 * Each bucket represents a unique survey campaign and maintains separate state.
 * @readonly
 * @enum {string}
 */
export const SurveyBucket = Object.freeze({
  BLOG_FEEDBACK_2023: "BLOG_FEEDBACK_2023",
  BROWSER_SURVEY_OCT_2022: "BROWSER_SURVEY_OCT_2022",
  CONTENT_DISCOVERY_2023: "CONTENT_DISCOVERY_2023",
  CSS_CASCADE_2022: "CSS_CASCADE_2022",
  DE_LOCALE_2024: "DE_LOCALE_2024",
  DE_LOCALE_2024_EVAL: "DE_LOCALE_2024_EVAL",
  FIREFOX_WEB_COMPAT_2023: "FIREFOX_WEB_COMPAT_2023",
  INTEROP_2023: "INTEROP_2023",
  IT_LOCALE_2025: "IT_LOCALE_2025",
  WEB_COMPONENTS_2023: "WEB_COMPONENTS_2023",
  DISCOVERABILITY_2023: "DISCOVERABILITY_2023",
  WEB_SECURITY_2023: "WEB_SECURITY_2023",
  DISCOVERABILITY_AUG_2023: "DISCOVERABILITY_AUG_2023",
  WEB_APP_AUGUST_2024: "WEB_APP_AUGUST_2024",
  HOMEPAGE_FEEDBACK_2024: "HOMEPAGE_FEEDBACK_2024",
  WEBDX_EDITING_2024: "WEBDX_EDITING_2024",
  HOUSE_SURVEY_2025: "HOUSE_SURVEY_2025",
  JS_PROPOSALS_2025: "JS_PROPOSALS_2025",
  FIRST_FRED_2025: "FIRST_FRED_2025",
  DEVELOPER_SURVEY_2025: "DEVELOPER_SURVEY_2025",
  BASELINE_A11Y_2026: "BASELINE_A11Y_2026",
});

/**
 * Array of survey configurations.
 *
 * When adding a survey, make sure it has this JavaScript action (in Alchemer)
 * so the banner is hidden for users who have already submitted it:
 * ```javascript
 * window.parent && window.parent.postMessage("submit", "*");
 * ```
 *
 * @type {Survey.Survey[]}
 */
export const SURVEYS = [
  {
    key: SurveyBucket.BASELINE_A11Y_2026,
    bucket: SurveyBucket.BASELINE_A11Y_2026,
    show: (mdn_url) => {
      return /^\/en-US\/docs\/Web/.test(mdn_url);
    },
    src: (mdn_url) => {
      const url = new URL(
        "https://survey.alchemer.com/s3/8804357/MDN-Short-Survey-Dev-Perception-of-Baseline-Widely-Available-re-Accessibility",
      );
      url.searchParams.set("referrer", mdn_url);
      return url.toString();
    },
    teaser:
      "Help us improve how we communicate browser compatibility by answering this question about your understanding of Baseline.",
    question: "TBD",
    link: true,
    rateFrom: 0,
    rateTill: 0.05,
    start: Date.parse("2026-05-04"),
    end: Date.parse("2026-05-11"),
  },
];
