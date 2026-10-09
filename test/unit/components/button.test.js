import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import { describe, it } from "node:test";

import { render } from "@lit-labs/ssr";
import { html } from "lit";

import Button from "../../../components/button/pure.js";

const hooks = registerHooks({
  load(url, context, nextLoad) {
    if (url.endsWith("/components/button/element.css?lit")) {
      return {
        format: "module",
        source: "export default undefined;",
        shortCircuit: true,
      };
    }
    return nextLoad(url, context);
  },
});
await import("../../../components/button/element.js");
hooks.deregister();

/** @param {Parameters<typeof Button>[0][]} buttons */
function renderButtons(buttons) {
  return [...render(html`${buttons.map((options) => Button(options))}`)].join(
    "",
  );
}

describe("Button labels", () => {
  for (const { name, href } of [
    { name: "buttons", href: undefined },
    { name: "links", href: "/docs/" },
  ]) {
    for (const iconOnly of [false, true]) {
      it(`renders repeated string labels deterministically for ${name}, iconOnly=${iconOnly}`, () => {
        const buttons = Array.from({ length: 2 }, () => ({
          label: "Read more",
          href,
          iconOnly,
        }));
        const output = renderButtons(buttons);
        assert.equal(output, renderButtons(buttons));
        assert.doesNotMatch(output, /\sid=|aria-labelledby=/);
        assert.equal(output.match(/aria-label="Read more"/g)?.length, 2);
      });

      it(`keeps distinct template labels associated with their ${name}, iconOnly=${iconOnly}`, () => {
        const output = renderButtons([
          { label: html`First`, href, iconOnly },
          { label: html`Second`, href, iconOnly },
        ]);
        const ids = [...output.matchAll(/\sid="([^"]+)"/g)].map(
          (match) => match[1],
        );
        const references = [
          ...output.matchAll(/aria-labelledby="([^"]+)"/g),
        ].map((match) => match[1]);
        assert.equal(ids.length, 2);
        assert.equal(new Set(ids).size, 2);
        assert.deepEqual(references, ids);
        assert.doesNotMatch(output, /aria-label=/);
        assert.match(output, /First/);
        assert.match(output, /Second/);
      });

      it(`preserves deterministic slotted labels for shadow-root ${name}, iconOnly=${iconOnly}`, () => {
        const template = html`<mdn-button
            href=${href ?? ""}
            ?icon-only=${iconOnly}
            >First</mdn-button
          ><mdn-button href=${href ?? ""} ?icon-only=${iconOnly}
            >Second</mdn-button
          >`;
        const output = [...render(template)].join("");
        assert.equal(output, [...render(template)].join(""));
        assert.equal(output.match(/shadowrootmode="open"/g)?.length, 2);
        assert.equal(output.match(/id="label"/g)?.length, 2);
        assert.equal(output.match(/aria-labelledby="label"/g)?.length, 2);
        assert.match(output, /<slot><\/slot>/);
        assert.doesNotMatch(output, /aria-label=/);
      });
    }
  }
});
