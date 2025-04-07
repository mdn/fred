namespace Fred {
  type Context<T = Rari.BuiltPage> = T & {
    locale: string;
    l10n: import("./fluent-2").L10nFunction;
  };
}
