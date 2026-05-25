import { Support } from "@mdn/rari";

export type BrowserIdentifier = keyof Support;
export interface BrowserGroup {
  name: string;
  ids: BrowserIdentifier[];
}
