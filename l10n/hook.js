import { getSymmetricContext } from "../symmetric-context/both.js";

import { loadFluentFile } from "./fluent.js";

const locale = getSymmetricContext().locale;
if (locale) await loadFluentFile(locale);
