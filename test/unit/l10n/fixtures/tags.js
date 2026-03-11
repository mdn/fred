/* eslint-disable @typescript-eslint/ban-ts-comment, no-undef */
// @ts-nocheck

this.l10n("this-l10n")`This L10n`;
this.l10n.raw({ id: "this-l10n-raw" });

context.l10n("context-l10n")`Context L10n`;
context.l10n.raw({ id: "context-l10n-raw" });

html`Another tag`;
foo("bar")`And another`;
