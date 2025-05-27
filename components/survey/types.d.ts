import { TemplateResult } from "lit";

export interface Survey {
  /** Unique identifier for the survey */
  key: string;
  /** Storage bucket name for tracking survey state */
  bucket: string;
  /** Function that determines if the survey should be displayed for a given document */
  show: (mdn_url: string) => boolean;
  /** Survey start time in milliseconds since epoch */
  start: number;
  /** Survey end time in milliseconds since epoch */
  end: number;
  /** Minimum random value (0-1) for user sampling */
  rateFrom: number;
  /** Maximum random value (0-1) for user sampling */
  rateTill: number;
  /** Survey URL (static string or function that generates URL based on document) */
  src: string | ((mdn_url: string) => string);
  /** Brief HTML shown in the survey header */
  teaser: TemplateResault | string;
  /** HTML in the clickable summary element */
  question: TemplateResult | string;
  /** Optional footer HTML displayed below the survey */
  footnote?: TemplateResult | string;
}

export interface SurveyState {
  /** Random number (0-1) assigned to user for sampling decisions */
  random: number;
  /** Timestamp when the user first saw the survey */
  seen_at: number | null;
  /** Timestamp when the user manually dismissed the survey */
  dismissed_at: number | null;
  /** Timestamp when the user submitted the survey */
  submitted_at: number | null;
  /** Timestamp when the user first opened/expanded the survey details */
  opened_at: number | null;
}
