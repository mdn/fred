export interface Element {
  tag: string;
  [k: string]: string;
}

export type L10nTag = (strings: TemplateStringsArray) => string;
