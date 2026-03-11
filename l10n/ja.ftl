# TODO Use comments, see: https://firefox-source-docs.mozilla.org/l10n/fluent/review.html#comments
# TODO Consider using terms, see: https://firefox-source-docs.mozilla.org/l10n/fluent/review.html#terms and https://projectfluent.org/fluent/guide/references.html#message-references

article-footer-last-modified = このページは <a data-l10n-name="contributors">MDN の貢献者</a>によって <time data-l10n-name="date">{ $date }</time> に最終更新されました。
article-footer-source-title = フォルダー: { $folder } （新しいタブで開く）

baseline-asterisk = この機能の一部は、対応レベルが異なる場合があります。
baseline-high-extra = この機能は広く実装されており、多くのバージョンの端末やブラウザーで動作します。{ $date }以降、すべてのブラウザーで利用可能です。
baseline-low-extra = { $date }以降、この機能は最新のバージョンの端末およびブラウザーで動作します。古い端末やブラウザーでは動作しないことがあります。
baseline-not-extra = この機能はベースラインではありません。最も広く使用されているブラウザーの一部で動作しません。
baseline-supported-in = { $browsers } が対応
baseline-unsupported-in = { $browsers } が広く対応していない
baseline-supported-and-unsupported-in = { $supported } が対応していますが、{ $unsupported } は広く対応していません。

homepage-hero-title = 開発者による、<br>開発者のためのリソース
homepage-hero-description = 2005 年から <a data-l10n-name="css">CSS</a>, <a data-l10n-name="html">HTML</a>, <a data-l10n-name="js">JavaScript</a> のドキュメントを作成しています。

not-found-title = ページが見つかりません
not-found-description = すみませんが、<code data-l10n-name="url">{ $url }</code> のページは見つかりませんでした。
not-found-fallback-english = <strong data-l10n-name="strong">朗報:</strong> リクエストされたこのページは<em data-l10n-name="em">英語</em>版に存在します。
not-found-fallback-search = リクエストされたページは存在しませんが、サイト内を検索してみてください。
not-found-back = ホームページに戻る

reference-toc-header = 目次

footer-mofo = <a data-l10n-name="moco">Mozilla Corporation</a> の非営利の親会社である <a data-l10n-name="mofo">Mozilla Foundation</a> を参照してください。
footer-copyright = このコンテンツの一部は、1998 年から { $year } 年にかけて、個人の mozilla.org 協力者によって作成されました。コンテンツは<a data-l10n-name="cc">クリエイティブ・コモンズ・ライセンス</a>のもとで利用できます。

search-modal-site-search = <em>{ $query }</em> をサイト検索

site-search-search-stats = { $results } 件の文書が見つかりました。
site-search-suggestion-matches =  { $relation ->
    [gt] more than { $matches ->
        [one]   { $matches } 件の一致
       *[other] { $matches } 件の一致
    }
   *[eq] { $matches ->
        [one]   { $matches } 件の一致
       *[other] { $matches } 件の一致
    }
}
site-search-suggestions-text = 他の候補:

blog-time-to-read = { $minutes ->
    [one]   { $minutes } minute read
   *[other] { $minutes } minutes read
}
blog-post-not-found = ブログ記事が見つかりません。

blog-previous = 前の投稿
blog-next = 次の投稿

-brand-name-obs = HTTP 観測所
obs-report = レポート
obs-title = { -brand-name-obs }
obs-landing-intro = 2016年にリリースされた { -brand-name-obs }は、セキュリティのベストプラクティスへの準拠状況を分析することでウェブセキュリティを強化します。これまでに 4700 万回以上のスキャンを実施し、690 万以上のウェブサイトに知見を提供してきました。
obs-assessment = Mozilla によって開発された { -brand-name-obs }は、サイトの HTTP ヘッダーやその他の主要なセキュリティ設定について詳細な評価を行います。
obs-scanning = 自動化されたスキャンプロセスにより、開発者やウェブサイト管理者に詳細で実用的なフィードバックを提供し、潜在的なセキュリティ脆弱性の特定と対応に重点を置いています。
obs-security = このツールは、絶えず進化するデジタル環境において、開発者やウェブサイト管理者が一般的なセキュリティ脅威に対するサイトの防御を強化する上で役立つ役割を果たします。
obs-mdn = { -brand-name-obs } は、Mozilla の専門知識と安全でより堅牢なインターネットへの取り組みに基づき、確立された傾向とガイドラインに基づいて、効果的なセキュリティインサイトを提供します。


compat-loading = 読み込み中…
compat-js-required = ブラウザー互換性一覧表を表示するには、JavaScript を有効にしてください。

compat-browser-version-date = { $browser } { $version } – リリース日: { $date }
compat-browser-version-released = リリース日: { $date }

compat-link-report-issue = この互換性データに関する問題を報告
compat-link-report-issue-title = この互換性データに関する課題を報告
compat-link-report-missing-title = 互換性データの不足を報告
compat-link-report-missing = この課題を報告
compat-link-source = GitHub でデータを閲覧
compat-link-source-title = ファイル: { $filename }

compat-deprecated = 非推奨
compat-experimental = 実験的
compat-nonstandard = 標準外
compat-no = なし

compat-support-full = 完全対応
compat-support-partial = 部分的に対応
compat-support-no = 対応なし
compat-support-unknown = 対応状況不明
compat-support-preview = プレビュー版ブラウザーのの対応
compat-support-prefix = { $prefix } ベンダー接頭辞付きで実装
compat-support-altname = 別名: { $altname }
compat-support-removed = { $version } 以降で除去
compat-support-see-impl-url = <a data-l10n-name="impl_url">{ $label }</a> を参照
compat-support-flags =
  { NUMBER($has_added) ->
    [one] バージョン { $version_added } 以降
    *[other] {""}
  }{ $has_last ->
    [one] { NUMBER($has_added) ->
          *[zero] { $versionLast } までのユーザー
          [one] {" "} { $versionLast } までのユーザー
      }
    *[zero] { NUMBER($has_added) ->
          *[zero] ユーザー
          [one] {" "}ユーザー
      }
  }
  は明示的に設定の必要あり: <code data-l10n-name="name">{ $flag_name }</code>{" "}
  { $flag_type ->
    *[preference] 設定
    [runtime_flag] ランタイムフラグ
  }{ NUMBER($has_value) ->
    [one] {" "}to <code data-l10n-name="value">{ $flag_value }</code>
    *[other] {""}
  }{"."}
  { NUMBER($has_pref_url) ->
    [one] { $flag_type ->
      [preference] { $browser_name } で設定を変更するには、{ $browser_pref_url } を参照してください。
      *[other] {""}
    }
    *[other] {""}
  }

compat-legend = Legend
compat-legend-tip = Tip: セルをクリック/タップすると、詳しい情報を確認できます。
compat-legend-yes = { compat-support-full }
compat-legend-partial = { compat-support-partial }
compat-legend-preview = 開発中。プレリリース版で対応。
compat-legend-no = { compat-support-no }
compat-legend-unknown = 互換性不明
compat-legend-experimental = { compat-experimental }。将来動作が変更される可能性があります。
compat-legend-nonstandard = { compat-nonstandard }。使用前にブラウザー間の互換性をチェックしてください。
compat-legend-deprecated = { compat-deprecated }。新しいウェブサイトでは使用しないでください。
compat-legend-footnote = 実装メモを参照。
compat-legend-disabled = ユーザーがこの機能を明示的に有効にする必要があります。
compat-legend-altname = 標準外の名前を使用しています。
compat-legend-prefix = 使用するにはベンダー接頭辞が必要か、別の名前が必要です。
compat-legend-more = 互換性に関する詳細情報があります。

placement-note = 広告
placement-no = 広告を見たくありませんか？

pagination-next = 次のページ
pagination-prev = 前のページ
pagination-current = 現在のページ
pagination-goto = ページ { $page } へ行く

logout = ログアウト
login = ログイン
settings = 個人設定

example-play-button-label = Play
example-play-button-title = 例を MDN Playground で実行（新しいタブで開く）

content-feedback-question = このページは役に立ちましたか？
content-feedback-reason = このページが役に立たなかったのはなぜですか？
content-feedback-thanks = ご意見ありがとうございます！

writer-reload-polling = { $seconds } 秒ごとにポーリング
