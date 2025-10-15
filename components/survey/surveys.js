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
    key: SurveyBucket.DEVELOPER_SURVEY_2025,
    bucket: SurveyBucket.DEVELOPER_SURVEY_2025,
    show: (mdn_url) => {
      return /^\/[a-z]{2}(-[A-Z]{2})?\/docs\/(Glossary|Learn|Web)/.test(
        mdn_url,
      );
    },
    src: (mdn_url) => {
      const url = new URL(
        "https://survey.alchemer.com/s3/8409929/MDN-Developer-Survey",
      );
      url.searchParams.set("referrer", mdn_url);
      return url.toString();
    },
    teaser:
      "We’re running a survey to understand how you use MDN in your web development work.",
    question: "We’d love for you to take 10 minutes to share your feedback.",
    link: true,
    rateFrom: 0,
    rateTill: 0.3,
    start: Date.parse("2025-10-06"),
    end: Date.parse("2025-10-20"),
  },
];
