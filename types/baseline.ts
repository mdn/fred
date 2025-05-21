import { features } from "web-features";

export type SupportStatus =
  (typeof features)[keyof typeof features]["status"] & {
    asterisk?: boolean;
  };
export type BrowserIdentifier =
  keyof (typeof features)[keyof typeof features]["status"]["support"];

export interface BrowserGroup {
  name: string;
  ids: BrowserIdentifier[];
}
