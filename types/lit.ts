import { UnsafeHTMLDirective } from "lit-html/directives/unsafe-html.js";
import { DirectiveResult } from "lit/directive.js";

export * from "lit";
export * from "lit/directives/ref.js";

export type L10nResult = DirectiveResult<typeof UnsafeHTMLDirective>;
