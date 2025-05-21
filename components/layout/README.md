# Layout

This component provides some global utility variables for consistent layout.

## Side padding

In the simplest case, you may just need the `--layout-side-padding` variable. This keeps full width content in line with the padding in the navigation and footer, which provides a small padding on small screens, and centers content on very large screens:

```css
.example {
  padding-inline: var(--layout-side-padding);
}
```

## Content and sidebar layouts

If the page has "content" - some kind of prose - and optionally sidebars, you'll likely want one of the following layouts.
The columns are sized to ensure that the content column doesn't become too wide (and have unreadably long lines of text), and that the sidebar columns don't become too narrow.

If you're not using sidebars, you probably want to jump straight to the "no sidebar" layouts, to ensure you don't get empty space on narrower screens.

If you're using sidebars, you'll probably want to use the [custom media queries](../media/README.md) associated with each layout to switch between them:

```css
.example-wrapper {
  display: grid;
  grid-template-columns: var(--layout-2-sidebars);
  padding-inline: var(--layout-side-padding);

  .example-content {
    grid-column: content;
  }

  .example-left-sidebar {
    grid-column: left-sidebar;
  }

  .example-right-sidebar {
    grid-column: right-sidebar;
  }

  @media (--screen-layout-1-sidebar-or-less) {
    grid-template-columns: var(--layout-1-sidebar-left);

    .example-right-sidebar {
      display: none;
    }
  }

  @media (--screen-layout-no-sidebar) {
    grid-template-column: var(--layout-no-sidebar);

    .example-left-sidebar {
      display: none;
    }
  }
}
```

### 2 sidebars: `--layout-2-sidebars`

A column for content, two columns for sidebars, and two columns for a gap between the content and sidebars. The columns are named as follows:

|      1       | (2)  |    3    | (4)  |       5       |
| :----------: | :--: | :-----: | :--: | :-----------: |
|     full     | full |  full   | full |     full      |
|              |      | content |      |               |
| left-sidebar |      |         |      | right-sidebar |

Use the `--screen-layout-1-sidebar-or-less` custom media query to change to a different layout when the viewport becomes too narrow.

### 1 sidebar

Two variants, which are identical apart from one having a left sidebar and the other a right sidebar. They have a column for content, a column for the sidebar, and a column for a gap between the content and sidebar.

Use the `--screen-layout-no-sidebar` custom media query to change to a different layout when the viewport becomes too narrow.

#### Left sidebar `--layout-1-sidebar-left`

The columns are named as follows:

|      1       | (2)  |    3    |
| :----------: | :--: | :-----: |
|     full     | full |  full   |
|              |      | content |
| left-sidebar |      |         |
|   sidebar    |      |         |

#### Right sidebar `--layout-1-sidebar-right`

The columns are named as follows:

|    1    | (2)  |       3       |
| :-----: | :--: | :-----------: |
|  full   | full |     full      |
| content |      |               |
|         |      | right-sidebar |
|         |      |    sidebar    |

### No sidebar

Two variants, one if you're using `--layout-side-padding`, the other if you'd like to place things within that padding (e.g. a full width banner):

#### Using padding: `--layout-no-sidebar`

The columns are named as follows:

|  1   |    2    |  3   |
| :--: | :-----: | :--: |
| full |  full   | full |
|      | content |      |

```css
.example-wrapper {
  display: grid;
  grid-template-columns: var(--layout-no-sidebar);
  padding-inline: var(--layout-side-padding);

  .example-content {
    grid-column: content;
  }
}
```

#### Not using padding: `--layout-no-sidebar-extended`

The columns are named as follows:

|      (0)      |       1       |       2       |       3       |      (4)      |
| :-----------: | :-----------: | :-----------: | :-----------: | :-----------: |
| extended-full | extended-full | extended-full | extended-full | extended-full |
|               |     full      |     full      |     full      |               |
|               |               |    content    |               |               |

```css
.example-wrapper {
  display: grid;
  grid-template-columns: var(--layout-no-sidebar-extended);

  .example-banner {
    grid-column: extended-full;
  }

  .example-content {
    grid-column: content;
  }
}
```
