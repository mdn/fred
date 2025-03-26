namespace Fred {
  type Context<T = Rari.BuiltPage> = T & {
    l10n?: import("./fluent.js").Fluent;
  };
}
