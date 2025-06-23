import { html, nothing } from "lit";

import { ServerComponent } from "../server/index.js";

export class TranslationBanner extends ServerComponent {
  /**
   * Renders the body of the banner.
   *
   * @param {string} locale
   */
  _renderBody(locale) {
    switch (locale) {
      case "de":
        return html`Dieser Inhalt wurde automatisch aus dem Englischen
          übersetzt, und kann Fehler enthalten.
          <a href="https://github.com/orgs/mdn/discussions/741"
            >Erfahre mehr über dieses Experiment.</a
          >`;
      case "es":
        return html`Esta página ha sido traducida del inglés por la comunidad.
          <a
            href="/es/docs/MDN/Community/Contributing/Translated_content#locales_activos"
            >Aprende más y únete a la comunidad de MDN Web Docs</a
          >.`;
      case "fr":
        return html`Cette page a été traduite à partir de l'anglais par la
          communauté.
          <a
            href="/fr/docs/MDN/Community/Contributing/Translated_content#langues_actives"
            >Vous pouvez contribuer en rejoignant la communauté francophone sur
            MDN Web Docs.</a
          >`;
      case "ja":
        return html`このページはコミュニティーの尽力で英語から翻訳されました。MDN
          Web Docs
          <a
            href="/ja/docs/MDN/Community/Contributing/Translated_content#アクティブなロケール"
            >コミュニティーについてもっと知り、仲間になるにはこちらから。</a
          >`;
      case "pt-BR":
        return html`Esta página foi traduzida do inglês pela comunidade.
          <a
            href="/pt-BR/docs/MDN/Community/Contributing/Translated_content#locais_ativos"
            >Saiba mais e junte-se à comunidade MDN Web Docs.</a
          >`;
      case "zh-CN":
        return html`此页面由社区从英文翻译而来。<a
            href="/zh-CN/docs/MDN/Community/Contributing/Translated_content#活跃语言"
            >了解更多并加入 MDN Web Docs 社区。</a
          >`;
      case "zh-TW":
        return html`此頁面由社群從英文翻譯而來。<a
            href="/zh-TW/docs/MDN/Community/Contributing/Translated_content#活躍的語言"
            >了解更多並加入 MDN Web Docs 社群。</a
          >`;

      default:
        return html`This page was translated from English by the community.
          <a
            href="/en-US/docs/MDN/Community/Contributing/Translated_content#active_locales"
            >Learn more and join the MDN Web Docs community.</a
          >`;
    }
  }

  /**
   * @param {import("@fred").Context<import("@rari").DocPage>} context
   */
  render(context) {
    const { locale } = context;

    if (locale === "en-US") {
      return nothing;
    }

    const switchToEnglish = this._renderSwitchToEnglish(context);

    return html`<div class="translation-banner notecard note">
      <p>${this._renderBody(locale)}</p>
      ${switchToEnglish ? html`<p>${switchToEnglish}</p>` : nothing}
    </div>`;
  }

  /**
   * @param {import("@fred").Context<import("@rari").DocPage>} context
   */
  _renderSwitchToEnglish(context) {
    const { locale } = context;
    if (
      locale === "en-US" ||
      !context.doc.other_translations.some(({ locale }) => locale === "en-US")
    ) {
      return nothing;
    }

    const url = context.doc.mdn_url.replace(`/${locale}/`, `/en-US/`);

    // Note: Do not translate, this is intentionally in English.

    return html`<p class="translation-banner__switch" lang="en-US">
      <mdn-button data-variant="secondary" href=${url}
        >View in English</mdn-button
      >
      <mdn-language-always-redirect-button locale=${context.locale} to="en-US"
        >Always switch to English</mdn-language-always-redirect-button
      >
    </p>`;
  }
}
