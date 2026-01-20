# Social Image

## Generating an image from the component

1. Navigate to the sandbox http://localhost:3000/sandbox#SocialImage
2. Screenshot the 1024px node from devtools
3. Copy to `fred/public/twitter-card-summary.png`
4. Compress the image:
   a. Run pngquant to reduce the colours in the image, try `pngquant --speed 1 twitter-card-summary.png` first, and see if it's indistinguishable from the original
   b. Run optipng to further compress the image without any quality loss: `optipng -o7 -zm1-9 twitter-card-summary-fs8.png`
5. Generate a hash for the image: `shasum twitter-card-summary-fs8.png | cut -c 1-8`
6. Rename the image, including the hash: `mv twitter-card-summary-fs8.png twitter-card-summary.46ac2375.png`
7. Cleanup the uncompressed image: `rm twitter-card-summary.png`
