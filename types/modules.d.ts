declare module "*.css?lit" {
  const css: import("lit").CSSResult;
  export default css;
}

declare module "*.svg?lit" {
  const svg: import("lit").SVGTemplateResult;
  export default svg;
}

declare module "*.svg" {
  const url: string;
  export default url;
}

declare module "*.flt" {
  const flt: string;
  export default flt;
}
