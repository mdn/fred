# Font

## Generating subsetted fonts

Source fonts in TTF or OTF formats are located in the `fonts/source` folder. Unicode ranges for subsetting are located in the `unicode` folder as TXT files.

- Install fonttools:
  ```sh
  brew install fonttools
  ```
- Install brotli and zopfli
  ```sh
  brew install brotli zopfli
  ```
- Run the subsetting script in the `fonts` folder:
  ```sh
  sh ./subset.sh
  ```

The script will generate subsetted fonts based on font and range files. For example: `inter.ttf` font and `latin.txt`, `latin-extended.txt`, and `cyrillic.txt` will output:

- `inter-latin.ttf`
- `inter-latin-extended.ttf`
- `inter-cyrillic.ttf`

## Generating JetBrains Mono font without ligatures

To generate JetBrains Mono font without ligatures, you need to checkout [the font's source code](https://github.com/JetBrains/JetBrainsMono/) and apply the [fonts/jetbrains-mono-nl.patch](fonts/jetbrains-mono-nl.patch) to the `JetBrainsMono.glyphs` and `JetBrainsMono-Italic.glyphs` files. After that, follow the [building from source instructions](https://github.com/JetBrains/JetBrainsMono/blob/master/README.md#building-from-source-files) to buld the TTF fonts.
