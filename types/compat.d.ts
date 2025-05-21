import {
  CompatStatement,
  SimpleSupportStatement,
  VersionValue,
} from "@mdn/browser-compat-data";

export interface Feature {
  name: string;
  compat: CompatStatement;
  depth: number;
}

export type LegendKey =
  | "yes"
  | "partial"
  | "preview"
  | "no"
  | "unknown"
  | "experimental"
  | "nonstandard"
  | "deprecated"
  | "footnote"
  | "disabled"
  | "altname"
  | "prefix"
  | "more";

// FIXME SimpleSupportStatement properties are not observed.
export type SimpleSupportStatementExtended = SimpleSupportStatement & {
  release_date?: string;
  version_last?: VersionValue;
};

export type SupportStatementExtended =
  | SimpleSupportStatementExtended
  | SimpleSupportStatementExtended[];

export type SupportClassName =
  | "no"
  | "yes"
  | "partial"
  | "preview"
  | "removed-partial"
  | "unknown";
