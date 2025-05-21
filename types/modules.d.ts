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

declare module "*?url" {
  const url: string;
  export default url;
}

declare module "*?source" {
  const source: string;
  export default source;
}

declare module "*?source&csp=true" {
  const source: string;
  export default source;
}
