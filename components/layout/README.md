# Layout

This component provides some global utility variables for consistent layout.

## Side padding

In the simplest case, you may just need the `--layout-side-padding` variable. This keeps full width content in line with the padding in the navigation and footer, which provides a small padding on small screens, and centers content on very large screens:

```css
.example {
  padding-inline: var(--layout-side-padding);
}
```

## Column layouts

> [!WARNING]
> This is all subject to change: the widths will almost certainly change, but column names will hopefully remain the same

### 1 column

1 column layout, with 2 extra outer columns for the side padding. The columns are named as follows:

|      (0)      |       1       |      (2)      |
| :-----------: | :-----------: | :-----------: |
| extended-full | extended-full | extended-full |
|               |     full      |               |

Effectively the same as the side padding, but if you'd like to use a grid for it instead:

```css
.example-wrapper {
  display: grid;
  grid-template-columns: var(--layout-1-col);

  .example {
    grid-column: full;
  }
}
```

### 3 column

3 column layout, with 2 extra outer columns for the side padding. The columns are named as follows:

|      (0)      |       1       |       2       |       3       |      (4)      |
| :-----------: | :-----------: | :-----------: | :-----------: | :-----------: |
| extended-full | extended-full | extended-full | extended-full | extended-full |
|               |     full      |     full      |     full      |               |
|               |               |    center     |               |               |
|               |     left      |               |     right     |               |
|               |  center-left  |  center-left  |               |               |
|               |               | center-right  | center-right  |               |

```css
.example-wrapper {
  display: grid;
  grid-template-columns: var(--layout-3-col);

  .example-left {
    grid-column: left;
  }

  .example-right {
    grid-column: center-right;
  }
}
```
