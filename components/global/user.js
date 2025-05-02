const DEFAULT_GEO = { country: "United States", country_iso: "US" };

/**
 * @type {User.User}
 */
const DEFAULT_USER = {
  username: null,
  isAuthenticated: false,
  avatarUrl: null,
  isSubscriber: false,
  subscriptionType: null,
  email: null,
  geo: DEFAULT_GEO,
  settings: null,
};

/**
 * @type {Promise<User.User> | undefined}
 */
let USER;

/**
 *
 * @returns {Promise<User.User>}
 */
export function globalUser() {
  if (!USER) {
    USER = fetchUserData().catch((error) => {
      console.error(error);
      return DEFAULT_USER;
    });
  }
  return USER;
}

/**
 *
 * @returns {Promise<User.User>}
 */
async function fetchUserData() {
  const response = await fetch("/api/v1/whoami");
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  try {
    /**
     * @type {User.WhoamiResponse}
     */
    const data = await response.json();
    const settings = data?.settings
      ? {
          aiHelpHistory:
            typeof data.settings?.ai_help_history === "boolean"
              ? data.settings.ai_help_history
              : null,
          noAds: data.settings?.no_ads ?? null,
        }
      : DEFAULT_USER.settings;
    return {
      username: data.username ?? DEFAULT_USER.username,
      isAuthenticated: data.is_authenticated ?? DEFAULT_USER.isAuthenticated,
      avatarUrl: data.avatar_url ?? DEFAULT_USER.avatarUrl,
      isSubscriber: data.is_subscriber ?? DEFAULT_USER.isSubscriber,
      subscriptionType:
        data.subscription_type === "core"
          ? "mdn_core"
          : (data.subscription_type ?? DEFAULT_USER.subscriptionType),
      email: data.email ?? DEFAULT_USER.email,
      geo: {
        country: (data.geo && data.geo.country) ?? DEFAULT_GEO.country,
        country_iso:
          (data.geo && data.geo.country_iso) ?? DEFAULT_GEO.country_iso,
      },
      settings,
    };
  } catch {
    throw new Error(response.statusText);
  }
}
