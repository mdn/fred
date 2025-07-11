import { Task } from "@lit/task";
import { LitElement, html, nothing } from "lit";
import { createRef, ref } from "lit/directives/ref.js";

import { L10nMixin } from "../../l10n/mixin.js";
import { gleanClick } from "../../utils/glean.js";
import { globalUser } from "../user/context.js";

import styles from "./element.css?lit";
import { decompressFromBase64 } from "./utils.js";

import "../play-controller/element.js";
import "../button/element.js";
import "../play-editor/element.js";
import "../play-runner/element.js";
import "../play-console/element.js";
import "../modal/element.js";
import "../login-button/element.js";
import "../placement-sidebar/element.js";

/**
 * @import { MDNPlayController } from "../play-controller/element.js";
 * @import { Ref } from "lit/directives/ref.js";
 */

const SESSION_KEY = "playground-session-code";

export class MDNPlayground extends L10nMixin(LitElement) {
  static styles = styles;

  constructor() {
    super();
    this._permalink = "";
    this._autoRun = true;
  }

  /** @type {Ref<MDNPlayController>} */
  _controller = createRef();

  _user = new Task(this, {
    task: async () => {
      return await globalUser();
    },
  });

  _format() {
    this._controller.value?.format();
  }

  _run() {
    const controller = this._controller.value;
    if (controller) {
      controller.run();
      if (!this._autoRun) {
        this._autoRun = true;
        controller.runOnChange = true;
        this._storeSession();
      }
    }
  }

  _share() {
    this.shadowRoot?.querySelector("mdn-modal")?.showModal();
  }

  _clear() {
    const controller = this._controller.value;
    if (
      confirm(this.l10n`Do you really want to clear everything?`) &&
      controller
    ) {
      controller.clear();
      this._storeSession();
      this.requestUpdate();
      const urlWithoutSearch = new URL(location.href);
      urlWithoutSearch.search = "";
      history.replaceState(undefined, "", urlWithoutSearch);
    }
  }

  _reset() {
    const controller = this._controller.value;
    if (
      confirm(this.l10n`Do you really want to revert your changes?`) &&
      controller
    ) {
      controller.reset();
      this._storeSession();
      this.requestUpdate();
    }
  }

  async _copyMarkdown() {
    const controller = this._controller.value;
    if (controller) {
      const markdown = Object.entries(controller.code)
        .map(
          ([lang, code]) =>
            code &&
            `${"```"}${lang}
${code}
${"```"}`,
        )
        .filter(Boolean)
        .join("\n\n");
      await navigator.clipboard.writeText(markdown);
    }
  }

  async _createPermalink() {
    const controller = this._controller.value;
    if (controller) {
      const res = await fetch("/api/v1/play/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(controller.code),
      });
      const { id } = await res.json();
      const permalink = new URL(location.href);
      permalink.search = new URLSearchParams({ id }).toString();

      controller.initialCode = controller.code;
      this._permalink = permalink.toString();
      history.replaceState(undefined, "", permalink);
      this.requestUpdate();
    }
  }

  async _copyPermalink() {
    if (this._permalink) {
      await navigator.clipboard.writeText(this._permalink);
    }
  }

  _storeSession() {
    const controller = this._controller.value;
    if (controller) {
      const { srcPrefix, initialCode, code } = controller;
      /** @type {import("./types.js").PlaygroundSession} */
      const session = {
        srcPrefix,
        initialCode,
        code,
        autoRun: this._autoRun,
      };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
  }

  _loadSession() {
    const { srcPrefix, initialCode, code, autoRun } = stateToSession(
      JSON.parse(sessionStorage.getItem(SESSION_KEY) || "{}"),
    );
    const controller = this._controller.value;
    if (controller) {
      if (autoRun === false) {
        this._autoRun = false;
        controller.runOnStart = false;
        controller.runOnChange = false;
      }
      controller.srcPrefix = srcPrefix;
      controller.initialCode = initialCode;
      controller.code = code;
      this.requestUpdate();
    }
  }

  async _loadFromUrl() {
    const controller = this._controller.value;
    if (controller) {
      const params = new URLSearchParams(location.search);
      const idParam = params.get("id");
      const stateParam = params.get("state");

      const { srcPrefix, code } =
        (await (idParam
          ? this._sessionFromApi(idParam)
          : stateParam
            ? this._sessionFromState(stateParam)
            : undefined)) || {};

      if (
        srcPrefix !== undefined &&
        code !== undefined &&
        (controller.srcPrefix !== srcPrefix ||
          !compareCode(controller.initialCode, code))
      ) {
        if (
          !opener?.location?.origin ||
          opener?.location?.origin !== location.origin
        ) {
          this._autoRun = false;
          controller.runOnStart = false;
          controller.runOnChange = false;
        }
        controller.srcPrefix = srcPrefix;
        controller.initialCode = code;
        controller.code = code;
        this._storeSession();
      }

      this.requestUpdate();
    }
  }

  /** @param {string} id */
  async _sessionFromApi(id) {
    const response = await fetch(`/api/v1/play/${encodeURIComponent(id)}`);
    if (!response.ok) {
      console.error(response.statusText);
      return;
    }

    const permalink = new URL(location.href);
    permalink.search = new URLSearchParams({ id }).toString();
    this._permalink = permalink.toString();

    gleanClick("playground", { type: "load-shared" });
    const code = await response.json();
    return stateToSession(code);
  }

  /** @param {string} stateParam */
  async _sessionFromState(stateParam) {
    const { state } = await decompressFromBase64(stateParam);
    return stateToSession(JSON.parse(state || "{}"));
  }

  _editorUpdate() {
    this._storeSession();
    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
    this._user.run();
  }

  render() {
    const { code, initialCode } = this._controller.value ?? {};
    const hasCode = Object.values(code ?? {}).some(Boolean);
    const hasInitialCode = Object.values(initialCode ?? {}).some(Boolean);
    const isResettable = hasInitialCode && !compareCode(code, initialCode);

    return html`
      <div class="wrapper">
        <mdn-play-controller
          ${ref(this._controller)}
          run-on-start
          run-on-change
        >
          <section>
            <aside>
              <h1>${this.l10n`Playground`}</h1>
              <menu>
                <mdn-button
                  variant="secondary"
                  @click=${this._format}
                  ?disabled=${!hasCode}
                  >${this.l10n`Format`}</mdn-button
                >
                <mdn-button
                  variant="secondary"
                  @click=${this._run}
                  ?disabled=${!hasCode}
                  >${this.l10n`Run`}</mdn-button
                >
                <mdn-button
                  variant="secondary"
                  @click=${this._share}
                  ?disabled=${!hasCode}
                  >${this.l10n`Share`}</mdn-button
                >
                <mdn-button
                  variant="secondary"
                  @click=${this._clear}
                  ?disabled=${!(hasCode || isResettable)}
                  >${this.l10n`Clear`}</mdn-button
                >
                ${hasInitialCode
                  ? html`<mdn-button
                      variant="secondary"
                      @click=${this._reset}
                      ?disabled=${!isResettable}
                      >${this.l10n`Reset`}</mdn-button
                    >`
                  : nothing}
              </menu>
            </aside>
            <details open>
              <summary>HTML</summary>
              <mdn-play-editor
                language="html"
                @update=${this._editorUpdate}
              ></mdn-play-editor>
            </details>
            <details open>
              <summary>CSS</summary>
              <mdn-play-editor
                language="css"
                @update=${this._editorUpdate}
              ></mdn-play-editor>
            </details>
            <details open>
              <summary>JAVASCRIPT</summary>
              <mdn-play-editor
                language="js"
                @update=${this._editorUpdate}
              ></mdn-play-editor>
            </details>
          </section>
          <section class="playground__runner-console">
            <mdn-play-runner></mdn-play-runner>
            <div class="playground__console">
              <div>${this.l10n`Console`}</div>
              <mdn-play-console></mdn-play-console>
            </div>
          </section>
          <mdn-placement-sidebar horizontal></mdn-placement-sidebar>
        </mdn-play-controller>
      </div>
      <mdn-modal>
        <section>
          <h2>${this.l10n`Share Markdown`}</h2>
          <mdn-button variant="secondary" @click=${this._copyMarkdown}
            >${this.l10n`Copy markdown to clipboard`}</mdn-button
          >
        </section>
        <section>
          <h2>${this.l10n`Share your code via Permalink`}</h2>
          ${this._user.render({
            initial: () => html`<mdn-login-button></mdn-login-button>`,
            pending: () => html`<mdn-login-button></mdn-login-button>`,
            complete: (user) =>
              user.isAuthenticated
                ? this._permalink && !isResettable
                  ? html`
                      <input .value=${this._permalink} />
                      <mdn-button
                        variant="secondary"
                        @click=${this._copyPermalink}
                        >${this.l10n`Copy to clipboard`}</mdn-button
                      >
                    `
                  : html`<mdn-button @click=${this._createPermalink}
                      >${this.l10n`Create link`}</mdn-button
                    >`
                : html`<mdn-login-button></mdn-login-button>`,
          })}
        </section>
      </mdn-modal>
    `;
  }

  firstUpdated() {
    this._loadSession();
    this._loadFromUrl();
  }
}

customElements.define("mdn-playground", MDNPlayground);

/**
 * @param {import("./types.js").PlaygroundStateParam | import("./types.js").PlaygroundSession | {}} stateOrSession
 * @returns {import("./types.js").PlaygroundSession}
 */
function stateToSession(stateOrSession) {
  if ("html" in stateOrSession) {
    return {
      srcPrefix: stateOrSession.src || "",
      code: {
        html: stateOrSession.html,
        css: stateOrSession.css,
        js: stateOrSession.js,
      },
    };
  }
  if ("srcPrefix" in stateOrSession) {
    return stateOrSession;
  }
  return {
    srcPrefix: "",
    code: {},
  };
}

/**
 * @param {Record<string, string>} [a]
 * @param {Record<string, string>} [b]
 * @returns {boolean}
 */
function compareCode(a, b) {
  return a === undefined || b === undefined
    ? a === b
    : Object.keys(a).length === Object.keys(b).length &&
        Object.entries(a).every(([k, v]) => b[k] === v);
}
