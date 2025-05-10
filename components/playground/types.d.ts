export interface PlaygroundStateParam {
  css: string;
  html: string;
  js: string;
  src?: string;
}

export interface PlaygroundSession {
  srcPrefix: string;
  code: Record<string, string>;
  initialCode?: Record<string, string>;
}
