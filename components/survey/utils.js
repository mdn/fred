/**
 * @import * as Survey from "./types.js";
 */
/**
 * @param {string} key
 * @returns {Survey.SurveyState}
 */
export function getSurveyState(key) {
  const stateKey = `survey.${key}`;
  let state;

  try {
    state = JSON.parse(localStorage?.getItem(stateKey) ?? "{}");
  } catch {
    state = {};
  }

  if (Object.keys(state).length === 0) {
    state = {
      random: Math.random(),
      seen_at: null,
      dismissed_at: null,
      submitted_at: null,
      opened_at: null,
    };
    writeSurveyState(key, state);
  }

  return state;
}

/**
 * @param {string} key
 * @param {Survey.SurveyState} state
 */
export function writeSurveyState(key, state) {
  const stateKey = `survey.${key}`;
  try {
    localStorage?.setItem(stateKey, JSON.stringify(state));
  } catch {
    // Handle localStorage errors silently
  }
}
