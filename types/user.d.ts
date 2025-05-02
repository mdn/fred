namespace User {
  type SubscriptionType =
    | "mdn_core"
    | "mdn_plus_5m"
    | "mdn_plus_5y"
    | "mdn_plus_10m"
    | "mdn_plus_10y";

  type UserPlusSettings = {
    aiHelpHistory: boolean | null;
    noAds: boolean | null;
  };

  type User = {
    username: string | null | undefined;
    isAuthenticated: boolean;
    avatarUrl: string | null | undefined;
    isSubscriber: boolean;
    subscriptionType: SubscriptionType | null;
    email: string | null | undefined;
    geo: GeoInfo;
    maintenance?: string;
    settings: null | UserPlusSettings;
  };

  type GeoInfo = {
    country: string;
    country_iso: string;
  };

  type WhoamiResponse = {
    geo: GeoInfo | null;
    // #[deprecated(note="Confusing name. We should consider just changing to user_id")]
    username: string | null;
    is_authenticated: boolean | null;
    email: string | null;
    avatar_url: string | null;
    is_subscriber: boolean | null;
    subscription_type: SubscriptionTypeResponse | null;
    settings: SettingsResponse | null;
    maintenance?: string;
  };

  type SubscriptionTypeResponse =
    | "core"
    | "mdn_plus_5m"
    | "mdn_plus_5y"
    | "mdn_plus_10m"
    | "mdn_plus_10y";

  type SettingsResponse = {
    no_ads: boolean | null;
    ai_help_history: boolean | null;
  };
}
