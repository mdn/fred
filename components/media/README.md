# Media queries

We use a couple of postcss plugins to define our media queries in one place, so we can use them across multiple components.

[`postcss-custom-media`](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-custom-media) allows us to define `@custom-media` queries, used like so:

```css
@custom-media --screen-xsmall (width <= 426px);

@media (--screen-xsmall) {
  /* styles for extra small viewport */
}
```

We also use `@csstools/postcss-global-data` to ensure the `components/media/index.css` file is globally available for PostCSS.
This means we can define our custom media queries in one central place, and use them everywhere.

## Component specific breakpoints

We advise against using the generic `--screen-*` queries. Instead, we recommend that components define their own breakpoints, which make sense for the content they contain. Or that they use the breakpoints of another component, if that's the context in which they're presented.

For example, the breadcrumb bar defines its own breakpoints, and the components presented in the breadcrumb bar use those breakpoints rather than the generic ones.

Those component specific breakpoints should still be defined in `components/media/index.css`, with a prefix.
