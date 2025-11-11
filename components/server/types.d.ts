export type AsyncLocalStorageContents =
  | {
      componentsUsed: Set<string>;
      componentsWithStylesInHead: Set<string>;
      compilationStats: import("@fred").CompilationStats;
    }
  | {
      renderSimple: true;
    };
