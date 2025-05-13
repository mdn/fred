namespace Lit {
  export type L10nResult = import("lit-html/directive.js").DirectiveResult<
    typeof UnsafeHTMLDirective
  >;
  export type PropertyDeclarations = import("lit").PropertyDeclarations;
  export type TemplateResult = import("lit").TemplateResult;
  export type Ref<T> = import("lit/directives/ref.js").Ref<T>;
  export type nothing = import("lit").nothing;
}
