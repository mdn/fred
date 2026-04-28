declare global {
  interface WindowEventMap {
    "glean-click": CustomEvent<string>;
  }
}

export {};
