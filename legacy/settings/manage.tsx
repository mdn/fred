import React from "react";
import { FXA_MANAGE_SUBSCRIPTIONS_URL, FXA_SETTINGS_URL } from "../env";
import { Spinner } from "../spinner";
import { Switch } from "../switch";
import { useUserData } from "../shims";

async function toggleNoAds(_) {}

export function Manage() {
  const [saving, setSaving] = React.useState<boolean>(false);
  const user = useUserData();

  return (
    <section className="field-group">
      <h2>Manage Account</h2>
      <ul>
        <li>
          <section aria-labelledby="ad-free-experience">
            <h3 id="ad-free-experience">Ad-Free Experience</h3>
            <div className="setting-row">
              {user.isSubscriber ? (
                <>
                  <span>
                    Opt out of ads on MDN.{" "}
                    <a href="/en-US/advertising">Learn more</a> about MDN ads.
                  </span>
                  {saving ? (
                    <Spinner extraClasses="loading" />
                  ) : (
                    <Switch
                      name="no_ads"
                      checked={Boolean(user?.settings?.noAds)}
                      toggle={async (e) => {
                        setSaving(true);
                        const checked = Boolean(e.target.checked);
                        await toggleNoAds(checked);
                        if (user?.settings) {
                          user.settings.noAds = checked;
                        }
                        user?.mutate();
                        setSaving(false);
                      }}
                    ></Switch>
                  )}
                </>
              ) : (
                <p>
                  The ads free feature is only available to MDN Plus
                  subscribers.{" "}
                  <a href={`/en-US/plus?ref=nope_settings#subscribe`}>
                    Learn more
                  </a>{" "}
                  about our plans.
                </p>
              )}
            </div>
          </section>
        </li>

        <li>
          <section aria-labelledby="account">
            <h3 id="account">Account</h3>
            <div className="setting-row">
              <span>Manage preferences for your account</span>
              <a
                rel="noreferrer noopener"
                target="_blank"
                href={FXA_SETTINGS_URL}
                className="manage external"
              >
                Account
              </a>
            </div>
          </section>
        </li>
        {user?.isSubscriber && (
          <li>
            <section aria-labelledby="mdn-plus-subscription">
              <h3 id="mdn-plus-subscription">MDN Plus Subscription</h3>
              <div className="setting-row">
                <span>Manage your payment details for MDN Plus.</span>
                <a
                  rel="noreferrer noopener"
                  target="_blank"
                  href={FXA_MANAGE_SUBSCRIPTIONS_URL}
                  className="manage external"
                >
                  Subscriptions
                </a>
              </div>
            </section>
          </li>
        )}
      </ul>
    </section>
  );
}
