# Changelog

## [1.2.0](https://github.com/mdn/fred/compare/v1.1.1...v1.2.0) (2025-08-28)


### Features

* **env:** add runtime variables ([#642](https://github.com/mdn/fred/issues/642)) ([ab504ef](https://github.com/mdn/fred/commit/ab504effc762002df03d709e9ed605f58b6b2b22))


### Bug Fixes

* **npm:** js/styles/assets weren't being found ([#641](https://github.com/mdn/fred/issues/641)) ([1c4e02a](https://github.com/mdn/fred/commit/1c4e02a2ea20da72e8a43b9362c8a285f060af5c))

## [1.1.1](https://github.com/mdn/fred/compare/v1.1.0...v1.1.1) (2025-08-28)


### Bug Fixes

* **contributor-spotlight:** pass real label to button ([#635](https://github.com/mdn/fred/issues/635)) ([872e280](https://github.com/mdn/fred/commit/872e280471ec05bea1072841119270c90509224d))
* ensure css images respect user theme choice ([#623](https://github.com/mdn/fred/issues/623)) ([a539b3a](https://github.com/mdn/fred/commit/a539b3a93c0db8e680653d702ab305cbedd19904))
* **homepage-contributor-spotlight:** preserve image aspect ratio ([#627](https://github.com/mdn/fred/issues/627)) ([d33485f](https://github.com/mdn/fred/commit/d33485f52d30218ab0e2837156be18641b3e2e55)), closes [#613](https://github.com/mdn/fred/issues/613)
* **homepage-hero:** link to current locale ([#631](https://github.com/mdn/fred/issues/631)) ([cba8acb](https://github.com/mdn/fred/commit/cba8acb40eb803556f9ec4cad3f0af4f23c9e087))
* **live-samples:** avoid handling code examples twice ([#652](https://github.com/mdn/fred/issues/652)) ([5fb74aa](https://github.com/mdn/fred/commit/5fb74aab4fe1176b52e3d38375e5b059cf7541a5))
* **live-samples:** id can contain dots ([#637](https://github.com/mdn/fred/issues/637)) ([116324b](https://github.com/mdn/fred/commit/116324bb997408fb62f54a77ebc915cd3a90576d))
* **observatory:** score tooltip broken on chrome/safari ([#643](https://github.com/mdn/fred/issues/643)) ([96d7d47](https://github.com/mdn/fred/commit/96d7d47e0129f6e378e1c8e20939634046761908))
* **search-modal:** support adding from context menu in Firefox ([#636](https://github.com/mdn/fred/issues/636)) ([58dd323](https://github.com/mdn/fred/commit/58dd323defb88c5147de2be4f9c024a4484339b1))
* **writer-mode:** path to file wrong when running as package ([#640](https://github.com/mdn/fred/issues/640)) ([6bf4d2f](https://github.com/mdn/fred/commit/6bf4d2f76c8588f165886bfde32673494c6b0a9d))


### Enhancements

* **play-runner:** set allow-modals by default ([#634](https://github.com/mdn/fred/issues/634)) ([d7cc5d7](https://github.com/mdn/fred/commit/d7cc5d7d3c69c7eb2d645a73f19f8c4bbb11aa78))


### Miscellaneous

* **compat-table:** hide Bun for now ([#645](https://github.com/mdn/fred/issues/645)) ([92c55b8](https://github.com/mdn/fred/commit/92c55b849769bc8e520e13c7f1cb349b41245943))
* **deps-dev:** bump @mdn/browser-compat-data from 7.0.0 to 7.1.0 ([#644](https://github.com/mdn/fred/issues/644)) ([5de409a](https://github.com/mdn/fred/commit/5de409a61bebd673125d13c7d238333a1d679912))
* **deps-dev:** bump postcss-preset-env from 10.3.0 to 10.3.1 in the dev group ([#650](https://github.com/mdn/fred/issues/650)) ([7b20432](https://github.com/mdn/fred/commit/7b2043296789afe610cebd79d806c9f4bd68fad8))
* **deps-dev:** bump the dev group with 2 updates ([#646](https://github.com/mdn/fred/issues/646)) ([a366acd](https://github.com/mdn/fred/commit/a366acd64731213255c58f5989f1102f584a3443))
* **deps-dev:** bump the dev group with 3 updates ([#639](https://github.com/mdn/fred/issues/639)) ([da85a57](https://github.com/mdn/fred/commit/da85a579608806ba38b131f5e5fc2fbe63c356cf))
* **deps:** bump concurrently from 9.2.0 to 9.2.1 in the prod group ([#638](https://github.com/mdn/fred/issues/638)) ([0fb6305](https://github.com/mdn/fred/commit/0fb630501f75601d4905636e4ae695abae7dacec))

## [1.1.0](https://github.com/mdn/fred/compare/v1.0.0...v1.1.0) (2025-08-25)


### Features

* better print/pdf support for docs and observatory ([#561](https://github.com/mdn/fred/issues/561)) ([aa37d1d](https://github.com/mdn/fred/commit/aa37d1d4411413403ed386afbf4be4f5803ef5ca))
* **placement:** playground placement on right side ([#554](https://github.com/mdn/fred/issues/554)) ([5cc2e69](https://github.com/mdn/fred/commit/5cc2e69b6681d51b0a86a6b46d4e62c6e39673b2))
* **sidebar-filter:** refactor, always expand, increase font-size ([#588](https://github.com/mdn/fred/issues/588)) ([01c6f12](https://github.com/mdn/fred/commit/01c6f127287742b0ae431ae2c8c04faa72125a91))
* **writer-mode:** reload when content edited ([#620](https://github.com/mdn/fred/issues/620)) ([06854ca](https://github.com/mdn/fred/commit/06854caec5894df74ca181ac0fc85b73a4f488fd))


### Bug Fixes

* **baseline-indicator:** remove asterisk artifact ([#596](https://github.com/mdn/fred/issues/596)) ([dee9843](https://github.com/mdn/fred/commit/dee9843ff7ee9b531807f6388585b89ebe80b0cc))
* **build:** add public assets, respect BUILD_OUT_ROOT ([#592](https://github.com/mdn/fred/issues/592)) ([f98e655](https://github.com/mdn/fred/commit/f98e6557072171945afc4abfdd850b18cc5f5156))
* **interactive-examples:** improve a11y + fix unsupported icon ([#542](https://github.com/mdn/fred/issues/542)) ([dbab195](https://github.com/mdn/fred/commit/dbab1955ea13c19763e99de44f040632f4732505))
* **language-switcher:** add query string ([#618](https://github.com/mdn/fred/issues/618)) ([8427ea2](https://github.com/mdn/fred/commit/8427ea23c253eda95a571016c132b93a33b44524))
* **placement:** fallback rendering on home page ([#589](https://github.com/mdn/fred/issues/589)) ([c999265](https://github.com/mdn/fred/commit/c9992656d38bd9ae038a06c1576b61ce25043d40))
* **play-runner:** internal state could clobber runner state ([#625](https://github.com/mdn/fred/issues/625)) ([8ed1c89](https://github.com/mdn/fred/commit/8ed1c890f366d713fa394670582773c589e21524))
* **play:** add aria-live to runner/console ([dbab195](https://github.com/mdn/fred/commit/dbab1955ea13c19763e99de44f040632f4732505))
* **playground:** couldn't undo after formatting ([30efd45](https://github.com/mdn/fred/commit/30efd45eb377152ce5d3d9173372e3851b614118))
* **playground:** dispatch editor changes to support undo ([#607](https://github.com/mdn/fred/issues/607)) ([30efd45](https://github.com/mdn/fred/commit/30efd45eb377152ce5d3d9173372e3851b614118))
* **search-modal:** handle modifier keys ([#597](https://github.com/mdn/fred/issues/597)) ([8b3e7d4](https://github.com/mdn/fred/commit/8b3e7d4483f14e87c0265b3c5d3f2d4bd7cf772c))
* **search:** remove broken sort by options ([#615](https://github.com/mdn/fred/issues/615)) ([1b6d4aa](https://github.com/mdn/fred/commit/1b6d4aa89e97963af4760f86ac2f3004bc5b25ee))
* **sidebar-filter:** increase contrast of matches ([#598](https://github.com/mdn/fred/issues/598)) ([872bc47](https://github.com/mdn/fred/commit/872bc47420353ef2ce732fd5ce272e7aebdbc6d8))


### Miscellaneous

* **article-footer:** point "Learn how to contribute" link to "Getting started" page ([#564](https://github.com/mdn/fred/issues/564)) ([4fa9da7](https://github.com/mdn/fred/commit/4fa9da77f9ae064c4e41d81f23b1cc1b4b075637))
* **deps-dev:** bump @mdn/browser-compat-data from 6.1.4 to 7.0.0 ([#629](https://github.com/mdn/fred/issues/629)) ([10dee0b](https://github.com/mdn/fred/commit/10dee0b05d10ce162760379152c8b9d15d873ab3))
* **deps-dev:** bump @rsdoctor/rspack-plugin from 1.2.2 to 1.2.3 in the dev group ([#600](https://github.com/mdn/fred/issues/600)) ([ebd1fc1](https://github.com/mdn/fred/commit/ebd1fc1ecca81091e5136efbee3a51a7a002cedd))
* **deps-dev:** bump the dev group with 4 updates ([#628](https://github.com/mdn/fred/issues/628)) ([9e01660](https://github.com/mdn/fred/commit/9e01660b205caa4697029b3d99c4dde98a70d08c))

## [1.0.0](https://github.com/mdn/fred/compare/v0.3.0...v1.0.0) (2025-08-20)


### Bug Fixes

* **blog:** layout distortion on wider viewports ([#563](https://github.com/mdn/fred/issues/563)) ([dfaa8ba](https://github.com/mdn/fred/commit/dfaa8ba338347cb4cad1e0dd721c0189c235004a))
* **light-dark:** fix colors and theme switcher when polyfilled ([#568](https://github.com/mdn/fred/issues/568)) ([e0794cc](https://github.com/mdn/fred/commit/e0794cc57177b3ded5e39ac40f1c78b24c46529d))
* **switch:** remove closing input tag ([#585](https://github.com/mdn/fred/issues/585)) ([9f22c40](https://github.com/mdn/fred/commit/9f22c409475453f48631a6dcbd32929d751ea3f5))
* various components were using old text color vars ([#566](https://github.com/mdn/fred/issues/566)) ([8fbaad9](https://github.com/mdn/fred/commit/8fbaad9ed29b256d923087573795095814bb28f7))


### Miscellaneous

* **deps-dev:** bump @codemirror/language from 6.11.2 to 6.11.3 in the dev group ([#555](https://github.com/mdn/fred/issues/555)) ([901b803](https://github.com/mdn/fred/commit/901b80367ff946df9fd7a4649d7f35112a14752b))
* **deps-dev:** bump @mdn/browser-compat-data from 6.1.2 to 6.1.3 ([#556](https://github.com/mdn/fred/issues/556)) ([a68ee58](https://github.com/mdn/fred/commit/a68ee58720009c2972ea1bb605b246781f5d16ed))
* **deps-dev:** bump @mdn/browser-compat-data from 6.1.3 to 6.1.4 ([#582](https://github.com/mdn/fred/issues/582)) ([c94f8b2](https://github.com/mdn/fred/commit/c94f8b2da3b297c826ebafda1db7957c74e8ac1e))
* **deps-dev:** bump the dev group with 2 updates ([#581](https://github.com/mdn/fred/issues/581)) ([607b72f](https://github.com/mdn/fred/commit/607b72fb86653d0ecc733b7810fedb560ce8c747))
* **menu:** update missing docs ([#567](https://github.com/mdn/fred/issues/567)) ([d8693ee](https://github.com/mdn/fred/commit/d8693ee2ab8ca592d50278d81480aa8de39c114d))
* release 1.0.0 ([#584](https://github.com/mdn/fred/issues/584)) ([df1460b](https://github.com/mdn/fred/commit/df1460be485117c9e22d957d09279ddc1d2c0f99))

## [0.3.0](https://github.com/mdn/fred/compare/v0.2.0...v0.3.0) (2025-08-15)


### Features

* **menu:** link to en-US if page not available in current locale ([#547](https://github.com/mdn/fred/issues/547)) ([24a81b7](https://github.com/mdn/fred/commit/24a81b79534330ba1fcbb352577771e7b90817fd))
* **placement:** new leaderboard format ([#454](https://github.com/mdn/fred/issues/454)) ([7e8476f](https://github.com/mdn/fred/commit/7e8476febaf71bdd2af83b0f62363ca61dd53739))
* **plus/offline:** add offline mode using yari client ([#531](https://github.com/mdn/fred/issues/531)) ([bbe86c5](https://github.com/mdn/fred/commit/bbe86c5244d02d2f17471ab8bbdc18e865841794))


### Bug Fixes

* **a11y:** add breadcrumb & sidebar padding ([#541](https://github.com/mdn/fred/issues/541)) ([dff52a5](https://github.com/mdn/fred/commit/dff52a5c02563499e93e83b3e356fcb3e0cd9ee6))
* **code-example:** add aria-label to "Play" button ([#527](https://github.com/mdn/fred/issues/527)) ([de4a404](https://github.com/mdn/fred/commit/de4a404f0723775110c9143d6bfce24f6eddd0c6))
* **curriculum:** responsive fix on landing page ([#503](https://github.com/mdn/fred/issues/503)) ([1d73a65](https://github.com/mdn/fred/commit/1d73a6552df12e8a4b10c2955c4338c37b2f141b))
* **footer:** links casing ([#473](https://github.com/mdn/fred/issues/473)) ([376ba0c](https://github.com/mdn/fred/commit/376ba0cd3820f0383cbbcbc611d6ebdc0f6f5805))
* **global:** blue buttons in mobile Safari ([#511](https://github.com/mdn/fred/issues/511)) ([55bedc2](https://github.com/mdn/fred/commit/55bedc22841719ebca159781d9b3ca90ef562e10))
* **interactive-example:** add title to Run/Reset + console ([#532](https://github.com/mdn/fred/issues/532)) ([6ff0142](https://github.com/mdn/fred/commit/6ff0142dad18cdf3ccc33e261720de0c178e63cf))
* **lang-switch:** directly point to the label ([#506](https://github.com/mdn/fred/issues/506)) ([6cbcfb8](https://github.com/mdn/fred/commit/6cbcfb86496e7d152ee32378ba057e62836ff99a))
* **language-switcher:** show locales that exist on 404 ([#512](https://github.com/mdn/fred/issues/512)) ([32b4e42](https://github.com/mdn/fred/commit/32b4e421f2ab0429d2ce81e2bc7017b996e1bf33))
* **menu:** change curriculum link to en-US ([#466](https://github.com/mdn/fred/issues/466)) ([cf45776](https://github.com/mdn/fred/commit/cf45776584c6f5346be5522db38b9c5cd7502433))
* **observatory:** mark illustrative SVGs with `presentation` role ([#524](https://github.com/mdn/fred/issues/524)) ([4b313c3](https://github.com/mdn/fred/commit/4b313c30e82dabfcb7387e96c1f8ec6db0631ca5))
* **outer-layout:** preload only latin fonts ([#495](https://github.com/mdn/fred/issues/495)) ([e298c4e](https://github.com/mdn/fred/commit/e298c4e763d4bf21d06c176d6d48a2eac8ef988a))
* **placement:** use same key/value as yari for disabling ([#508](https://github.com/mdn/fred/issues/508)) ([7a76065](https://github.com/mdn/fred/commit/7a7606590e9523beae74e6852f1e411962a98576))
* **playground:** catch cross origin errors when attempting to check origin ([#463](https://github.com/mdn/fred/issues/463)) ([d57f18a](https://github.com/mdn/fred/commit/d57f18a14bf780f1d2ecf409925ba94624295026))
* **plus:** update staging/test base URLs for subscription platform ([#551](https://github.com/mdn/fred/issues/551)) ([9b011e7](https://github.com/mdn/fred/commit/9b011e7b3ff9d790b05f68ce80fe564a13507229))
* **sidebar:** Remove top padding for mobile views ([#504](https://github.com/mdn/fred/issues/504)) ([3093aa7](https://github.com/mdn/fred/commit/3093aa7f129e8f51f7e7dd519ac42d4077f9530a))
* **site-search:** add h1 for a11y ([#544](https://github.com/mdn/fred/issues/544)) ([43c7274](https://github.com/mdn/fred/commit/43c7274dc9e5141a9cc9468201b36ee3fa032c0d))


### Miscellaneous

* add active user ping ([#494](https://github.com/mdn/fred/issues/494)) ([e2ad0ca](https://github.com/mdn/fred/commit/e2ad0cabd1bd4b72710f5b48ab9c76da73577e53))
* **deps-dev:** bump @mdn/browser-compat-data from 6.0.36 to 6.0.37 ([#501](https://github.com/mdn/fred/issues/501)) ([242b5ed](https://github.com/mdn/fred/commit/242b5edf03c65b679d380712f3a1f1532f51aa8b))
* **deps-dev:** bump @mdn/browser-compat-data from 6.0.37 to 6.1.0 ([#510](https://github.com/mdn/fred/issues/510)) ([d8c84f0](https://github.com/mdn/fred/commit/d8c84f0ccb64c00aa7b1a260df118743058501f1))
* **deps-dev:** bump @mdn/browser-compat-data from 6.1.0 to 6.1.1 ([#517](https://github.com/mdn/fred/issues/517)) ([e58eb8f](https://github.com/mdn/fred/commit/e58eb8f36dcac61cfe70b6d2b0f111417b23ee25))
* **deps-dev:** bump @mdn/browser-compat-data from 6.1.1 to 6.1.2 ([#538](https://github.com/mdn/fred/issues/538)) ([7f88432](https://github.com/mdn/fred/commit/7f88432ecd2f31426c9d3eb00d048d747227b7d5))
* **deps-dev:** bump @mdn/rari from 0.1.46 to 0.1.47 ([#530](https://github.com/mdn/fred/issues/530)) ([50890ec](https://github.com/mdn/fred/commit/50890ecc8ff201a193dbb73efc31152f1b807a41))
* **deps-dev:** bump @mdn/rari from 0.1.47 to 0.1.48 ([#537](https://github.com/mdn/fred/issues/537)) ([df56d74](https://github.com/mdn/fred/commit/df56d74677d9e8808bc0d7854b2d67c6d9d73398))
* **deps-dev:** bump @mdn/yari from 5.0.2 to 5.0.3 ([#529](https://github.com/mdn/fred/issues/529)) ([094652b](https://github.com/mdn/fred/commit/094652b8878fee85fa93d602ca517ae86b6cd602))
* **deps-dev:** bump @typescript-eslint/eslint-plugin from 8.39.0 to 8.39.1 in the dev group ([#533](https://github.com/mdn/fred/issues/533)) ([adc3276](https://github.com/mdn/fred/commit/adc327681f57a0414a9378d8f89a9e44bc1f67b9))
* **deps-dev:** bump eslint-plugin-jsdoc from 51.4.1 to 52.0.2 ([#496](https://github.com/mdn/fred/issues/496)) ([3127901](https://github.com/mdn/fred/commit/312790118450b89a161582170a11b5a5e337655b))
* **deps-dev:** bump eslint-plugin-jsdoc from 52.0.4 to 53.0.1 ([#534](https://github.com/mdn/fred/issues/534)) ([12b0915](https://github.com/mdn/fred/commit/12b0915ddddcf0f7552cbc22cf73f41e06135f0b))
* **deps-dev:** bump eslint-plugin-unicorn from 59.0.1 to 60.0.0 ([#445](https://github.com/mdn/fred/issues/445)) ([fb91e6f](https://github.com/mdn/fred/commit/fb91e6f607b4f95357439f0afaac384674397277))
* **deps-dev:** bump stylelint-config-recess-order from 7.1.0 to 7.2.0 in the dev group ([#528](https://github.com/mdn/fred/issues/528)) ([e0392be](https://github.com/mdn/fred/commit/e0392be299a4690e03d48cf229c3dfd257a97a6e))
* **deps-dev:** bump stylelint-config-standard from 38.0.0 to 39.0.0 ([#470](https://github.com/mdn/fred/issues/470)) ([484c9ca](https://github.com/mdn/fred/commit/484c9ca0e3f634af53b0ad01e2fa968e9779d5e1))
* **deps-dev:** bump the dev group with 2 updates ([#509](https://github.com/mdn/fred/issues/509)) ([83c5287](https://github.com/mdn/fred/commit/83c52871f048059d5c0574ed29b9fb3672f04ed5))
* **deps-dev:** bump the dev group with 2 updates ([#513](https://github.com/mdn/fred/issues/513)) ([f842f4e](https://github.com/mdn/fred/commit/f842f4e022a5a676ef25800d1692ca2c6595d148))
* **deps-dev:** bump the dev group with 2 updates ([#514](https://github.com/mdn/fred/issues/514)) ([cfe1847](https://github.com/mdn/fred/commit/cfe1847c0538edfd18209e77baf0914b014fa9ed))
* **deps-dev:** bump the dev group with 2 updates ([#539](https://github.com/mdn/fred/issues/539)) ([581e230](https://github.com/mdn/fred/commit/581e230c2e0c74894ae7081b817c07d3f0cf01ed))
* **deps-dev:** bump the dev group with 4 updates ([#505](https://github.com/mdn/fred/issues/505)) ([ad33028](https://github.com/mdn/fred/commit/ad3302872d4974585e03b14bcb7defcb43e91962))
* **deps-dev:** bump the dev group with 5 updates ([#518](https://github.com/mdn/fred/issues/518)) ([ca6b854](https://github.com/mdn/fred/commit/ca6b854d4eed8390b469176b906b0501cef909e7))
* **deps:** bump fdir from 6.4.6 to 6.5.0 in the prod group ([#552](https://github.com/mdn/fred/issues/552)) ([2aa957e](https://github.com/mdn/fred/commit/2aa957e2e5b91f013ee5dc44c7fb2f5f46b47d5a))
* **env:** set safe defaults, disable survey, add glean debug ([#500](https://github.com/mdn/fred/issues/500)) ([8f9dc04](https://github.com/mdn/fred/commit/8f9dc04aaeb9e35d63eaca0b2d2d5242314efa3a))

## [0.2.0](https://github.com/mdn/fred/compare/v0.1.0...v0.2.0) (2025-07-31)


### Features

* **content-section:** add # to dl anchors ([#410](https://github.com/mdn/fred/issues/410)) ([bab489b](https://github.com/mdn/fred/commit/bab489b4277f73d8ba114bda1b6793e82f657814))
* **playground:** add reporting modal for shared examples ([#386](https://github.com/mdn/fred/issues/386)) ([117cb50](https://github.com/mdn/fred/commit/117cb50015538fa408affb1d9fd3be7300c195b4))
* **radius:** add global radius vars ([#472](https://github.com/mdn/fred/issues/472)) ([3028e41](https://github.com/mdn/fred/commit/3028e415d5f882d46eec45e49099a249992066a5))
* **writer-mode:** add writer toolbar ([#446](https://github.com/mdn/fred/issues/446)) ([7fed55b](https://github.com/mdn/fred/commit/7fed55b7e9bb0442b7978ea3a04b077f95ebf1bd))


### Bug Fixes

* **about:** auto-scroll to top of tab panel when tab is switched ([#409](https://github.com/mdn/fred/issues/409)) ([c56822d](https://github.com/mdn/fred/commit/c56822d7f6182bc52562cc21cb27a77f4247bcfe))
* **ai-help:** nav and sidebar overlap on mobile ([#474](https://github.com/mdn/fred/issues/474)) ([3f1f7b4](https://github.com/mdn/fred/commit/3f1f7b4b5214b88d2a1793a602c37388fed6674c))
* **article-footer:** remove link from header ([#392](https://github.com/mdn/fred/issues/392)) ([83700bb](https://github.com/mdn/fred/commit/83700bb7b399f49c747adf33edd650630305468d))
* **breadcrumbs-bar:** show active value in dropdowns ([#387](https://github.com/mdn/fred/issues/387)) ([079d07b](https://github.com/mdn/fred/commit/079d07bd2e5e20c88414889fdb87c021dde24995))
* **button:** prevent leaking non-unique element ids ([#455](https://github.com/mdn/fred/issues/455)) ([69ceaad](https://github.com/mdn/fred/commit/69ceaad3e823dfe780806a8a7f1b9c85b8a6fe88))
* **code-example:** highlight good and bad examples ([#385](https://github.com/mdn/fred/issues/385)) ([79543f3](https://github.com/mdn/fred/commit/79543f3ff723954ca8e5ced9470309bfd32bae4c))
* **code-examples:** wrap rather than scroll ([#418](https://github.com/mdn/fred/issues/418)) ([f7f63c6](https://github.com/mdn/fred/commit/f7f63c6a4530d7c5a707029430392f42cd2c8e41))
* **community:** heading anchor links ([#406](https://github.com/mdn/fred/issues/406)) ([9f9680c](https://github.com/mdn/fred/commit/9f9680c5b3353dd4e2f083d3272b631041c0d400))
* **compat-table:** fluent error from incorrect NUMBER cast ([#434](https://github.com/mdn/fred/issues/434)) ([da805ef](https://github.com/mdn/fred/commit/da805efd3384cea04f25f3547dde0e9d0a7a66d3))
* **content-section:** add margin to dl &gt; ul ([#398](https://github.com/mdn/fred/issues/398)) ([f40438d](https://github.com/mdn/fred/commit/f40438d96d82ab77adffec72fdeb7eaa4839d5e5))
* **content-section:** add scroll-margin-top on :target ([#415](https://github.com/mdn/fred/issues/415)) ([fac80de](https://github.com/mdn/fred/commit/fac80de38276ca906ac9e2e5517db6e4b32db729))
* **content-section:** make anchors text color ([#427](https://github.com/mdn/fred/issues/427)) ([c114919](https://github.com/mdn/fred/commit/c1149196e4180f496cdb392a8d3ef9bf7c3a797e))
* **css-formal-syntax:** remove js and add consistent styling ([#393](https://github.com/mdn/fred/issues/393)) ([b0f0b53](https://github.com/mdn/fred/commit/b0f0b53411c4b717e4ddc624689a1da9cec08f64))
* **curriculum:** add `code` element background ([#433](https://github.com/mdn/fred/issues/433)) ([6cafe20](https://github.com/mdn/fred/commit/6cafe20793a945d11df0c246f9aa5d87c944ef9f))
* **curriculum:** don't remove light/dark ids in svgo ([#429](https://github.com/mdn/fred/issues/429)) ([65d9de0](https://github.com/mdn/fred/commit/65d9de0c9f3863315841b0dcb97e43a017d6fe2a))
* **curriculum:** increase card height to accommodate for larger font size ([#420](https://github.com/mdn/fred/issues/420)) ([3cbfe33](https://github.com/mdn/fred/commit/3cbfe33de531e6b2cd46de04b57b577e01cb476b))
* **curriculum:** responsiveness and theme awareness ([#467](https://github.com/mdn/fred/issues/467)) ([35072e5](https://github.com/mdn/fred/commit/35072e5592885c7e9a60dcc5e62432c310bdb816))
* **curriculum:** sidebar didn't show on mobile ([#432](https://github.com/mdn/fred/issues/432)) ([f9b5cf6](https://github.com/mdn/fred/commit/f9b5cf6c5b0e2863d30b9c694310ec35dd01375a))
* ensure content can't overflow the page ([#402](https://github.com/mdn/fred/issues/402)) ([dd64ee3](https://github.com/mdn/fred/commit/dd64ee312be50116de463f74423413121b4ccb2f))
* **font:** disable code ligatures ([#397](https://github.com/mdn/fred/issues/397)) ([8e4166c](https://github.com/mdn/fred/commit/8e4166c4d291ea3f89a8b4d707bbce47bf79f9ee))
* **font:** link colors, font variables in curriculum, observatory ([#399](https://github.com/mdn/fred/issues/399)) ([865647a](https://github.com/mdn/fred/commit/865647aa6b0039dbb2be383930c4729a98189267))
* **font:** replaced font-related hardcoded values with variables ([#396](https://github.com/mdn/fred/issues/396)) ([bde6332](https://github.com/mdn/fred/commit/bde6332b0c40389f114c6c1f77f4189a984c2eee))
* **header:** layout shift due to login link ([#424](https://github.com/mdn/fred/issues/424)) ([d0af7e6](https://github.com/mdn/fred/commit/d0af7e6c97b3de31f0b7c46117e1328bb3e0e43a))
* **inter:** ligatures causing arrows in titles ([#442](https://github.com/mdn/fred/issues/442)) ([2c83269](https://github.com/mdn/fred/commit/2c83269178e47ae6a043e12b9898c2a6b8c90355))
* **ix:** not enough contrast in tab text colour ([#383](https://github.com/mdn/fred/issues/383)) ([b8ee1c4](https://github.com/mdn/fred/commit/b8ee1c4303eced0dbb57dfce2dc00f8f4a8e44f1))
* **left-sidebar:** some items displayed horizontally ([#461](https://github.com/mdn/fred/issues/461)) ([7d811a9](https://github.com/mdn/fred/commit/7d811a9e5a4194de0e0e2c2d6a3e07914ef82c40))
* **legacy:** environment variables weren't being bundled ([#394](https://github.com/mdn/fred/issues/394)) ([e6ec0dd](https://github.com/mdn/fred/commit/e6ec0ddf254ec8d92567bcf0cafa34c668ff931e))
* **live-sample:** don't add px to height if it already has it ([#417](https://github.com/mdn/fred/issues/417)) ([d5db94b](https://github.com/mdn/fred/commit/d5db94bce68c42fdc2c6c100bc7671ec97333392))
* **live-samples:** assets wouldn't load in playground ([#381](https://github.com/mdn/fred/issues/381)) ([1a942f7](https://github.com/mdn/fred/commit/1a942f703699663243b4030c3a3e0a411d783e99))
* **not-found:** use global link styles ([#395](https://github.com/mdn/fred/issues/395)) ([da36381](https://github.com/mdn/fred/commit/da363817e838fdf0f8744b3c66c12ee30d5bba07))
* **obs:** add skip links to content ([#384](https://github.com/mdn/fred/issues/384)) ([4a895ef](https://github.com/mdn/fred/commit/4a895efccaf0ee7d98bd7ffa53e2b15d2c42a64d))
* **observatory:** rescan button text  ([#431](https://github.com/mdn/fred/issues/431)) ([0aeb7bb](https://github.com/mdn/fred/commit/0aeb7bb718824a44c72eec7e8bf1a1924cdd1510))
* **observatory:** various responsive fixes ([#438](https://github.com/mdn/fred/issues/438)) ([d24e98d](https://github.com/mdn/fred/commit/d24e98dd89acd26d04d4f7dd1900be891627656e))
* **playground:** code blocks wouldn't scroll in certain browsers ([#382](https://github.com/mdn/fred/issues/382)) ([37eecfd](https://github.com/mdn/fred/commit/37eecfdc3e59869481bb6baefb5a8cce5cd211a2))
* **playground:** editor not minimizing in some browsers ([#462](https://github.com/mdn/fred/issues/462)) ([9bdd968](https://github.com/mdn/fred/commit/9bdd9685d7b0e19de2c13a4559f8aec2d5cfdd5f))
* **plus:** removed sidebar entry for offline docs ([#450](https://github.com/mdn/fred/issues/450)) ([f4358fe](https://github.com/mdn/fred/commit/f4358fe16c40b760454d6dee473e1661baec495b))
* **prev-next:** layout issues on small screens ([#460](https://github.com/mdn/fred/issues/460)) ([634ba1d](https://github.com/mdn/fred/commit/634ba1d6b337f1b04c47cf11f93e2a9d9027aa9d))
* **reference-layout:** bem naming convention ([#407](https://github.com/mdn/fred/issues/407)) ([37f55bf](https://github.com/mdn/fred/commit/37f55bfffba5daa89ddd1d25986e3932ce386c55))
* **search:** close when clicking backdrop cross-browser ([#436](https://github.com/mdn/fred/issues/436)) ([5972d79](https://github.com/mdn/fred/commit/5972d79a53a03abb9b6f6aa6dc83ae91dc69cf2f))
* **sidebar-filter:** highlight was causing weird layouts ([#403](https://github.com/mdn/fred/issues/403)) ([2ac3843](https://github.com/mdn/fred/commit/2ac3843f906e2ce8b1223393535d516eb3c6421a))
* **specifications-list:** collapse only specs with multiple urls ([#419](https://github.com/mdn/fred/issues/419)) ([4c8c62c](https://github.com/mdn/fred/commit/4c8c62c940c611744dd06d17312f70d6937e15e0))
* **syntax-highlighting:** ensure comment colour is accessible ([#400](https://github.com/mdn/fred/issues/400)) ([5a0a710](https://github.com/mdn/fred/commit/5a0a710187a3139ba29fd5da2be637e56ac49f5e))
* **toggle-sidebar:** don't show when there's no sidebar ([#430](https://github.com/mdn/fred/issues/430)) ([45280bd](https://github.com/mdn/fred/commit/45280bd7ef5a2d462d05db2ca86eded3177be7a1))


### Enhancements

* **content-section:** adjust h4-h5 styles ([#441](https://github.com/mdn/fred/issues/441)) ([2288a1d](https://github.com/mdn/fred/commit/2288a1d29cbc56163fce10d8686f94c705e76274))
* **font:** remove ligatures from JB Mono ([#437](https://github.com/mdn/fred/issues/437)) ([dfd318b](https://github.com/mdn/fred/commit/dfd318b6d8725c8c7d5d80cd43efe7d3bc5b1326))
* **homepage-search:** use design colors ([#456](https://github.com/mdn/fred/issues/456)) ([95159e8](https://github.com/mdn/fred/commit/95159e813a3ff6047e384c07068eb3b45c3139b7))
* **menu:** use mask icons ([#423](https://github.com/mdn/fred/issues/423)) ([3ed0da0](https://github.com/mdn/fred/commit/3ed0da0c1cd112394220307e535d7a79be5bd4e4))
* **reference-layout:** improve h1 line-height ([#408](https://github.com/mdn/fred/issues/408)) ([445481c](https://github.com/mdn/fred/commit/445481c2f25b879fe6ecfed59905c7f50ac26bfa))
* **search-mobile:** restyle on mobile and add close button ([#416](https://github.com/mdn/fred/issues/416)) ([638558f](https://github.com/mdn/fred/commit/638558f53dfd105099ffac7bdd40bc70250c8463))
* **sidebars:** use learn area colours in learn area ([#369](https://github.com/mdn/fred/issues/369)) ([08bdedf](https://github.com/mdn/fred/commit/08bdedf971d553bb2ce9416fe71ec4694832db31))


### Miscellaneous

* **content-section:** style blockquote ([#414](https://github.com/mdn/fred/issues/414)) ([a5838f3](https://github.com/mdn/fred/commit/a5838f344662188eed83505fce9a3cb4158f1088))
* **deps-dev:** bump @mdn/browser-compat-data from 6.0.30 to 6.0.31 ([#377](https://github.com/mdn/fred/issues/377)) ([15847b3](https://github.com/mdn/fred/commit/15847b3356297ab01a7df6fd9609f936115e8d5e))
* **deps-dev:** bump @mdn/browser-compat-data from 6.0.31 to 6.0.32 ([#405](https://github.com/mdn/fred/issues/405)) ([e791d70](https://github.com/mdn/fred/commit/e791d70652e8953b4897475675a92770fefc4d3b))
* **deps-dev:** bump @mdn/browser-compat-data from 6.0.32 to 6.0.33 ([#440](https://github.com/mdn/fred/issues/440)) ([b5cccdc](https://github.com/mdn/fred/commit/b5cccdce0c428709050ac1df90f87762ba97b364))
* **deps-dev:** bump @mdn/browser-compat-data from 6.0.33 to 6.0.34 ([#448](https://github.com/mdn/fred/issues/448)) ([50f6a9e](https://github.com/mdn/fred/commit/50f6a9eae6dda7854ec7576c945e768af10078a7))
* **deps-dev:** bump @mdn/browser-compat-data from 6.0.34 to 6.0.35 ([#457](https://github.com/mdn/fred/issues/457)) ([4e9d6fb](https://github.com/mdn/fred/commit/4e9d6fb29fcaa37fd7fb1b59aaa18fe376e948dd))
* **deps-dev:** bump @mdn/browser-compat-data from 6.0.35 to 6.0.36 ([#469](https://github.com/mdn/fred/issues/469)) ([f87b4fa](https://github.com/mdn/fred/commit/f87b4fab61cc333628862fcf0cc9a58df98582e2))
* **deps-dev:** bump @mdn/yari from 5.0.1 to 5.0.2 ([#475](https://github.com/mdn/fred/issues/475)) ([bc2199b](https://github.com/mdn/fred/commit/bc2199b44bd64c8986d5be79d9731847650d63d7))
* **deps-dev:** bump @typescript-eslint/eslint-plugin from 8.36.0 to 8.37.0 in the dev group ([#389](https://github.com/mdn/fred/issues/389)) ([3c73ea5](https://github.com/mdn/fred/commit/3c73ea51d79bc2367b6c092add7dde8339b16e07))
* **deps-dev:** bump @typescript-eslint/eslint-plugin from 8.37.0 to 8.38.0 in the dev group ([#444](https://github.com/mdn/fred/issues/444)) ([a00f3e1](https://github.com/mdn/fred/commit/a00f3e181ca2adc608005df3fabe83184f531524))
* **deps-dev:** bump eslint-plugin-jsdoc from 51.4.0 to 51.4.1 in the dev group ([#412](https://github.com/mdn/fred/issues/412)) ([075d9c5](https://github.com/mdn/fred/commit/075d9c550cc37391171bd96caf87f7a719e72321))
* **deps-dev:** bump eslint-plugin-n from 17.21.2 to 17.21.3 in the dev group ([#464](https://github.com/mdn/fred/issues/464)) ([abf4d52](https://github.com/mdn/fred/commit/abf4d5260c7aaff992009dc63e6793edc6d589d5))
* **deps-dev:** bump stylelint from 16.22.0 to 16.23.0 in the dev group ([#468](https://github.com/mdn/fred/issues/468)) ([04932d8](https://github.com/mdn/fred/commit/04932d8c3ac50477be54d10425128e9108e56f17))
* **deps-dev:** bump the dev group across 1 directory with 3 updates ([#449](https://github.com/mdn/fred/issues/449)) ([9438645](https://github.com/mdn/fred/commit/94386452bebb1834bc6f9d1b92666bee49dfb993))
* **deps-dev:** bump the dev group with 2 updates ([#453](https://github.com/mdn/fred/issues/453)) ([06cfe0e](https://github.com/mdn/fred/commit/06cfe0ee8fa5ef9c7f51ee70f8c39f4fcf316b6c))
* **deps-dev:** bump the dev group with 3 updates ([#378](https://github.com/mdn/fred/issues/378)) ([c88a352](https://github.com/mdn/fred/commit/c88a35261df71b4ede22ec15f251189d42eb6632))
* **deps-dev:** bump the dev group with 3 updates ([#439](https://github.com/mdn/fred/issues/439)) ([f9d48c3](https://github.com/mdn/fred/commit/f9d48c3d88a94631ae14093fcb0cb690ae412612))
* **deps-dev:** bump the dev group with 3 updates ([#458](https://github.com/mdn/fred/issues/458)) ([878c545](https://github.com/mdn/fred/commit/878c545d663619bbf6c71b5ed50315103f181c13))
* **deps-dev:** bump the dev group with 4 updates ([#404](https://github.com/mdn/fred/issues/404)) ([f326e4b](https://github.com/mdn/fred/commit/f326e4b63a442f1f03e0c364d758d8db7c4390a6))
* **deps:** bump the prod group with 2 updates ([#425](https://github.com/mdn/fred/issues/425)) ([7c705ea](https://github.com/mdn/fred/commit/7c705eaaeaa381f01b921e714dc6a38b58f5c91b))
* **deps:** bump the prod group with 3 updates ([#375](https://github.com/mdn/fred/issues/375)) ([0faa9cb](https://github.com/mdn/fred/commit/0faa9cb69bb238738c306f3d7e6d45340d261a55))
* **github:** add CODEOWNERS ([#422](https://github.com/mdn/fred/issues/422)) ([5cd1885](https://github.com/mdn/fred/commit/5cd18859ce0394a1d27b876e07236ada6ea76def))
* **l10n:** address some feedback ([#413](https://github.com/mdn/fred/issues/413)) ([480473e](https://github.com/mdn/fred/commit/480473e99ce2cc0e7ae06d829bd0ea27e83484c9))
* **menu:** Update js link ([#391](https://github.com/mdn/fred/issues/391)) ([2f3e472](https://github.com/mdn/fred/commit/2f3e4723140b0d6fce1e9e4c3be628fe2e641659))
* **outer-layout:** move favicons below scripts ([#390](https://github.com/mdn/fred/issues/390)) ([ee116af](https://github.com/mdn/fred/commit/ee116af59a72490cfc614adc0f8f262d444c73a8))
* **specifications:** port table from yari ([#428](https://github.com/mdn/fred/issues/428)) ([d09e63a](https://github.com/mdn/fred/commit/d09e63a814ec99f253d759717b6404da30b6d683))
* **styling:** prev/next & spacing ([#380](https://github.com/mdn/fred/issues/380)) ([47f9376](https://github.com/mdn/fred/commit/47f937604cd360a1b3b7b9aefb9cef1a51a6b3c8))
* **styling:** Updating yellow colour for accessibility ([#426](https://github.com/mdn/fred/issues/426)) ([bba9315](https://github.com/mdn/fred/commit/bba931577b4cfc1bd1c6a5d26b21bb641f1e460c))

## [0.1.0](https://github.com/mdn/fred/compare/v0.0.5...v0.1.0) (2025-07-11)


### Features

* **blog:** styles ([#327](https://github.com/mdn/fred/issues/327)) ([2bb6c5a](https://github.com/mdn/fred/commit/2bb6c5a8367f3261821a24c5ee6c15682a5574ef))
* **button, blog:** add iconPosition attribute, use icon arrows ([#326](https://github.com/mdn/fred/issues/326)) ([dc5bd68](https://github.com/mdn/fred/commit/dc5bd684881f3d7bbec3be86ea2b2f608b99a0ef))
* **button:** add stylable parts, use for survey ([#344](https://github.com/mdn/fred/issues/344)) ([51fcf0e](https://github.com/mdn/fred/commit/51fcf0ed4ff91afa5d1aba85f5eca842d55e45fd))
* **font:** add code font, subset all fonts ([#336](https://github.com/mdn/fred/issues/336)) ([acebf7c](https://github.com/mdn/fred/commit/acebf7cd6193cafa8f2b5ee7a8af07cbcca2668b))
* **global:** add global link colors ([#346](https://github.com/mdn/fred/issues/346)) ([d03bee7](https://github.com/mdn/fred/commit/d03bee7a270186f1d24efe1b9ffa50bbc31e62ef))
* **site-search:** implement site search suggestions ([#363](https://github.com/mdn/fred/issues/363)) ([d107680](https://github.com/mdn/fred/commit/d10768017de98e8d720ca612a02f5cbee9a1632d))
* **user-menu:** add mobile styles ([#318](https://github.com/mdn/fred/issues/318)) ([69181f2](https://github.com/mdn/fred/commit/69181f21b47563932a77c158523aa3e2cb3d6f47))


### Bug Fixes

* **a11y-menu:** open dialog on skip to search ([0b8094f](https://github.com/mdn/fred/commit/0b8094ffdfc62e1e2bd546aace7a6bb3d2b0ccfd))
* blog toc ([#330](https://github.com/mdn/fred/issues/330)) ([d508364](https://github.com/mdn/fred/commit/d508364ceb9de841a4bceeb256e47d2326e98577))
* **blog:** avoid page jumping on load ([#357](https://github.com/mdn/fred/issues/357)) ([402860f](https://github.com/mdn/fred/commit/402860f36a5c619a11da80f3b016dce4d9020df2))
* **blog:** remove author gap ([01b9080](https://github.com/mdn/fred/commit/01b90804551a1c45b71ac73f01e32ba03aaf7e9c))
* **blog:** show as single column on mobile ([#368](https://github.com/mdn/fred/issues/368)) ([dae59c0](https://github.com/mdn/fred/commit/dae59c06562c8f0e21dc4567fa21ae71f7f84be4))
* **breadcrumbs-bar:** remove padding only with toggle ([5854f26](https://github.com/mdn/fred/commit/5854f260fd75469494e9a2051d16f7ee4858b4c2))
* **breadcrumbs:** keep padding with no sidebar on small and narrower screens ([594c00f](https://github.com/mdn/fred/commit/594c00fc5a825ef1874446922eb441e48f79069d))
* **code-example:** add prism theme from yari ([#371](https://github.com/mdn/fred/issues/371)) ([b813ddb](https://github.com/mdn/fred/commit/b813ddb9b21ffceeea7612608ddc219046d1a97f))
* **code-font:** normalize usage ([#354](https://github.com/mdn/fred/issues/354)) ([08a0338](https://github.com/mdn/fred/commit/08a03380352cd09047fa964ac97ce1605a3b19b8))
* **content-section:** revert anchor styling ([#352](https://github.com/mdn/fred/issues/352)) ([182f325](https://github.com/mdn/fred/commit/182f325bfd71f2514edc7ce48451daff7b0f41db))
* **content-section:** style plain pre tags ([#365](https://github.com/mdn/fred/issues/365)) ([cf60aab](https://github.com/mdn/fred/commit/cf60aab12c28e4248717a75b2de439783116c07e))
* **external-link:** add alt text to icon ([63a28e9](https://github.com/mdn/fred/commit/63a28e9ad7e033edd4b75279a52d78eca8b2a396))
* **external-link:** icon alignment ([#355](https://github.com/mdn/fred/issues/355)) ([0990037](https://github.com/mdn/fred/commit/0990037fcccebec3b38dfc8368b216c8a667f387))
* **external-link:** use zero-width space to expose alt text ([343ee09](https://github.com/mdn/fred/commit/343ee0973d5925249d13e1baf9fc09ade16ad941))
* **interactive-examples:** dark theme now applies on load ([#373](https://github.com/mdn/fred/issues/373)) ([c2a37a9](https://github.com/mdn/fred/commit/c2a37a9ca8d441b0283328497da2838fa76740d9))
* **issues-table:** set links colors ([#331](https://github.com/mdn/fred/issues/331)) ([25c8239](https://github.com/mdn/fred/commit/25c8239a04e3fa87c3889da39bc78d1c80ee07c3))
* **left-sidebar:** use code font family ([#321](https://github.com/mdn/fred/issues/321)) ([38fa12e](https://github.com/mdn/fred/commit/38fa12eefc31ad3f228447b13e28b26e40ef3a43))
* **live-samples:** allow associating one code block with multiple live samples, replicating yari behaviour ([4669b4f](https://github.com/mdn/fred/commit/4669b4f821140a87b38c51b1b1862375e16ef68a))
* **menu, homepage:** fix validation errors ([#315](https://github.com/mdn/fred/issues/315)) ([5c5dcc8](https://github.com/mdn/fred/commit/5c5dcc81a29510009841ba1b6307cc00e2a4514b))
* **menu:** hard-code en-US for English-only SPAs ([0520e75](https://github.com/mdn/fred/commit/0520e758294fc52cdde58d002f11827872fecaaf))
* **outer-layout:** set html lang ([e0b61d9](https://github.com/mdn/fred/commit/e0b61d9df6a782d644076954744c5d2942d42df5))
* **play-editor:** use dark theme if dark set on page load ([dbf60d1](https://github.com/mdn/fred/commit/dbf60d16afe109bba069c7f61d4ff2eff9513d39))
* **playground:** auto run unless code is loaded from link off-site ([309da14](https://github.com/mdn/fred/commit/309da14d03b8cfc62ad34cb4107061b868504427))
* **playground:** long lines of code changed layout ([3c1987d](https://github.com/mdn/fred/commit/3c1987dad684317a58a418acce2d58f37d6bf8fd))
* **playground:** use lighter border colour ([e81eeec](https://github.com/mdn/fred/commit/e81eeec2b90b04d5040e506726a92ad91175b556))
* **prev-next:** avoid center if no prev ([fc00e2f](https://github.com/mdn/fred/commit/fc00e2ff525c6b45373c99ee23e5ef906eb6fc05))
* **recent-contributions:** fix repo link ([b4421dd](https://github.com/mdn/fred/commit/b4421dddb6883e085a096b70ce219d50d363b84f))
* rename css classes on advertise with us page ([#351](https://github.com/mdn/fred/issues/351)) ([1038b44](https://github.com/mdn/fred/commit/1038b4417ebfd657821a601fdb5eb3d5dd5305f3))
* **toc:** render nothing if empty ([7ba3ead](https://github.com/mdn/fred/commit/7ba3ead09babbc58c9faae32fd9b402a9745431f))


### Enhancements

* **blog:** lazy load images "below the fold" on index page ([#348](https://github.com/mdn/fred/issues/348)) ([86b3f07](https://github.com/mdn/fred/commit/86b3f0733471c26ac162859583f97655b6ae74af))
* **breadcrumbs-bar:** show language-switcher on non-Doc pages ([#345](https://github.com/mdn/fred/issues/345)) ([3958137](https://github.com/mdn/fred/commit/3958137025fe97ea843ad978ce05b5630082df7a))
* **colors:** increase contrast ([#356](https://github.com/mdn/fred/issues/356)) ([5b2ccc0](https://github.com/mdn/fred/commit/5b2ccc0d74cb564b9fe0616ffa1e1efc3fa3d39b))
* **content-section:** use design colors ([#353](https://github.com/mdn/fred/issues/353)) ([6cf34c2](https://github.com/mdn/fred/commit/6cf34c297aa0ef855af22bca82fc5733f2fba5e8))
* **dropdown:** close on escape ([#349](https://github.com/mdn/fred/issues/349)) ([53f0464](https://github.com/mdn/fred/commit/53f04648b6b70bfa55134c722b9cae7a6b03b561))
* **font:** make it smaller ([#337](https://github.com/mdn/fred/issues/337)) ([6d94589](https://github.com/mdn/fred/commit/6d94589994c59039fc20ad039e25add9228e37ff))
* **heading-anchor:** improve hash  ([#347](https://github.com/mdn/fred/issues/347)) ([30ccbed](https://github.com/mdn/fred/commit/30ccbed6c29d1b466fa698b38c903d55292d4790))
* **menu:** refine design ([#370](https://github.com/mdn/fred/issues/370)) ([7269170](https://github.com/mdn/fred/commit/72691707ef0f5a9946f991caa5c43d951c2e23ac))
* **notecard:** add color to border + icon ([#358](https://github.com/mdn/fred/issues/358)) ([fe3b067](https://github.com/mdn/fred/commit/fe3b06715c1edeb5bc71667e633d97e2bfa95a5e))
* **prev-next:** make responsive ([51b98f8](https://github.com/mdn/fred/commit/51b98f8a774fe9ce00e3bf44fa8dd6ed795f1f7a))
* **search-modal:** align highlight with sidebar/toc ([#359](https://github.com/mdn/fred/issues/359)) ([6f37fe1](https://github.com/mdn/fred/commit/6f37fe13bacb270008ca608ea294e077f054f585))
* **search-modal:** hide "Web" in slug ([0857331](https://github.com/mdn/fred/commit/0857331b43b6fd7700728ca68ce2d9ec5a42e465))
* **search-modal:** replace underscore in slugs ([890e37c](https://github.com/mdn/fred/commit/890e37c726b99ce61b6e82bc6c146e6e06b6354f))
* **search-modal:** show crumbs on top ([#366](https://github.com/mdn/fred/issues/366)) ([921b770](https://github.com/mdn/fred/commit/921b770e0c77b79b160bb159acffc1f17de052df))
* **search:** refine crumbs ([#367](https://github.com/mdn/fred/issues/367)) ([464291d](https://github.com/mdn/fred/commit/464291d210eacaea9e35fae890aecf238db0ddef))
* **sidebar-filter:** use mask icon, improve focus ([#364](https://github.com/mdn/fred/issues/364)) ([3b0ce1c](https://github.com/mdn/fred/commit/3b0ce1c5bc96b94e6cf8fb1b3d673c7c6b6b471b))
* **sidebar:** wrap text, along with various style tweaks ([#339](https://github.com/mdn/fred/issues/339)) ([98557c2](https://github.com/mdn/fred/commit/98557c2dd544b24d5b3fb934fbcd13d183f45af4))
* **site-search:** redesign ([#338](https://github.com/mdn/fred/issues/338)) ([54476ae](https://github.com/mdn/fred/commit/54476ae61d4a0f0ecca9b90bb5e4e4f9cfcb8ddf))
* **specifications-list:** group by specification + collapse if necessary ([dcb5134](https://github.com/mdn/fred/commit/dcb51346aac9eb34a3bf954976aada7f944f2ac5))
* **survey:** colors, dark theme, icon ([#343](https://github.com/mdn/fred/issues/343)) ([fe197aa](https://github.com/mdn/fred/commit/fe197aa51b10bbd6bcaeab132d26954439613c3e))
* **user-menu:** style mobile login link ([#350](https://github.com/mdn/fred/issues/350)) ([ffa0573](https://github.com/mdn/fred/commit/ffa05736ae7ccb55be245b5a8edb9081f5fe04aa))


### Miscellaneous

* **collection-save-button:** add l10n ([291f580](https://github.com/mdn/fred/commit/291f5807ebbf97170f8805b1a4e543b507963b81))
* **compat-table:** add missing l10n ([a62cad3](https://github.com/mdn/fred/commit/a62cad360ab55b14171658373aead6a2b8c1f2c4))
* **components:** add page-not-created ([246f9d7](https://github.com/mdn/fred/commit/246f9d709dd17d911378b50f59a0385f92702114))
* **content-section:** style images ([bfc7035](https://github.com/mdn/fred/commit/bfc70350aa57f5cbc6bcea453d95d3f6ec0319bd))
* **content-section:** style tables including properties ([#332](https://github.com/mdn/fred/issues/332)) ([7da20b7](https://github.com/mdn/fred/commit/7da20b7b953789d98c79f2a1f2b816858494ab42))
* **contributor-spotlight:** add more l10n ([d29d497](https://github.com/mdn/fred/commit/d29d49714702f934c965cf91332f057ea92de81f))
* **deps-dev:** add lit-analyzer ([#324](https://github.com/mdn/fred/issues/324)) ([5201615](https://github.com/mdn/fred/commit/52016151b7d127078c8824b1f2aad7ada2c83f24))
* **deps-dev:** bump @mdn/browser-compat-data from 6.0.27 to 6.0.28 ([#313](https://github.com/mdn/fred/issues/313)) ([e4dd3ce](https://github.com/mdn/fred/commit/e4dd3cee86f947788a680d2b2735571bf9785158))
* **deps-dev:** bump @mdn/browser-compat-data from 6.0.28 to 6.0.29 ([#329](https://github.com/mdn/fred/issues/329)) ([2b5e3bd](https://github.com/mdn/fred/commit/2b5e3bd25224d18462f6e491741322f5cc5b467f))
* **deps-dev:** bump @mdn/browser-compat-data from 6.0.29 to 6.0.30 ([#340](https://github.com/mdn/fred/issues/340)) ([73adfb8](https://github.com/mdn/fred/commit/73adfb8e6185fafe9eb129911b8d92916e113b6c))
* **deps-dev:** bump @mdn/rari from 0.1.45 to 0.1.46 ([#361](https://github.com/mdn/fred/issues/361)) ([4bbf1cd](https://github.com/mdn/fred/commit/4bbf1cd16023acad61bef2261c25557ad91e88a1))
* **deps-dev:** bump @mdn/yari from 4.12.3 to 4.12.4 ([#314](https://github.com/mdn/fred/issues/314)) ([fd0ee06](https://github.com/mdn/fred/commit/fd0ee0690d9ba306bf8a3e547c393ebfa4a74bf2))
* **deps-dev:** bump @mdn/yari from 4.12.4 to 4.12.5 ([#317](https://github.com/mdn/fred/issues/317)) ([cfb87e0](https://github.com/mdn/fred/commit/cfb87e0a808306499443445664a86e66873963aa))
* **deps-dev:** bump @mdn/yari from 4.12.5 to 5.0.0 ([#323](https://github.com/mdn/fred/issues/323)) ([82a8af5](https://github.com/mdn/fred/commit/82a8af50e60f00ecb43dba68febcf3ae285346c9))
* **deps-dev:** bump @mdn/yari from 5.0.0 to 5.0.1 ([#362](https://github.com/mdn/fred/issues/362)) ([dbf18ba](https://github.com/mdn/fred/commit/dbf18ba1dc48c31d31da5dc901fa590257dba706))
* **deps-dev:** bump the dev group across 1 directory with 6 updates ([#341](https://github.com/mdn/fred/issues/341)) ([85765ef](https://github.com/mdn/fred/commit/85765ef2cb1c447f27991f77c8831dbca9b70e1d))
* **deps-dev:** bump the dev group with 2 updates ([#316](https://github.com/mdn/fred/issues/316)) ([dae8639](https://github.com/mdn/fred/commit/dae8639651aabcc08472be8a304721a7333d9f3a))
* **deps-dev:** bump the dev group with 2 updates ([#328](https://github.com/mdn/fred/issues/328)) ([17925e4](https://github.com/mdn/fred/commit/17925e4bf8ea577e8142964092c83371b5f094f7))
* **deps-dev:** bump the dev group with 3 updates ([#360](https://github.com/mdn/fred/issues/360)) ([c9039df](https://github.com/mdn/fred/commit/c9039df285949ab3701c82cc2a54e792dbf684f6))
* **deps-dev:** bump the dev group with 5 updates ([#322](https://github.com/mdn/fred/issues/322)) ([0f50dcf](https://github.com/mdn/fred/commit/0f50dcfe3f713f61c8487f79bcbfe193f37ef061))
* **deps-dev:** bump the dev group with 6 updates ([#312](https://github.com/mdn/fred/issues/312)) ([ddfabe2](https://github.com/mdn/fred/commit/ddfabe23e34b2751d48b585824656290119fb6f6))
* **homepage-search:** move icon to left ([f986059](https://github.com/mdn/fred/commit/f9860595bcf45aca3c4e692840a718dc3c00fb13))
* **language-switcher:** show current language ([2934053](https://github.com/mdn/fred/commit/2934053b9ddc18ccd70d4c8556718a6a674bfb1f))
* **left-sidebar:** reduce code font size ([3e947e0](https://github.com/mdn/fred/commit/3e947e0730a7bed02e50c1f042846131decd797c))
* **outer-layout:** add meta ([c5a85df](https://github.com/mdn/fred/commit/c5a85df8e006de39a8b2aabf7b0ce05560e85955))
* **outer-layout:** add robots meta ([#372](https://github.com/mdn/fred/issues/372)) ([81564d0](https://github.com/mdn/fred/commit/81564d0c28c12c9d04899d230b5abc54871ea182))
* **package.json:** add repository, move license/author up ([a5a0f7d](https://github.com/mdn/fred/commit/a5a0f7d6dd8f059a2f8c171c7e5828875a5822d8))
* **prev-next:** increase border radius ([876c46f](https://github.com/mdn/fred/commit/876c46feb2c5038e021888c1811867ba71247a77))
* **scripts:** add test script ([88f6d89](https://github.com/mdn/fred/commit/88f6d8983b7879b33e74f5167870e8669bec6f8b))
* **survey:** add l10n ([42c8379](https://github.com/mdn/fred/commit/42c8379aebccc274f92c6e47ed895dea06eb7288))
* **survey:** add real fred survey ([5429478](https://github.com/mdn/fred/commit/542947803d2855553a2348fff382820d48075d57))

## [0.0.5](https://github.com/mdn/fred/compare/v0.0.4...v0.0.5) (2025-07-01)


### Bug Fixes

* **homepage-hero:** avoid non-link underline ([#287](https://github.com/mdn/fred/issues/287)) ([919f789](https://github.com/mdn/fred/commit/919f789b89e1afdb3610a509aa2e70c665616704))
* **placement:** add focus-visible to sidebar ([#280](https://github.com/mdn/fred/issues/280)) ([7381c00](https://github.com/mdn/fred/commit/7381c00b1fb9ca769d902da8bd7c76f1f6b33d76))


### Enhancements

* **search-modal:** update blur, mark, links ([#309](https://github.com/mdn/fred/issues/309)) ([8ce49b3](https://github.com/mdn/fred/commit/8ce49b3b4f508ce0ba735e4c9d0b3f4155234b3c))


### Miscellaneous

* **deps-dev:** bump the dev group with 2 updates ([#307](https://github.com/mdn/fred/issues/307)) ([48f89f3](https://github.com/mdn/fred/commit/48f89f3b1410bf7cb8d18d73a00cad6c396a012a))
* **search-modal:** add styles ([#304](https://github.com/mdn/fred/issues/304)) ([4e08eff](https://github.com/mdn/fred/commit/4e08effaf9a8080cea33c0b61ce44f509facee64))

## [0.0.4](https://github.com/mdn/fred/compare/v0.0.3...v0.0.4) (2025-06-30)


### Miscellaneous

* **deps-dev:** bump @mdn/browser-compat-data from 6.0.26 to 6.0.27 ([#302](https://github.com/mdn/fred/issues/302)) ([81f9a32](https://github.com/mdn/fred/commit/81f9a32abca921d42889a8538b7620409f540d00))
* **deps-dev:** bump @mdn/rari from 0.1.44 to 0.1.45 ([#297](https://github.com/mdn/fred/issues/297)) ([0766a79](https://github.com/mdn/fred/commit/0766a794231306e05b3216278576c3296d41b071))
* **deps-dev:** bump the dev group with 9 updates ([#303](https://github.com/mdn/fred/issues/303)) ([62d68ed](https://github.com/mdn/fred/commit/62d68edbb3fa1ed6caf27a7040f321f5dde21f02))
* **homepage-hero:** remove link underline on hover ([c92a8b8](https://github.com/mdn/fred/commit/c92a8b80b9e1c60e478a4007d8718f02a26269d5))
