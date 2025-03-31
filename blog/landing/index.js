import { html } from "lit-html";

/** @import { BlogImage, BlogPostMetadata } from "../types" */

/**
 * @param {{image: BlogImage, slug: string, width: number, height: number}}
 */
export function BlogIndexImageFigure({ image, slug, width, height }) {
  const src = `./${slug}/${image.file}`;
  return html`<figure className="blog-image">
    <a href="./${slug}/">
      <img
        alt="${image.alt || ""}"
        src="${src}"
        height=${height}
        width=${width}
      />
    </a>
  </figure>`;
}

/**
 *
 * @param {{fm: BlogPostMetadata}}
 */
function PostPreview({ fm }) {
  return html`<article>
    <header>
      ${BlogIndexImageFigure({ image: fm.image, slug: fm.slug, width: 200 })}
      <h2>
        <a href="./${fm.slug}/">${fm.title}</a>
      </h2>
      <AuthorDateReadTime metadata="{fm}" />
    </header>
    <p>${fm.description}</p>
    <footer>
      ${fm.sponsored && html`<span className="sponsored">Sponsored</span>`}
      <a href="./${fm.slug}/" target="_self"> Read more → </a>
    </footer>
  </article>`;
}

export function BlogIndex(context) {
  return html`<main
    className="blog-container blog-index container main-page-content"
    lang="en-US"
  >
    <header>
      <h1 className="mify">Blog it better</h1>
    </header>
    <section className="article-list">
      ${context?.posts.map((fm) => PostPreview(fm))}
    </section>
  </main>`;
}
