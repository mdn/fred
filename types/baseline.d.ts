namespace Baseline {
  type SupportStatus =
    (typeof import("web-features").features)[keyof typeof import("web-features").features]["status"] & {
      asterisk?: boolean;
    };
  type BrowserIdentifier =
    keyof (typeof import("web-features").features)[keyof typeof import("web-features").features]["status"]["support"];

  interface BrowserGroup {
    name: string;
    ids: BrowserIdentifier[];
  }
}
