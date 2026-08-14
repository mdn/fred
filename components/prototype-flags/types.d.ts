export interface Flag {
  id: string;
  name: string;
  default: boolean;
}

export interface ResolvedFlag {
  id: string;
  name: string;
  enabled: boolean;
}

export type Overrides = Record<string, boolean>;
