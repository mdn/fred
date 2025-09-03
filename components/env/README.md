# Environment Variables

If a component or other part of Fred requires a variable set from the environment, you should define it in the [`./index.js`](./index.js) file, with a safe default value.

## Defaults

We set safe defaults for prod, unless the risk from doing - and having this set everywhere, across local dev etc. - outweighs the risk of it not being set on prod.

E.g. we don't set `GLEAN_ENABLED` to the prod default, as we don't want to send telemetry pings for prod from other environments, and we'll notice in our telemetry if it's not set in prod.

## Naming

Within Fred, variables are unprefixed, however the environment variable name is prefixed with `FRED_` to avoid conflicts with other environment variables. For example, if you define a variable `MY_VAR` in Fred, the environment variable to set would be `FRED_MY_VAR`.

## Secrets

Rspack will bundle **all** environment variables prefixed with `FRED_` into the bundle, which is exposed client side.

> [!WARNING]
> **Never set secrets** through `FRED_` environment variables.
>
> As secrets can only be used in server-side components, you should simply set them through a non-`FRED_`-prefixed environment variable, and access them using the `process.env` object.

## Build-time vs runtime

By default, variables are baked into our bundle at build time. However, you can define variables as runtime environment variables, which can be changed when running a version of Fred built with `FRED_RUNTIME_ENV=true`.

This is used in our npm package, so we can e.g. set `FRED_WRITER_MODE=true` in the `content` repo, without having to bake that into the npm package for all consumers.

Runtime environment variables fall back to their build-time values if not set, and then to the default defined in code.
