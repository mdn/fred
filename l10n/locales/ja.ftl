# ユーザーインターフェイス用日本語訳ファイル
#

article-footer-last-modified = このページは <time data-l10n-name="date">{ $date }</time> に <a data-l10n-name="contributors">MDN の貢献者</a>によって最終更新されました。
article-footer-source-title = フォルダー: { $folder } （新しいタブで開く）
baseline-asterisk = この機能の一部は、対応レベルにばらつきがある場合があります。
baseline-high-extra = この機能は広く実装されており、多くのバージョンの端末やブラウザーで動作します。{ $date }以降、すべてのブラウザーで利用可能です。
baseline-low-extra = { $date }以降、この機能は最新のバージョンの端末およびブラウザーで動作します。古い端末やブラウザーでは動作しないことがあります。
baseline-not-extra = この機能はベースラインではありません。最も広く使用されているブラウザーの一部で動作しません。
baseline-supported-in = { $browsers } で対応
baseline-unsupported-in = { $browsers } で広く対応していない
baseline-supported-and-unsupported-in = { $supported } が対応していますが、{ $unsupported } は広く対応していません。
baseline-signals = もっと多くのブラウザーがこの機能に対応してほしいですか？ <a data-l10n-name="link">理由を教えてください。</a>
homepage-hero-title = 開発者による、<br>開発者のためのリソース
playground-user-shared-warning = この Playground はユーザーが共有しています。<br>実行する前に、常にコードを確認してください。
homepage-hero-description = 2005 年から <a data-l10n-name="css">CSS</a>, <a data-l10n-name="html">HTML</a>, <a data-l10n-name="js">JavaScript</a> のドキュメントを作成しています。
not-found-title = ページが見つかりません
not-found-description = すみませんが、<code data-l10n-name="url">{ $url }</code> のページは見つかりませんでした。
not-found-fallback-english = <strong data-l10n-name="strong">朗報:</strong> リクエストされたこのページは<em data-l10n-name="em">英語</em>版に存在します。
not-found-fallback-search = リクエストされたページは存在しませんが、サイト内を検索してみてください。
not-found-back = ホームページに戻る
footer-copyright = このコンテンツの一部は、©1998–{ $year } 個人の mozilla.org 協力者です。コンテンツは<a data-l10n-name="cc">クリエイティブ・コモンズ・ライセンス</a>のもとで利用できます。
search-modal-site-search = サイトで <em>{ $query }</em> を検索
search-modal-results-status =
    { $results ->
        [0] 結果が見つかりませんでした。
        [one] { $results } 件の結果が利用できます。
       *[other] { $results } 件の結果が利用できます。
    }
site-search-search-stats = { $results } 件の文書が見つかりました。
site-search-suggestion-matches =
    { $relation ->
        [gt]
            { $matches ->
                [one] { $matches } 件を超える一致
               *[other] { $matches } 件を超える一致
            }
       *[eq]
            { $matches ->
                [one] { $matches } 件の一致
               *[other] { $matches } 件の一致
            }
    }
blog-time-to-read =
    { $minutes ->
        [one] { $minutes } 分で読めます
       *[other] { $minutes } 分で読めます
    }
-brand-name-obs = HTTP 観測所
obs-report = レポート
obs-title = { -brand-name-obs }
obs-landing-intro = 2016 年にリリースされた { -brand-name-obs }は、セキュリティのベストプラクティスへの準拠状況を分析することでウェブセキュリティを強化します。これまでに 4700 万回以上のスキャンを実施し、690 万以上のウェブサイトに知見を提供してきました。
obs-assessment = Mozilla によって開発された { -brand-name-obs }は、サイトの HTTP ヘッダーやその他の主要なセキュリティ設定について詳細な評価を行います。
obs-scanning = 自動化されたスキャンプロセスにより、開発者やウェブサイト管理者に詳細で実用的なフィードバックを提供し、潜在的なセキュリティ脆弱性の特定と対応に重点を置いています。
obs-security = このツールは、絶えず進化するデジタル環境において、開発者やウェブサイト管理者が一般的なセキュリティ脅威に対するサイトの防御を強化する上で役立つ役割を果たします。
obs-mdn = { -brand-name-obs } は、Mozilla の専門知識と安全でより堅牢なインターネットへの取り組みに基づき、確立された傾向とガイドラインに基づいて、効果的なセキュリティインサイトを提供します。
compat-browser-version-date = { $browser } { $version } – リリース日: { $date }
compat-browser-version-released = リリース日: { $date }
compat-link-source-title = ファイル: { $filename }
compat-settings-hide-browser = { $browser } を非表示
compat-settings-show-browser = { $browser } を表示
compat-branch-prefix = 接頭辞: <code data-l10n-name="prefix">{ $prefix }</code>
compat-branch-altname = 別名: <code data-l10n-name="altname">{ $altname }</code>
compat-branch-prefix-altname = 接頭辞: <code data-l10n-name="prefix">{ $prefix }</code>, 別名: <code data-l10n-name="altname">{ $altname }</code>
compat-support-removed = { $version } 以降で除去
compat-support-see-impl-url = <a data-l10n-name="impl_url">{ $label }</a> を参照
compat-support-flag-range =
    { $version_range ->
        [range] バージョン { $version_added } から { $version_last } までのユーザー
        [from] バージョン { $version_added } 以降のユーザー
        [until] バージョン { $version_last } までのユーザー
       *[none] ユーザー
    }は明示的に設定の必要あり: <code data-l10n-name="name">{ $flag_name }</code> { $flag_type ->
       *[preference] 設定
        [runtime_flag] ランタイムフラグ
    }{ $has_value ->
        [1] { " " }to <code data-l10n-name="value">{ $flag_value }</code>
       *[0] { "" }
    }.{ $has_pref_url ->
        [1]
            { $flag_type ->
                [preference] { $browser_name } で設定を変更するには、{ $browser_pref_url } を参照してください。
               *[other] { "" }
            }
       *[0] { "" }
    }
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
example-play-button-label = Play
example-play-button-title = 例を MDN Playground で実行（新しいタブで開く）
writer-reload-polling = { $seconds } 秒ごとにポーリング
a11y-menu-skip-to-main-content = メインコンテンツへスキップ
a11y-menu-skip-to-search = 検索へスキップ
article-footer-title = MDN の改良に協力
article-footer-learn-how-to-contribute = 協力方法を知る
article-footer-view-this-page-on-github = GitHub でこのページを表示
article-footer-this-will-take-you-to-github-to = GitHub へ移動して新しい issue を登録します。
article-footer-report-a-problem-with-this-conte = このコンテンツに関する問題を報告
baseline-indicator-deprecated = 非推奨
baseline-indicator-limited-availability = 利用可能性は限定的
baseline-indicator-baseline = Baseline
baseline-indicator-widely-available = 広く利用可能
baseline-indicator-newly-available = 最近利用可能
baseline-indicator-to-be-removed = 削除予定
baseline-indicator-pending-removal = この機能は、ブラウザーから除去される予定です。現時点でこの機能を使用すると、今後の更新で正常に動作しなくなる可能性があります。
baseline-indicator-avoid-using = この機能を新しいプロジェクトで使用することは避けてください。
baseline-indicator-candidate-for-removal = この機能は、ウェブ標準やブラウザーから除去される可能性があります。
baseline-indicator-alternatives-use = 代わりに次の機能を使用してください。
baseline-indicator-alternatives-consider = 代わりに次の機能を使用することを検討してください。
baseline-indicator-alternatives-end = .
baseline-indicator-baseline-discouraged = Baseline Discouraged
baseline-indicator-baseline-discouraged-cross = Baseline Discouraged Cross
baseline-indicator-baseline-cross = Baseline Cross
baseline-indicator-baseline-check = Baseline Check
baseline-indicator-check = 対応
baseline-indicator-cross = 未対応
baseline-indicator-learn-more = もっと詳しく
baseline-indicator-see-full-compatibility = 完全な互換性情報を見る
baseline-indicator-report-feedback = フィードバックを報告
blog-previous = 前の投稿
blog-next = 次の投稿
blog-index-blog-it-better = ブログをさらに充実させる
reference-toc-header = 目次
blog-post-not-found = ブログ記事が見つかりません。
collection-save-button-save-in-collection = コレクションに保存
collection-save-button-remove = 削除
collection-save-button-save = 保存
collection-save-button-add-to-collection = コレクションに追加
collection-save-button-collection = コレクション:
collection-save-button-saved-articles = 記事を保存
collection-save-button-new-collection = あたら石コレクション
collection-save-button-name = 名前:
collection-save-button-note = メモ:
collection-save-button-saving = 保存中…
collection-save-button-cancel = キャンセル
collection-save-button-deleting = 削除中…
collection-save-button-delete = 削除
theme-default = OS のデフォルト
color-theme-light = ライト
color-theme-dark = ダーク
color-theme-switch-color-theme = 配色を切り替え
color-theme-theme = 配色
compat-link-report-issue-title = この互換性データに関する課題を報告
compat-link-report-issue = この互換性データに関する問題を報告
compat-link-source = GitHub でデータを閲覧
compat-experimental = 実験的
compat-deprecated = 非推奨
compat-nonstandard = 標準外
compat-support-partial = 部分的対応
compat-support-preview-browser = プレビュー版ブラウザーの対応
compat-support-full = 完全対応
compat-support-no = 対応なし
compat-support-unknown = 対応状況不明
compat-yes = 対応
compat-partial = 部分的
compat-no = 未対応
compat-support-preview = プレビュー対応
compat-legend = 凡例
compat-legend-tip = Tip: セルをクリック/タップすると、詳しい情報を確認できます。
compat-link-report-missing-title = 互換性データの不足を報告
compat-link-report-missing = この課題を報告
compat-js-required = ブラウザー互換性一覧表を表示するには、JavaScript を有効にしてください。
compat-loading = 読み込み中…
compat-settings-platform-desktop = デスクトップ
compat-settings-platform-mobile = モバイル
compat-settings-platform-server = サーバー
compat-settings-platform-xr = XR
compat-settings-hidden-no-data = 現在の機能ではこのブラウザーの情報は利用できません。対応状況データが存在しません。
compat-settings-hidden-not-applicable = 現在の機能では利用できるブラウザーではありません。WebExtensions の機能は適用されません。
compat-settings-legend = 凡例
compat-settings-open = 設定
compat-settings-title = ブラウザー互換性設定
compat-settings-intro = 互換性一覧に表示するブラウザーを選択してください。選択結果は、このブラウザーに保存されます。
compat-settings-restore-defaults = デフォルトに戻す
compat-settings-cancel = キャンセル
compat-settings-save = 保存
content-feedback-content-is-out-of-date = コンテンツが古い
content-feedback-missing-information = 情報が欠けている
content-feedback-code-examples-not-working-as-exp = コード例が期待通りに動作しない
content-feedback-other = その他
content-feedback-question = このページは役に立ちましたか？
content-feedback-yes = はい
content-feedback-no = いいえ
content-feedback-reason = このページが役に立たなかったのはなぜですか？
content-feedback-submit = 送信
content-feedback-thanks = ご意見ありがとうございます！
contributor-spotlight-want-to-be-part-of-the-journey = この旅に参加してみませんか？
contributor-spotlight-our-constant-quest-for-innovatio = 私たちの絶え間ないイノベーションへの探求は、ここ、あなたから始まります。MDN のあらゆる要素（ドキュメント、デモ、サイト自体）は、素晴らしいオープンな開発者コミュニティから生まれています。ぜひご参加ください！
contributor-spotlight-get-involved = 参加する
contributor-spotlight-contributor-profile = 貢献者のプロフィール
copy-button-copied = コピーしました
copy-button-copy-failed = コピーに失敗しました
copy-button-copy = コピー
footer-mdn-on-github = MDN on GitHub
footer-mdn-on-bluesky = MDN on Bluesky
footer-mdn-on-x = MDN on X
footer-mdn-on-mastodon = MDN on Mastodon
footer-mdn-blog-rss-feed = MDN ブログ RSS フィード
footer-mdn = MDN
footer-about = MDN について
footer-blog = ブログ
footer-mozilla-careers = Mozilla 求人
footer-advertise-with-us = 広告掲載について
footer-mdn-plus = MDN Plus
footer-product-help = Product help
footer-contribute = 協力
footer-mdn-community = MDN コミュニティ
footer-community-resources = コミュニティリソース
footer-writing-guidelines = 執筆ガイドライン
footer-mdn-discord = MDN Discord
footer-developers = 開発者
footer-web-technologies = ウェブ技術
footer-learn-web-development = ウェブ開発を学ぶ
footer-guides = ガイド
footer-tutorials = チュートリアル
footer-glossary = 用語集
footer-hacks-blog = Hacks blog
footer-website-privacy-notice = ウェブサイトのプライバシー通知
footer-telemetry-settings = テレメトリー設定
footer-legal = 法的情報
footer-community-participation-guidelin = コミュニティ参加ガイドライン
footer-mdn-logo = MDN ロゴ
footer-tagline = より良いインターネットのための青写真。
footer-mozilla-logo = Mozilla ロゴ
generic-toc__header = 目次
homepage-body-featured-articles = 注目の記事
homepage-body-latest-news = 最新ニュース
homepage-body-recent-contributions = 最近の貢献
homepage-contributor-spotlight-contributor-spotlight = 注目の貢献者
homepage-contributor-spotlight-get-involved = 参加する
homepage-search-search-the-site = サイトを検索
homepage-search-search = 検索
interactive-example-reset-disabled = サンプルを編集するまで、リセットは無効です
interactive-example-reset = リセット
interactive-example-value-select = 値の選択
interactive-example-the-current-value-is-not-support = 現在の値はこのブラウザーが対応していません。
interactive-example-run-example-and-show-console-ou = 例を実行してコンソール出力を表示
interactive-example-run = 実行
interactive-example-reset-example-and-clear-console = 例をリセットしてコンソール出力をクリア
interactive-example-console-output = コンソール出力
interactive-example-output = 出力
issues-table-loading-issues = loading issues…
issues-table-title = Title
issues-table-repository = Repository
language-switcher-remember-language = 言語を記憶
language-switcher-enable-this-setting-to-always-sw = この設定を有効にすると、利用可能な場合は常に現在の言語に切り替わります。（詳細はこちらをクリックしてください。）
language-switcher-learn-more = もっと知る
login-button-login = ログイン
modal-exit-modal = Exit modal
navigation-toggle-navigation = Toggle navigation
obs-about-title = About the HTTP Observatory
observatory-landing-read-our-faq = Read our FAQ
observatory-landing-report-feedback = Report Feedback
observatory-rescan-button-rescan = Rescan
observatory-rescan-button-wait-a-minute-to-rescan = Wait a minute to rescan
observatory-results-report-feedback = Report Feedback
observatory-results-faq = FAQ
observatory-tests-and-scores-loading-tests-and-scoring-data = Loading tests and scoring data...
observatory-tests-and-scores-see = See
observatory-tests-and-scores-for-guidance = for guidance.
observatory-tests-and-scores-test-result = Test result
observatory-tests-and-scores-description = Description
observatory-tests-and-scores-modifier = Modifier
observatory-tests-and-scores-failed-to-load-tests-and-scoring = Failed to load tests and scoring data. Please try again later.
blog-rss-title = MDN Blog RSS フィード
brand-web-docs = MDN Web Docs
meta-description = MDN Web Docs サイトでは、ウェブサイトやプログレッシブウェブアプリ向けの HTML、CSS、API などのオープンウェブ技術に関する情報を提供しています。
logo-alt = MDN ロゴ
pagination-pagination = Pagination
playground-do-you-really-want-to-clear-ever = 本当にすべてをクリアしますか？
playground-do-you-really-want-to-revert-you = 本当に変更を取り消しますか？
playground-playground = Playground
playground-format = 整形
playground-run = 実行
playground-share = 共有
playground-clear = クリア
playground-reset = リセット
playground-seeing-something-inappropriate = 不適切な内容を見つけましたか？
playground-console = コンソール
playground-share-markdown = マークダウンを共有
playground-copy-markdown-to-clipboard = マークダウンをクリップボードにコピー
playground-share-data-url = データ URL で共有
playground-copy-data-url-to-clipboard = データ URL をクリップボードにコピー
playground-share-your-code-via-permalink = コードをパーマリンクで共有
playground-copy-to-clipboard = クリップボードにコピー
playground-create-link = リンクを作成
playground-report-this-malicious-or-inappro = この悪意のある、または不適切な共有プレイグラウンドを報告
playground-can-you-please-share-some-detail = このコンテンツの問題点について、詳しく教えてください。
playground-cancel = キャンセル
playground-report = 報告
recently-visited-recently-visited = 最近訪問
scrim-inline-clicking-will-load-content-from = クリックで scrimba.com からコンテンツを読み込み
scrim-inline-toggle-fullscreen = 全画面切り替え
scrim-inline-open-on-scrimba = Scrimba で開く
scrim-inline-load-scrim-and-open-dialog = スクリームを読み込んでダイアログを開く
search-button-search-the-site = このサイトを検索
search-modal-loading-search-index = 検索インデックスを読み込み中…
search-modal-search = 検索
search-modal-exit-search = 検索終了
search-modal-results-label = 検索結果
sidebar-filter-filter-sidebar = サイドバーをフィルタリング
sidebar-filter-filter = フィルター
sidebar-filter-clear-filter-input = フィルター入力をクリア
site-search-search = 検索
site-search-previous = 前へ
site-search-next = 次へ
site-search-suggestions-text = 他の候補:
site-search-searching = 検索中…
site-search-language = 言語
site-search-both = Both
specifications-list-this-feature-does-not-appear-to = この機能は、どの仕様書にも定義されていません。
specifications-list-specification = 仕様書
survey-hide-this-survey = この調査を非表示
survey-take-survey-opens-in-a-new-tab = アンケート（新しいタブで開く）
toggle-sidebar-toggle-sidebar = サイドバーを切り替え
user-menu-ai-help = AI ヘルプ
user-menu-collections = コレクション
user-menu-updates = 更新
user-menu-settings = 個人設定
user-menu-help = ヘルプ
user-menu-feedback = フィードバック
user-menu-user = ユーザー
writer-open-editor-open-in-editor = エディターで開く
writer-toolbar-view-on-mdn = MDN で表示
