# L10n

We use [Fluent](https://projectfluent.org/) for l10n.

## For developers

In order to make adding l10n strings easy, we have a couple of convenience methods exposed via `context.l10n` (in a server component) and `this.l10n` (in a custom element, with the `L10nMixin` applied).

These can be used in two ways:

```js
// As an inline string, with an ID:
context.l10n("hello")`Hello`;

// For more complex scenarios, involving arguments or
// HTML within the string:
context.l10n.raw({
  id: "hello-person",
  args: {
    name: "world",
  },
  elements: {
    link: { tag: "a", href: "https://example.com/" },
  },
});
```

The last of those examples requires manually adding a string to `./locales/en-US.ftl`, like this:

```ftl
hello-person = Hello <a data-l10n-name="link">{ $name }</a>!
```

And it'll render into HTML like this:

```html
Hello <a href="https://example.com/">world</a>!
```

The other examples are automatically extracted, and combined with the manually specified strings, into `./template.ftl`.

### Pseudolocalization

We have a few pseudo locales for testing if strings have been added, or if components will adapt to localized strings:

- `qaa`: "accented" locale: adds accents to all characters, duplicates some vowels to create longer strings, wraps string in square brackets to help detect truncation
- `qai`: "id" locale: replaces strings with their identifiers, wrapped in square brackets

The `qai` locale works all the time, the `qaa` locale must be manually generated with `npm run l10n -- --gen-pseudo`

## For localizers

The l10n experience isn't fantastic at the moment, and we have improvements to make, but it should be functional.

Strings to be localized can be sourced from `./template.ftl`: this will include both manually added strings, as well as strings scraped from the code. Localized strings should be placed in `./locales/{locale}.ftl`.

Adding Fluent comments to explain what context strings appear in is an open task, but for now they can be found in code by searching for the ID: it'll appear as `{this|context}.l10n({the id})` or `{this|context}.l10n({ id: {the id} })`

If one English string is used in multiple places and requires multiple different strings in a locale, file an issue to distinguish the IDs.

Please also file an issue for any other problems you encounter with localizing - either with specific strings which need fixing, or general issues with the l10n process.
