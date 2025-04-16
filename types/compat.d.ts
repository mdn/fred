namespace Compat {
  interface Feature {
    name: string;
    compat: BCD.CompatStatement;
    depth: number;
  }

  type LegendKey =
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
  type SimpleSupportStatementExtended = BCD.SimpleSupportStatement & {
    release_date?: string;
    version_last?: BCD.VersionValue;
  };

  type SupportStatementExtended =
    | SimpleSupportStatementExtended
    | SimpleSupportStatementExtended[];

  type SupportClassName =
    | "no"
    | "yes"
    | "partial"
    | "preview"
    | "removed-partial"
    | "unknown";
}
