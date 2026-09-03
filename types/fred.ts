import { BuiltPage } from "@mdn/rari";
import { L10nFunction } from "./fluent-2.js";
import { StatsCompilation } from "@rspack/core";

export type Context<T = BuiltPage> = PartialContext<T> &
  L10nContext & {
    pageTitle?: string;
    path: string;
  };

export type SandboxPage = {
  renderer: "Sandbox";
  pageTitle: string;
  url: string;
  sandbox: {
    component?: string;
  };
};

export type RenderPage = BuiltPage | SandboxPage;
export type PartialContext<T = RenderPage> = T & {
  localServer?: boolean;
};
export type RenderContext = Context<RenderPage>;
export type SandboxContext = Context<SandboxPage>;

export type L10nContext = {
  locale: string;
  l10n: L10nFunction;
};

export type CompilationStats = {
  client: StatsCompilation;
  legacy: StatsCompilation;
};
