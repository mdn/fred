import { PageLayout } from "../../components/page-layout/index.js";
import { ReferenceLayout } from "../../components/reference-layout/index.js";

import "./index.css";
import "../../components/index.css";

/**
 * @param {Fred.Context<Rari.DocPage>} context
 */
export function Doc(context) {
  return PageLayout(context, ReferenceLayout(context));
}
