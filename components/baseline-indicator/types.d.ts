import { Doc, Support } from "@mdn/rari";
import { L10nContext } from "@fred";

export type BaselineContext = L10nContext & {
  doc: Pick<Doc, "baseline" | "status">;
};

export type BrowserIdentifier = keyof Support;
export interface BrowserGroup {
  name: string;
  ids: BrowserIdentifier[];
}
