#!/bin/bash

set -e

for font_path in ./source/*.{ttf,otf}; do
  [ -e "$font_path" ] || continue
  font_filename=$(basename "$font_path")
  font_basename="${font_filename%.*}"

  for unicode_path in ./unicode/*.txt; do
    [ -e "$unicode_path" ] || continue
    unicode_filename=$(basename "$unicode_path")
    unicode_basename="${unicode_filename%.*}"

    output_file="./${font_basename}-${unicode_basename}.woff2"

    pyftsubset "$font_path" \
      --output-file="$output_file" \
      --unicodes-file="$unicode_path" \
      --layout-features='*' \
      --flavor=woff2 \
      --with-zopfli \
      --ignore-missing-glyphs

    echo "Created: $output_file"
  done
done
