namespace Compat {
  interface Feature {
    name: string;
    compat: BCD.CompatStatement;
    depth: number;
  }

  type SimpleSupportStatementExtended = BCD.SimpleSupportStatement & {
    release_date?: string;
    version_last?: BCD.VersionValue;
  };

  interface StatusIcon {
    title: string;
    text: string;
    iconClassName: string;
  }

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
