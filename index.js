import { render } from "@lit-labs/ssr";
import { RenderResultReadable } from "@lit-labs/ssr/lib/render-result-readable.js";
import express from "express";
import { Doc } from "./pages/doc/index.js";

/**
 * @param {string} path
 * @returns {Promise<Fred.Context<Rari.DocPage>>}
 */
async function fetch_from_rari(path) {
  const external_url = `http://localhost:8083${path}`;
  console.log(`using ${external_url}`);
  const response = await fetch(external_url);
  return await response.json();
}

const app = express();
app.use(express.static("."));
app.get("/*mdnUrl", async (req, res) => {
  const context = await fetch_from_rari(req.path);
  const result = render(Doc(context));
  const stream = new RenderResultReadable(result);
  stream.pipe(res);
});

app.listen(3000);
