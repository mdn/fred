export interface SearchResponse {
  metadata: SearchMetadata;
  documents: SearchDocument[];
}

export type SearchHighlight = {
  body?: string[];
  title?: string[];
};

export interface SearchDocument {
  mdn_url: string;
  locale: string;
  title: string;
  highlight: SearchHighlight;
  summary: string;
  score: number;
  popularity: number;
}

export type SearchTotal = {
  value: number;
  relation: "eq" | "gt";
};

export interface SearchMetadata {
  took_ms: number;
  total: SearchTotal;
}

export interface SearchSuggestion {
  text: string;
  total: SearchTotal;
}
