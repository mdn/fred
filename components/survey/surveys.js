import { html } from "lit";

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
    key: "something unique in the current surveys",
    bucket: SurveyBucket.FIRST_FRED_2025,
    show: (mdn_url) => {
      return /^\/[a-z]{2}(-[A-Z]{2})?\/docs\/Web\/CSS/.test(mdn_url);
    },
    src: (mdn_url) => {
      const url = new URL(
        "https://survey.alchemer.com/s3/8385674/MDN-short-survey-Fred",
      );
      url.searchParams.set("referrer", mdn_url);
      return url.toString();
    },
    teaser: html`Fred is <strong>MDN</strong>'s shiny new frontend!`,
    question: "How satisfied are you with this new MDN frontend?",
    footnote: "fred = fr(ont)e(n)d",
    rateFrom: 0,
    rateTill: 1,
    start: 0,
    end: Infinity,
  },
];
