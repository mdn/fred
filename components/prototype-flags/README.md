# Prototype flags

A dropdown next to the theme switcher for showing work in progress to the team,
where each setting is a boolean the viewer can turn on and off for themselves.

To add one, put it in `FLAGS` in `flags.js`:

```js
export const FLAGS = [
  {
    id: "baseline-icon-widely",
    name: "Icon on widely available links",
    default: false,
  },
];
```

An enabled flag puts `prototype-<id>` on the root element, so write the
prototype as CSS keyed on that class, next to the styles it varies:

```css
html.prototype-baseline-icon-widely a[data-baseline="high"]::after {
  content: "";
}
```

The defaults render server side, so anyone who has not touched the switcher sees
the right state from the first paint. Overrides are stored in localStorage and
applied by `hook.js` when the client bundle runs, so they can flash.

Empty the `FLAGS` array when a prototype is done: the switcher hides itself when
there is nothing to toggle.
