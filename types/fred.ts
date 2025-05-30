import { BuiltPage } from "@mdn/rari";
import { L10nFunction } from "./fluent-2.js";
import { StatsCompilation } from "@rspack/core";

export type Context<T = BuiltPage> = T &
  L10nContext & {
    pageTitle?: string;
    path: string;
  };

export type L10nContext = {
  locale: string;
  l10n: L10nFunction;
};

export type CompilationStats = {
  client: StatsCompilation;
  legacy: StatsCompilation;
};
