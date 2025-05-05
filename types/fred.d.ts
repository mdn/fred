namespace Fred {
  type Context<T = Rari.BuiltPage> = T &
    L10nContext & {
      pageTitle?: string;
      path: string;
    };

  type L10nContext = {
    locale: string;
    l10n: import("./fluent-2").L10nFunction;
  };

  type CompilationStats = {
    client: import("@rspack/core").StatsCompilation;
    legacy: import("@rspack/core").StatsCompilation;
  };
}
