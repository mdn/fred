import cookieParser from "cookie-parser";

import { resolvePreferredLocale } from "./preferred-locale.js";

/** @param {import("express").Express} app */
export function registerLocaleLessDocsRedirect(app) {
  app.get(["/docs", "/docs/*_"], cookieParser(), (req, res) => {
    const locale = resolvePreferredLocale({
      preferredLocale: req.cookies?.preferredlocale,
      acceptLanguage: req.get("accept-language"),
    });
    const query = req.originalUrl.slice(req.path.length);
    res.redirect(302, `/${locale}${req.path}${query}`);
  });
}
