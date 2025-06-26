export interface AsyncLocalStorageContents {
  componentsUsed: Set<string>;
  componentsWithStylesInHead: Set<string>;
  compilationStats: import("@fred").CompilationStats;
}
